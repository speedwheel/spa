<script lang="ts">
	import { editTaskStore, isEditTaskOpenStore } from '$lib/stores/taskModalsStore';
	import { Modal } from 'flowbite-svelte';
	import TaskNameInput from '../NewTaskModal/TaskNameInput.svelte';
	import { weeklyTasksStore } from '$lib/stores/tasksStore';
	import type { TaskModalData } from '$lib/types/modals';
	import { priorities } from '$lib/constants/priorities';

	isEditTaskOpenStore.subscribe((value) => {
		console.log('isEditTaskOpenStore', value);
	});

	let taskModalData: TaskModalData = $state({
		name: '',
		description: '',
		priority: priorities[1],
		label: null,
		project: null,
		panelDate: null
	});

	$effect(() => {
		if ($editTaskStore) {
			console.log(weeklyTasksStore.updateTask($editTaskStore.id, { ['name']: taskModalData.name }));
		}
	});

	const onEditTaskModalOpen = () => {
		taskModalData.name = $editTaskStore?.name;
	};
</script>

<Modal
	title="Edit task"
	on:open={() => {
		onEditTaskModalOpen();
	}}
	bind:open={$isEditTaskOpenStore}
	outsideclose
	size="lg"
	classBody="dark:bg-neutral-900"
	classFooter="dark:bg-neutral-900"
	classHeader="dark:bg-neutral-900 dark:text-neutral-100"
>
	<TaskNameInput bind:taskModalData />
</Modal>
