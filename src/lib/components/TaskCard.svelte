<script lang="ts">
	import Tick from '$lib/images/Tick.svelte';
	import type { Task } from '$lib/types/task';

	interface Props {
		task: Task;
	}

	let { task: task }: Props = $props();
</script>

<div class="task-card task-card-hover">
	<div class="flex justify-between gap-1 pb-4">
		<div class="flex-1 text-sm font-normal text-neutral-900 dark:text-neutral-50">{task.name}</div>
		<div class="flex-initial">
			<div class="rounded bg-neutral-700 px-2 py-[3px] text-xs text-neutral-400">0:37/ 0:15</div>
		</div>
	</div>
	<div class="flex w-full items-center gap-4">
		<div class="flex items-center gap-1.5">
			<button class="task-done mr-3 flex items-center" aria-label="Mark as done">
				<div
					class="flex size-5 items-center justify-center rounded-full border border-blue-400 bg-blue-900 [&_.hidden]:hover:block"
				>
					<Tick />
				</div>
			</button>
		</div>
	</div>
</div>
