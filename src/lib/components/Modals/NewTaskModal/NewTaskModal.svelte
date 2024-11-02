<script lang="ts">
	import TaskPriority from './TaskPriority.svelte';
	import { Modal } from 'flowbite-svelte';
	import hotkeys from 'hotkeys-js';
	import { onMount } from 'svelte';
	import { isNewTaskOpenStore } from '$lib/stores/taskModalsStore';
	import { goto } from '$app/navigation';
	import TaskDescriptionInput from './TaskDescriptionInput.svelte';
	import { priorities, Priority } from '$lib/constants/priorities';
	import { Icon, XMark, PlusSmall, Tag, Hashtag } from 'svelte-hero-icons';
	import TaskNameInput from './TaskNameInput.svelte';
	import { type DropdownOption } from '$lib/types/misc';
	import TaskFilter from './TaskFilter.svelte';
	import { onlyDate } from '$lib/utils/dateFormatter';
	import { labelsStore, projectsStore } from '$lib/stores/filtersStore';
	import { Datepicker } from 'flowbite-svelte';
	import { getAppState } from '$lib/states/appState.svelte';
	import { Spinner } from 'flowbite-svelte';

	const openModalHotKey = 'a';

	let modalDataName: string = $state('');
	let modalDataDescription: string = $state('');
	let modalDataPriority: DropdownOption = $state(priorities[1]);
	let modalDataLabel: DropdownOption | null = $state(null);
	let modalDataProject: DropdownOption | null = $state(null);
	let modalDataPanelDate: Date | null = $state(new Date());

	let labelDropdownOptions: DropdownOption[] = $state([]);
	let projectDropdownOptions: DropdownOption[] = $state([]);

	const appState = getAppState();

	// Subscribe to the dropdownOptionsStore
	labelsStore.dropdownOptionsStore.subscribe((options) => {
		labelDropdownOptions = options;
	});

	projectsStore.dropdownOptionsStore.subscribe((options) => {
		projectDropdownOptions = options;
	});

	function onOpen() {
		modalDataName = '';
		modalDataDescription = '';
		modalDataPriority = priorities[1];
		modalDataLabel = null;
		modalDataProject = null;
		modalDataPanelDate = new Date();
	}

	onMount(() => {
		hotkeys(openModalHotKey, () => {
			goto('/new-task');
		});

		return () => {
			hotkeys.unbind(openModalHotKey);
		};
	});

	function onClose() {
		// modalDataName = $state('');
		// modalDataDescription = $state('');
		// modalDataPriority = $state(priorities[1]);
		// modalDataLabel = $state(null);
		// modalDataProject = $state(null);
		// modalDataPanelDate = $state(new Date());

		goto('/');
	}

	function createNewTask() {
		if (!modalDataName) {
			return;
		}

		appState.task = {
			name: modalDataName,
			description: modalDataDescription,
			view_type: appState.selectedViewType,
			panel_date: onlyDate(modalDataPanelDate),
			priority: modalDataPriority.value as Priority,
			label_id: modalDataLabel?.value,
			project_id: modalDataProject?.value
		};
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
	on:close={onClose}
	on:open={onOpen}
	outsideclose
	size="md"
	classBody="dark:bg-neutral-900"
	classFooter="dark:bg-neutral-900"
	classHeader="dark:bg-neutral-900 dark:text-neutral-100"
>
	<!-- 	Task name input -->
	<TaskNameInput bind:value={modalDataName} on:enterKeyPressed={createNewTask} />

	<!-- 	Task description input -->
	<TaskDescriptionInput bind:value={modalDataDescription} />
	<div class="flex gap-4">
		<!-- Task priority select -->
		<TaskPriority bind:value={modalDataPriority} />

		<!-- Task label select -->
		<TaskFilter
			bind:value={modalDataLabel}
			dropdownOptions={labelDropdownOptions}
			placeholder="Labels"
			icon={iconLabel}
		/>

		<!-- Task project select -->
		<TaskFilter
			bind:value={modalDataProject}
			dropdownOptions={projectDropdownOptions}
			placeholder="Projects"
			icon={iconProject}
		/>

		<!-- Task Date Picker -->
		<div class="tickup-datepicker">
			<Datepicker
				bind:value={modalDataPanelDate}
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
				disabled={!modalDataName}
				class="me-2 inline-flex items-center gap-1 rounded-lg bg-accent-purple-1 px-5 py-2.5 text-center text-sm font-medium disabled:opacity-45 dark:text-neutral-100"
			>
				{#if appState.isLoadingCreateTask}
					<Spinner class="me-3" size="4" color="white" />
					Loading ...
				{:else}
					<Icon src={PlusSmall} class="size-5 text-neutral-100" />
					Add Task
				{/if}
			</button>
		</div>
	</svelte:fragment>
</Modal>
