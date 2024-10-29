<script lang="ts">
	import TaskPriority from './TaskPriority.svelte';
	import { Modal } from 'flowbite-svelte';
	import hotkeys from 'hotkeys-js';
	import { onMount } from 'svelte';
	import { newTaskModalOpenStore } from '$lib/stores/newTaskModalOpenStore';
	import { goto } from '$app/navigation';
	import api from '$lib/api/api';
	import { weeklyTasksStore } from '$lib/stores/tasksStore';
	import TaskDescriptionInput from './TaskDescriptionInput.svelte';
	import { priorities } from '$lib/constants/priorities';
	import { Icon, XMark, PlusSmall } from 'svelte-hero-icons';
	import TaskNameInput from './TaskNameInput.svelte';
	import type { NewTaskModalData } from '$lib/types/modals';
	import TaskFilter from './TaskFilter.svelte';
	import { type DropdownOption } from '$lib/types/dropdowns';

	const openModalHotKey = 'a';

	let labels: DropdownOption[] = [
		{ label: 'Work', value: 'work' },
		{ label: 'Personal', value: 'personal' },
		{ label: 'Shopping', value: 'shopping' },
		{ label: 'Other', value: 'other' }
	];

	let projects: DropdownOption[] = [
		{ label: 'Project 1', value: 'project-1' },
		{ label: 'Project 2', value: 'project-2' },
		{ label: 'Project 3', value: 'project-3' },
		{ label: 'Project 4', value: 'project-4' }
	];

	let newTask: NewTaskModalData = $state({
		name: '',
		description: '',
		priority: priorities[1],
		label: null,
		project: null
	});

	const labelKey: keyof NewTaskModalData = 'label';

	// $effect(() => {
	// 	console.log(newTask.name);
	// 	if (newTask.name) {
	// 		api.tasks.updateTask('newTask', { name: newTask.name });
	// 	}
	// });

	onMount(() => {
		hotkeys(openModalHotKey, () => {
			goto('/new-task');
		});

		return () => {
			hotkeys.unbind(openModalHotKey);
		};
	});

	function onClose() {
		newTask.name = '';
		newTask.description = '';
		newTask.priority = priorities[1];
		goto('/');
	}

	function createNewTask() {
		(async (t: NewTaskModalData) => {
			if (!t.name) {
				return;
			}
			const task = await api.tasks.createTask({
				name: t.name,
				description: t.description,
				view_type: 'work',
				panel_date: '2024-10-29',
				priority: t.priority.value
			});
			newTaskModalOpenStore.set(false);
			weeklyTasksStore.addTask(task);
		})(newTask);
	}
</script>

<Modal
	title="Add task"
	bind:open={$newTaskModalOpenStore}
	on:close={() => onClose()}
	on:open={() => {}}
	outsideclose
	classBody="dark:bg-neutral-900"
	classFooter="dark:bg-neutral-900"
	classHeader="dark:bg-neutral-900 dark:text-neutral-100"
>
	<!-- 	Task name input -->
	<TaskNameInput bind:newTask on:enterKeyPressed={createNewTask} />

	<!-- 	Task description input -->
	<TaskDescriptionInput bind:newTask />
	<div class="flex gap-4">
		<!-- Task priority select -->
		<TaskPriority bind:newTask />

		<!-- Task label select -->
		<TaskFilter bind:newTask dropdownOptions={labels} placeholder="Labels" key={labelKey} />
	</div>
	<svelte:fragment slot="footer">
		<div class="flex w-full justify-end gap-4">
			<button
				onclick={() => newTaskModalOpenStore.set(false)}
				class="flex items-center justify-center gap-1 rounded-lg border px-4 py-2.5 text-center text-sm font-semibold dark:border-neutral-700 dark:bg-transparent dark:text-neutral-400"
			>
				<Icon src={XMark} class="size-5 text-neutral-400" />
				Cancel
			</button>
			<button
				onclick={createNewTask}
				disabled={!newTask.name}
				class="me-2 inline-flex items-center gap-1 rounded-lg bg-accent-purple-1 px-5 py-2.5 text-center text-sm font-medium disabled:opacity-45 dark:text-neutral-100"
			>
				<Icon src={PlusSmall} class="size-5 text-neutral-100" />
				Add task</button
			>
		</div>
	</svelte:fragment>
</Modal>
