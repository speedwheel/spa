<script lang="ts">
	import { isEditTaskOpenStore, editTaskStore } from '$lib/stores/taskModalsStore';
	import type { Task } from '$lib/types/tasks';
	import { Icon, Check } from 'svelte-hero-icons';

	interface Props {
		task: Task;
	}

	let { task = $bindable() }: Props = $props();

	function openTaskModal() {
		editTaskStore.set(task);
		isEditTaskOpenStore.set(true);
	}

	function toggleTaskDone(e: Event) {
		e.stopPropagation();
		console.log('markTaskAsDone');
	}
</script>

<button onclick={openTaskModal} class="task-card task-card-hover">
	<div class="flex w-full justify-between gap-1 pb-4 text-left">
		<div class="flex-1 text-sm font-normal text-neutral-900 dark:text-neutral-50">{task.name}</div>
		<div class="flex-initial">
			<div class="rounded bg-neutral-700 px-2 py-[3px] text-xs text-neutral-400">0:37/ 0:15</div>
		</div>
	</div>
	<div class="flex w-full items-center gap-4">
		<div class="flex items-center gap-1.5">
			<div
				onclick={toggleTaskDone}
				role="button"
				tabindex="0"
				onkeydown={() => {}}
				class="task-done mr-3 flex items-center"
				aria-label="Mark as done"
			>
				<div
					class="flex size-5 items-center justify-center rounded-full border border-blue-400 bg-blue-900 [&_.hidden]:hover:block"
				>
					<Icon src={Check} micro class="size-3.5 text-white" />
				</div>
			</div>
		</div>
	</div>
</button>
