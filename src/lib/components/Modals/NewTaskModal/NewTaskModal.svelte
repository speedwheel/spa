<script lang="ts">
	import TaskPriority from './TaskPriority.svelte';
	import { Modal } from 'flowbite-svelte';
	import hotkeys from 'hotkeys-js';
	import { onMount } from 'svelte';
	import { isNewTaskOpenStore } from '$lib/stores/taskModalsStore';
	import { goto } from '$app/navigation';
	import api from '$lib/api/api';
	import { weeklyTasksStore } from '$lib/stores/tasksStore';
	import TaskDescriptionInput from './TaskDescriptionInput.svelte';
	import { priorities } from '$lib/constants/priorities';
	import { Icon, XMark, PlusSmall, Tag, Hashtag } from 'svelte-hero-icons';
	import TaskNameInput from './TaskNameInput.svelte';
	import type { TaskModalData } from '$lib/types/modals';
	import { type DropdownOption } from '$lib/types/dropdowns';
	import TaskFilter from './TaskFilter.svelte';
	import { onlyDate } from '$lib/utils/dateFormatter';
	import { labelsStore, projectsStore } from '$lib/stores/filtersStore';
	import { Datepicker } from 'flowbite-svelte';
	import { viewTypeStore } from '$lib/stores/viewTypeStore';

	const openModalHotKey = 'a';

	let modalDataName = $state('');
	let modalDataDescription = $state('');
	let modalDataPriority = $state(priorities[1]);
	let modalDataLabel = $state(null);
	let modalDataProject = $state(null);
	let modalDataPanelDate = $state(new Date());
	const emptyNewTask: TaskModalData = {
		name: '',
		description: '',
		priority: priorities[1],
		label: null,
		project: null,
		panelDate: new Date()
	};

	let newTask: TaskModalData = $state(emptyNewTask);

	let labelDropdownOptions: DropdownOption[] = $state([]);
	let projectDropdownOptions: DropdownOption[] = $state([]);

	// Subscribe to the dropdownOptionsStore
	labelsStore.dropdownOptionsStore.subscribe((options) => {
		labelDropdownOptions = options;
	});

	projectsStore.dropdownOptionsStore.subscribe((options) => {
		projectDropdownOptions = options;
	});

	const labelKey: keyof TaskModalData = 'label';
	const projectKey: keyof TaskModalData = 'project';

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
		newTask = emptyNewTask;
		goto('/');
	}

	function createNewTask() {
		(async (t: TaskModalData) => {
			if (!t.name) {
				return;
			}

			const task = await api.tasks.createTask({
				name: t.name,
				description: t.description,
				view_type: $viewTypeStore,
				panel_date: onlyDate(t.panelDate),
				priority: t.priority.value,
				label_id: t.label?.value,
				project_id: t.project?.value
			});
			isNewTaskOpenStore.set(false);
			weeklyTasksStore.addTask(task);
		})(newTask);
	}
</script>

{#snippet iconLabel(option: DropdownOption)}
	<Icon src={Tag} class={`size-4 text-${option.color}`} />
{/snippet}

{#snippet iconProject(option: DropdownOption)}
	<Icon src={Hashtag} class={`size-4 text-${option.color}`} />
{/snippet}

<Modal
	title="Add task"
	bind:open={$isNewTaskOpenStore}
	on:close={() => onClose()}
	on:open={() => {}}
	outsideclose
	size="md"
	classBody="dark:bg-neutral-900"
	classFooter="dark:bg-neutral-900"
	classHeader="dark:bg-neutral-900 dark:text-neutral-100"
>
	<!-- 	Task name input -->
	<TaskNameInput bind:taskModalData={newTask} on:enterKeyPressed={createNewTask} />

	<!-- 	Task description input -->
	<TaskDescriptionInput bind:taskModalData={newTask} />
	<div class="flex gap-4">
		<!-- Task priority select -->
		<TaskPriority bind:taskModalData={newTask} />

		<!-- Task label select -->
		<TaskFilter
			bind:newTask
			dropdownOptions={labelDropdownOptions}
			placeholder="Labels"
			key={labelKey}
			icon={iconLabel}
		/>

		<!-- Task project select -->
		<TaskFilter
			bind:newTask
			dropdownOptions={projectDropdownOptions}
			placeholder="Projects"
			key={projectKey}
			icon={iconProject}
		/>

		<!-- Task Date Picker -->
		<div
			class="tickup-datepicker [&_#datepicker-dropdown]:!fixed dark:[&_.bg-primary-700]:!bg-accent-purple-1 dark:[&_.bg-red-700]:!bg-accent-purple-2 [&_input]:h-8 dark:[&_input]:dark:!border-neutral-700 dark:[&_input]:bg-neutral-900"
		>
			<Datepicker
				bind:value={newTask.panelDate}
				dateFormat={{ year: '2-digit', month: 'short', day: '2-digit' }}
				defaultDate={new Date()}
				autohide={false}
				showActionButtons
			/>
		</div>
	</div>
	<svelte:fragment slot="footer">
		<div class="flex w-full justify-end gap-4">
			<button
				onclick={() => isNewTaskOpenStore.set(false)}
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
