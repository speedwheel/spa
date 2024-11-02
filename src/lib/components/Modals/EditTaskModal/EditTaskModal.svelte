<script lang="ts">
	import { editTaskStore, isEditTaskOpenStore } from '$lib/stores/taskModalsStore';
	import { Modal, Datepicker } from 'flowbite-svelte';
	import TaskNameInput from '../NewTaskModal/TaskNameInput.svelte';
	import { weeklyTasksStore } from '$lib/stores/tasksStore';
	import { priorities } from '$lib/constants/priorities';
	import type { DropdownOption } from '$lib/types/dropdowns';
	import { labelsStore, projectsStore } from '$lib/stores/filtersStore';
	import TaskDescriptionInput from '../NewTaskModal/TaskDescriptionInput.svelte';
	import TaskPriority from '../NewTaskModal/TaskPriority.svelte';
	import TaskFilter from '../NewTaskModal/TaskFilter.svelte';
	import { Icon, PlayCircle, Tag, Hashtag } from 'svelte-hero-icons';

	isEditTaskOpenStore.subscribe((value) => {
		console.log('isEditTaskOpenStore', value);
	});

	let modalDataName: string | null = $state('');
	let modalDataDescription: string | null = $state('');
	let modalDataPriority: DropdownOption = $state(priorities[1]);
	let modalDataLabel: DropdownOption | null = $state(null);
	let modalDataProject: DropdownOption | null = $state(null);
	let modalDataPanelDate: Date | null = $state(new Date());

	let labelDropdownOptions: DropdownOption[] = $state([]);
	let projectDropdownOptions: DropdownOption[] = $state([]);

	// Subscribe to the dropdownOptionsStore
	labelsStore.dropdownOptionsStore.subscribe((options) => {
		labelDropdownOptions = options;
	});

	projectsStore.dropdownOptionsStore.subscribe((options) => {
		projectDropdownOptions = options;
	});

	$effect(() => {
		if ($editTaskStore) {
			weeklyTasksStore.updateTask($editTaskStore.id, { ['name']: modalDataName });
		}
	});

	const onEditTaskModalOpen = () => {
		if (!$editTaskStore) return;
		modalDataName = $editTaskStore.name;
		modalDataDescription = $editTaskStore.description;
	};
</script>

{#snippet iconLabel(option: DropdownOption)}
	<Icon src={Tag} class={`size-4 text-${option.color}`} />
{/snippet}

{#snippet iconProject(option: DropdownOption)}
	<Icon src={Hashtag} class={`size-4 text-${option.color}`} />
{/snippet}

<Modal
	title="Edit task"
	on:open={() => {
		onEditTaskModalOpen();
	}}
	bind:open={$isEditTaskOpenStore}
	outsideclose
	size="lg"
	classBody="dark:bg-neutral-900 !p-0"
	classFooter="dark:bg-neutral-900"
	classHeader="dark:bg-neutral-900 dark:text-neutral-100"
>
	<div class="flex">
		<div class="flex-1 p-4 md:p-5">
			<TaskNameInput bind:value={modalDataName} />
			<TaskDescriptionInput bind:value={modalDataDescription} />
		</div>
		<div class="w-52 bg-neutral-800 p-4">
			<button
				type="button"
				class="mb-6 flex w-full items-center justify-center gap-2 rounded-md bg-accent-purple-1 py-1 font-medium dark:text-white"
			>
				<Icon src={PlayCircle} mini class="size-5 text-white" />
				Start</button
			>

			<div class="mb-4 border-b border-dashed border-b-neutral-700 pb-4">
				<div class="mb-2 text-xs dark:text-neutral-400">Priority</div>
				<TaskPriority bind:value={modalDataPriority} class="!w-full" showChevron={true} />
			</div>

			<div class="mb-4 border-b border-dashed border-b-neutral-700 pb-4">
				<div class="mb-2 text-xs dark:text-neutral-400">Label</div>
				<TaskFilter
					bind:value={modalDataLabel}
					dropdownOptions={labelDropdownOptions}
					placeholder="Labels"
					icon={iconLabel}
					class="!w-full"
					showChevron={true}
				/>
			</div>

			<div class="mb-4 border-b border-dashed border-b-neutral-700 pb-4">
				<div class="mb-2 text-xs dark:text-neutral-400">Project</div>
				<TaskFilter
					bind:value={modalDataProject}
					dropdownOptions={projectDropdownOptions}
					placeholder="Projects"
					icon={iconProject}
					class="!w-full"
					showChevron={true}
				/>
			</div>

			<div>
				<div class="mb-2 text-xs dark:text-neutral-400">Date</div>
				<div class="tickup-datepicker [&_input]:!w-full">
					<Datepicker
						bind:value={modalDataPanelDate}
						dateFormat={{ year: '2-digit', month: 'short', day: '2-digit' }}
						defaultDate={new Date()}
						autohide={false}
						showActionButtons
					/>
				</div>
			</div>
		</div>
	</div>
</Modal>
