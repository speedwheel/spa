<script lang="ts">
	import { Modal, Datepicker } from 'flowbite-svelte';
	import TaskNameInput from '../inputs/TaskNameInput.svelte';
	import { priorities, PriorityColors } from '$lib/constants/priorities';
	import type { DropdownOption } from '$lib/types/dropdowns';
	import TaskDescriptionInput from '../inputs/TaskDescriptionInput.svelte';
	import TaskPriority from '../inputs/TaskPriority.svelte';
	import TaskFilter from '../inputs/TaskFilter.svelte';
	import { Icon, PlayCircle, Tag, Hashtag } from 'svelte-hero-icons';
	import { getAppState } from '$lib/states/appState.svelte';
	import { watch } from 'runed';
	import { getModalState } from '$lib/states/modalState.svelte';
	import { goto } from '$app/navigation';
	import { toTitleCase } from '$lib/utils/stringFormatter';
	import { onlyDate } from '$lib/utils/dateFormatter';
	import type { Task } from '$lib/types/tasks';

	let modalDataName: string | null = $state('');
	let modalDataDescription: string | null = $state('');
	let modalDataPriority: DropdownOption = $state(priorities[1]);
	let modalDataLabel: DropdownOption | null = $state(null);
	let modalDataProject: DropdownOption | null = $state(null);
	let modalDataPanelDate: Date | null = $state(new Date());

	const appState = getAppState();
	const modalState = getModalState();

	// // Update the modalDataName and modalDataDescription when the modal is opened
	// // We are using watch because we might refresh or open the modal via URL
	watch(
		[() => modalState.editTaskID, () => appState.tasks.isLoading],
		([editTaskID, tasksIsLoading]) => {
			if (!editTaskID || tasksIsLoading) return;
			const t = appState.getTask(editTaskID);
			if (!t) return;
			modalDataName = t.name;
			modalDataDescription = t.description;
			modalDataPriority = {
				label: toTitleCase(t.priority),
				value: t.priority,
				color: PriorityColors[t.priority]
			};
			if (t.label_id) {
				const label = appState.labels.labels.data[t.label_id];
				if (label) {
					modalDataLabel = {
						label: label.name,
						value: label.id,
						color: label.color
					};
				}
			}
			if (t.project_id) {
				const project = appState.projects.projects.data[t.project_id];
				if (project) {
					modalDataProject = {
						label: project.name,
						value: project.id,
						color: project.color
					};
				}
			}
			if (t.panel_date) {
				modalDataPanelDate = new Date(t.panel_date);
			}
		}
	);

	function onClose() {
		goto('/');
	}

	function onUpdateTask(e: CustomEvent, type?: string) {
		type = type ?? (e.detail.type as string);
		if (type === 'label') {
			appState.updateTask(modalState.editTaskID, { label_id: e.detail?.value });
		} else if (type === 'project') {
			appState.updateTask(modalState.editTaskID, { project_id: e.detail?.value });
		} else if (type === 'priority') {
			appState.updateTask(modalState.editTaskID, { priority: e.detail?.value });
		} else if (type === 'panel_date') {
			appState.updateTask(modalState.editTaskID, { panel_date: onlyDate(e.detail) });
		} else if (type === 'name') {
			appState.updateTask(modalState.editTaskID, { name: e.detail?.value });
		} else if (type === 'description') {
			appState.updateTask(modalState.editTaskID, { description: e.detail?.value });
		}
	}
</script>

{#snippet iconLabel(option: DropdownOption)}
	<Icon src={Tag} class={`size-4 text-${option.color}`} />
{/snippet}

{#snippet iconProject(option: DropdownOption)}
	<Icon src={Hashtag} class={`size-4 text-${option.color}`} />
{/snippet}

{#if modalDataName}
	<Modal
		title="Edit task"
		on:close={onClose}
		bind:open={modalState.isOpenEditTask}
		outsideclose
		size="lg"
		backdropClass="fixed inset-0 z-40 dark:bg-neutral-700 bg-opacity-50 dark:bg-opacity-70"
		classBody="dark:bg-neutral-900 !p-0 "
		classFooter="dark:bg-neutral-900"
		classHeader="dark:bg-neutral-900 dark:text-neutral-100 [&_button:hover]:dark:!bg-neutral-700"
		classDialog="[&_.dark\:divide-gray-700]:!divide-neutral-700"
	>
		<div class="flex">
			<div class="max-h-[80vh] flex-1 overflow-y-auto p-4 md:p-6">
				<TaskNameInput bind:value={modalDataName} on:update={onUpdateTask} delay={300} />
				<TaskDescriptionInput bind:value={modalDataDescription} on:update={onUpdateTask} />
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
					<TaskPriority
						bind:value={modalDataPriority}
						class="!w-full"
						showChevron={true}
						on:change={onUpdateTask}
					/>
				</div>

				<div class="mb-4 border-b border-dashed border-b-neutral-700 pb-4">
					<div class="mb-2 text-xs dark:text-neutral-400">Label</div>
					<TaskFilter
						bind:value={modalDataLabel}
						items={appState.labels.labelsDropdown}
						placeholder="Labels"
						icon={iconLabel}
						class="!w-full"
						showChevron={true}
						type="label"
						on:change={onUpdateTask}
					/>
				</div>

				<div class="mb-4 border-b border-dashed border-b-neutral-700 pb-4">
					<div class="mb-2 text-xs dark:text-neutral-400">Project</div>
					<TaskFilter
						bind:value={modalDataProject}
						items={appState.projects.projectsDropdown}
						placeholder="Projects"
						icon={iconProject}
						class="!w-full"
						showChevron={true}
						type="project"
						on:change={onUpdateTask}
					/>
				</div>

				<div>
					<div class="mb-2 text-xs dark:text-neutral-400">Date</div>
					<div class="tickup-datepicker [&_input]:!w-full">
						<Datepicker
							bind:value={modalDataPanelDate}
							on:select={(e) => {
								onUpdateTask(e, 'panel_date');
							}}
							dateFormat={{ year: '2-digit', month: 'short', day: '2-digit' }}
							defaultDate={new Date()}
							autohide={true}
							showActionButtons
						/>
					</div>
				</div>
			</div>
		</div>
	</Modal>
{/if}
