<script lang="ts">
	import Sortable, { type SortableEvent } from 'sortablejs';

	import { format } from 'date-fns/format';
	import TaskCard from './TaskCard.svelte';
	import { onlyDate } from '$lib/utils/dateFormatter';

	import { ListPlaceholder } from 'flowbite-svelte';
	import { Icon, Plus } from 'svelte-hero-icons';
	import { getAppState } from '$lib/states/appState.svelte';
	import { useIntersectionObserver, watch } from 'runed';
	import { addDays, subDays } from 'date-fns';
	import { json } from '@sveltejs/kit';

	let appState = getAppState();
	appState.loadTasks();

	// bind all columns by date
	let columnsByDate: Record<string, HTMLElement> = $state({});
	// the scrollable calendar element
	let scrollableElement: HTMLElement | null = $state(null);

	// the trigger dates for the intersection observer
	// when you scroll left and right
	let triggerDate = $derived.by(() => {
		return {
			get dateStart() {
				return onlyDate(addDays(appState.dateStart, 1));
			},
			get dateEnd() {
				return onlyDate(subDays(appState.dateEnd, 1));
			},
			get dateStartColumn() {
				return columnsByDate[this.dateStart];
			},
			get dateEndColumn() {
				return columnsByDate[this.dateEnd];
			}
		};
	});

	// the intersection observer to trigger the date change
	const intersect = useIntersectionObserver(
		() => {
			return [triggerDate.dateStartColumn, triggerDate.dateEndColumn];
		},
		(entries) => {
			const entry = entries[0];
			if (entry && entry.isIntersecting) {
				// if the start date is intersecting
				if (entry.target === triggerDate.dateStartColumn) {
					appState.baseDate = triggerDate.dateStart;
					// if the end date is intersecting
				} else if (entry.target === triggerDate.dateEndColumn) {
					appState.baseDate = triggerDate.dateEnd;
				}

				intersect.pause();
				appState.loadTasks();
			}
		},
		{ root: () => scrollableElement, immediate: false, threshold: 1 }
	);

	// initiate the sortable columns on tasks load
	watch(
		() => appState.tasks.isLoading,
		(isLoading, isLoadingPrev) => {
			if (!isLoading && isLoadingPrev) {
				setupSortableColumns();
			}
		},
		{ lazy: true }
	);

	function focusIntoView() {
		columnsByDate[appState.baseDate]?.scrollIntoView({ behavior: 'instant', inline: 'start' });
		scrollableElement?.scrollBy(-16, 0);
		intersect.resume();
	}

	function setupSortableColumns() {
		//intersect.resume();
		Object.keys(columnsByDate).forEach((date) => {
			const column = columnsByDate[date] as HTMLElement;
			if (!column) return;
			Sortable.create(column, {
				group: {
					name: 'tasks'
				},
				animation: 100,
				delay: 0,
				fallbackTolerance: 5,
				delayOnTouchOnly: false,
				forceFallback: true,
				draggable: '.task-card',
				direction: 'vertical',
				ghostClass: 'ghost-card',
				dragClass: 'drag-card',
				easing: 'cubic-bezier(0, 0.55, 0.45, 1)',
				onChoose(evt: SortableEvent) {
					evt.item.classList.remove('task-card-hover');
				},
				onEnd: (evt: SortableEvent) => {
					const { item, to, from } = evt;
					let adjustedIndex = 0;

					// Iterate over `to.children` to count only the sortable elements
					for (let i = 0; i < to.children.length; i++) {
						const child = to.children[i];

						// Skip elements that have the class `.ignore-item`
						if (child.classList.contains('order-last')) continue;

						// If we reached the dragged item, stop counting
						if (child === item) break;

						// Increment the index for each sortable element
						adjustedIndex++;
					}
					const taskID: string = item.getAttribute('data-id') as string;
					const dateTo = to.getAttribute('data-date') as string;
					// console.log(evt.clone);
					if (dateTo !== from.getAttribute('data-date')) {
						evt.item.remove(); // Remove the clone if you don't need it in the DOM
					}
					appState.sortTasks(taskID, adjustedIndex, dateTo);
				}
			});
		});

		focusIntoView();

		$effect(() => {
			$inspect(appState.tasksByDate, new Date().toISOString());
		});
	}
</script>

<main bind:this={scrollableElement} class="flex flex-1 overflow-auto p-4">
	<div class="flex gap-4">
		{#if appState.tasks.isLoading}
			{#each new Array(7) as _}
				<ListPlaceholder
					divClass="dark:bg-neutral-900 space-y-4 p-4 w-72 rounded-lg border border-neutral-200 divide-y divide-neutral-200 shadow animate-pulse dark:divide-neutral-700 md:p-6 dark:border-neutral-700"
				/>
			{/each}
		{:else}
			{#each Object.entries(appState.tasksByDate) as [date, tasks]}
				<div class="flex w-72 flex-col rounded-lg py-4 pb-0 dark:bg-neutral-900">
					<div class="flex-4 flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
						<div class="px-4 pb-4">
							<div class="text-base font-semibold text-neutral-900 dark:text-white">
								<span>{format(date, 'EEEE')}</span>
								<span
									class="daily-task-count ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-neutral-700 text-2xs text-neutral-400"
									>3</span
								>
							</div>
							<div class="mb-4 text-xs dark:text-neutral-400">
								{format(date, 'MMM d')}
							</div>
							<button
								type="button"
								class="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-neutral-200 py-2 font-semibold text-neutral-500 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-white"
							>
								<Icon src={Plus} micro class="dark:hover:color-neutral-100 size-5" />
								Add task</button
							>
						</div>

						<div
							bind:this={columnsByDate[onlyDate(date)]}
							data-date={date}
							class="relative flex flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden pt-4"
						>
							{#each tasks as task (task.id)}
								<TaskCard {task} />
							{/each}
							<div class="order-last flex-1 !transform-none bg-neutral-800"></div>
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</main>
