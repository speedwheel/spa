<script lang="ts">
	import TaskPriority from '../inputs/TaskPriority.svelte';
	import { Modal } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import TaskDescriptionInput from '../inputs/TaskDescriptionInput.svelte';
	import { priorities, Priority } from '$lib/constants/priorities';
	import { Icon, XMark, PlusSmall, Tag, Hashtag } from 'svelte-hero-icons';
	import TaskNameInput from '../inputs/TaskNameInput.svelte';
	import { type DropdownOption } from '$lib/types/misc';
	import TaskFilter from '../inputs/TaskFilter.svelte';
	import { onlyDate } from '$lib/utils/dateFormatter';
	import { Datepicker } from 'flowbite-svelte';
	import { getAppState } from '$lib/states/appState.svelte';
	import { Spinner } from 'flowbite-svelte';
	import { watch } from 'runed';
	import { getModalState } from '$lib/states/modalState.svelte';

	let modalDataName: string = $state('');
	let modalDataDescription: string = $state('');
	let modalDataPriority: DropdownOption = $state(priorities[1]);
	let modalDataLabel: DropdownOption | null = $state(null);
	let modalDataProject: DropdownOption | null = $state(null);
	let modalDataPanelDate: Date | null = $state(new Date());

	const appState = getAppState();
	const modalState = getModalState();

	watch(
		() => appState.isLoadingCreateTask,
		(curr, prev) => {
			if (!curr && prev) {
				onClose();
			}
		}
	);

	function onOpen() {}

	function onClose() {
		goto('/');
	}

	function createNewTask() {
		if (!modalDataName) {
			return;
		}

		appState.createTask({
			name: modalDataName,
			description: modalDataDescription,
			view_type: appState.selectedViewType,
			panel_date: onlyDate(modalDataPanelDate),
			priority: modalDataPriority.value as Priority,
			label_id: modalDataLabel?.value,
			project_id: modalDataProject?.value
		});
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
	bind:open={modalState.isOpenNewTask}
	on:close={onClose}
	on:open={onOpen}
	outsideclose
	size="md"
	classBackdrop="fixed inset-0 z-40 dark:bg-neutral-700 bg-opacity-50 dark:bg-opacity-70"
	classBody="dark:bg-neutral-900"
	classFooter="dark:bg-neutral-900"
	classHeader="dark:bg-neutral-900 dark:text-neutral-100 dark:[&_button:hover]:!bg-neutral-700"
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
			items={appState.labels.labelsDropdown}
			placeholder="Labels"
			icon={iconLabel}
		/>

		<!-- Task project select -->
		<TaskFilter
			bind:value={modalDataProject}
			items={appState.projects.projectsDropdown}
			placeholder="Projects"
			icon={iconProject}
		/>

		<!-- Task Date Picker -->
		<div class="tickup-datepicker">
			<Datepicker
				bind:value={modalDataPanelDate}
				dateFormat={{ year: '2-digit', month: 'short', day: '2-digit' }}
				defaultDate={new Date()}
				autohide={true}
				showActionButtons
			/>
		</div>
	</div>
	<svelte:fragment slot="footer">
		<div class="flex w-full justify-end gap-4">
			<button
				onclick={() => (modalState.isOpenNewTask = false)}
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
