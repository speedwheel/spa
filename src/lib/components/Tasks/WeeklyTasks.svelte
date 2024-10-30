<script lang="ts">
	import Sortable, { type SortableEvent } from 'sortablejs';

	import { weeklyTasksStore } from '$lib/stores/tasksStore';
	import api from '$lib/api/api';
	import { format } from 'date-fns/format';
	import TaskCard from './TaskCard.svelte';
	import { tick } from 'svelte';
	import { onlyDate } from '$lib/utils/dateFormatter';
	import NewTaskModal from '$lib/components/Modals/NewTaskModal/NewTaskModal.svelte';
	import { filteredTasksStore } from '$lib/stores/tasksStore';

	let columnsByDate: { [key: string]: HTMLElement } = {};
	let scrollableElement: HTMLElement | null = null;

	function handleScrollLeft() {
		scrollableElement?.scrollBy(-16, 0);
	}

	(async () => {
		const currentDate = onlyDate(new Date());
		if (!currentDate) return;
		const weeklyTasks = await api.tasks.fetchWeeklyTasks({
			view_type: 'work',
			current_date: currentDate
		});

		weeklyTasksStore.set(weeklyTasks.weekly_tasks);

		await tick();

		Object.keys(columnsByDate).forEach((date) => {
			const column = columnsByDate[date] as HTMLElement;
			Sortable.create(column, {
				group: {
					name: 'tasks'
				},
				animation: 100,
				delay: 25,
				delayOnTouchOnly: false,
				forceFallback: true,
				// dragClass: 'drag-card',
				ghostClass: 'ghost-card',
				easing: 'cubic-bezier(0, 0.55, 0.45, 1)',
				onChoose(evt: SortableEvent) {
					evt.item.classList.remove('task-card-hover');
				},
				onEnd: (evt: SortableEvent) => {
					evt.item.classList.add('task-card-hover');
				}
			});
		});

		const targetDate = '2024-10-28';
		columnsByDate[targetDate]?.scrollIntoView({ behavior: 'instant', inline: 'start' });
		handleScrollLeft();
	})();
</script>

<main bind:this={scrollableElement} class="flex flex-1 overflow-auto p-4">
	<div class="flex gap-4">
		{#each $filteredTasksStore as tasksColumn (tasksColumn.date)}
			<div class="flex w-72 flex-col rounded-lg py-4 dark:bg-neutral-900">
				<div class="flex-4 flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
					<div class="px-4 pb-4">
						<div class="text-base font-semibold text-neutral-900 dark:text-white">
							<span>{format(tasksColumn.date, 'EEEE')}</span>
							<span
								class="daily-task-count ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-neutral-700 text-2xs text-neutral-400"
								>3</span
							>
						</div>
						<div class="text-xs dark:text-neutral-400">{format(tasksColumn.date, 'MMM d')}</div>
					</div>
					<div
						bind:this={columnsByDate[onlyDate(tasksColumn.date)]}
						class="flex flex-1 flex-col space-y-4 overflow-y-auto overflow-x-hidden pt-4"
					>
						{#each tasksColumn.tasks as task (task.id)}
							<TaskCard bind:task />
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
</main>
