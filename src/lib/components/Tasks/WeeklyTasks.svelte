<script lang="ts">
	import Sortable, { type SortableEvent } from 'sortablejs';

	import { weeklyTasksStore } from '$lib/stores/tasksStore';
	import { format } from 'date-fns/format';
	import TaskCard from './TaskCard.svelte';
	import { onlyDate } from '$lib/utils/dateFormatter';
	import { filteredTasksStore } from '$lib/stores/tasksStore';
	import { ListPlaceholder } from 'flowbite-svelte';
	import { Icon, Plus } from 'svelte-hero-icons';

	let columnsByDate: { [key: string]: HTMLElement } = {};
	let scrollableElement: HTMLElement | null = null;

	function handleScrollLeft() {
		scrollableElement?.scrollBy(-16, 0);
	}

	const initializeWeeklyTasksPromise = async () => {
		await weeklyTasksStore.initialize();
		setTimeout(() => {
			setupSortableColumns();
		});
		setupSortableColumns();
	};

	// setTimeout(() => {
	// 	console.log(
	// 		weeklyTasksStore.updateTask('0192e38f-bc8d-73a2-9567-28bb13ed5583', { name: 'Task 333' })
	// 	);
	// }, 3000)

	function setupSortableColumns() {
		console.log('sorted');
		Object.keys(columnsByDate).forEach((date) => {
			const column = columnsByDate[date] as HTMLElement;
			Sortable.create(column, {
				group: {
					name: 'tasks'
				},
				animation: 100,
				delay: 1,
				delayOnTouchOnly: false,
				forceFallback: true,
				draggable: '.task-card',
				direction: 'vertical',
				ghostClass: 'ghost-card',
				easing: 'cubic-bezier(0, 0.55, 0.45, 1)',
				onChoose(evt: SortableEvent) {
					evt.item.classList.remove('task-card-hover');
				},
				onEnd: (evt: SortableEvent) => {
					evt.item.classList.add('task-card-hover');
				},
				onMove: (evt) => {
					if (evt.willInsertAfter) {
						evt.from.insertBefore(evt.dragged, evt.from.firstChild);
						return true;
					}
				}
			});
		});
		const targetDate = onlyDate(new Date());
		columnsByDate[targetDate]?.scrollIntoView({ behavior: 'instant', inline: 'start' });
		handleScrollLeft();
	}
</script>

<main bind:this={scrollableElement} class="flex flex-1 overflow-auto p-4">
	<div class="flex gap-4">
		{#await initializeWeeklyTasksPromise()}
			{#each new Array(7) as _}
				<ListPlaceholder
					divClass="dark:bg-neutral-900 space-y-4 p-4 w-72 rounded-lg border border-neutral-200 divide-y divide-neutral-200 shadow animate-pulse dark:divide-neutral-700 md:p-6 dark:border-neutral-700"
				/>
			{/each}
		{:then}
			{#each $filteredTasksStore as tasksColumn (tasksColumn.date)}
				<div class="flex w-72 flex-col rounded-lg py-4 pb-0 dark:bg-neutral-900">
					<div class="flex-4 flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
						<div class="px-4 pb-4">
							<div class="text-base font-semibold text-neutral-900 dark:text-white">
								<span>{format(tasksColumn.date, 'EEEE')}</span>
								<span
									class="daily-task-count ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-neutral-700 text-2xs text-neutral-400"
									>3</span
								>
							</div>
							<div class="mb-4 text-xs dark:text-neutral-400">
								{format(tasksColumn.date, 'MMM d')}
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
							bind:this={columnsByDate[onlyDate(tasksColumn.date)]}
							class="relative flex flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden pt-4"
						>
							{#each tasksColumn.tasks as task, i (i)}
								<TaskCard bind:task />
							{/each}
							<div class="order-last flex-1 !transform-none bg-neutral-800"></div>
						</div>
					</div>
				</div>
			{/each}
		{:catch}
			<div>error</div>
		{/await}
	</div>
</main>
