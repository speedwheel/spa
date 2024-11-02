<script lang="ts">
	import { viewTypeStore } from '$lib/stores/viewTypeStore';
	import { Sidebar, SidebarGroup, SidebarWrapper } from 'flowbite-svelte';
	import { Calendar, Icon, Inbox, Briefcase, User, Tag } from 'svelte-hero-icons';
	import { labelsStore, projectsStore } from '$lib/stores/filtersStore';
	import SidebarFilter from '$lib/components/Sidebars/LeftSidebar/SidebarFilter.svelte';
	import { selectedLabelStore, selectedProjectStore } from '$lib/stores/selectedFiltersStore';

	selectedProjectStore.subscribe((value) => {
		console.log('selectedProjectStore', value);
	});

	// setTimeout(() => {
	// 	labelsStore.addEntity({ id: '1', name: 'Personal', color: 'blue', created_at: new Date() });
	// }, 3000);
</script>

{#snippet labelIcon(color: string)}
	<Icon src={Tag} class={`size-4 text-${color}`} />
{/snippet}
{#snippet projectIcon(color: string)}
	<Icon src={Tag} class={`size-4 text-${color}`} />
{/snippet}

<Sidebar class="w-72">
	<SidebarWrapper class="h-full border-r dark:border-r-neutral-700 dark:bg-neutral-800">
		<SidebarGroup>
			<div class="">
				<div class="whitespace-nowrap pb-2 text-xs font-semibold uppercase text-neutral-400">
					View
				</div>
				<div class="mb-4 inline-flex w-full rounded-md bg-neutral-900 shadow-md" role="group">
					<div class="flex flex-1 items-center justify-center p-0.5">
						<input
							id="work-view"
							type="radio"
							name="view"
							value="work"
							bind:group={$viewTypeStore}
							class="peer sr-only"
						/>
						<label
							for="work-view"
							class="flex flex-1 cursor-pointer flex-col items-center rounded-md p-1 text-neutral-400 peer-checked:bg-neutral-700 peer-checked:text-neutral-100"
						>
							<Icon src={Briefcase} mini class="mb-1 h-5 w-5 text-neutral-200" />
							<div class="text-xs font-medium">Work</div>
						</label>
					</div>
					<div class="flex flex-1 items-center justify-center p-0.5">
						<input
							id="personal-view"
							type="radio"
							name="view"
							value="personal"
							bind:group={$viewTypeStore}
							class="peer sr-only"
						/>
						<label
							for="personal-view"
							class="flex flex-1 cursor-pointer flex-col items-center rounded-md p-1 text-neutral-400 peer-checked:bg-neutral-700 peer-checked:text-neutral-100"
						>
							<Icon src={User} mini class="mb-1 h-5 w-5 text-neutral-200" />
							<div class="text-xs font-medium">Personal</div>
						</label>
					</div>
				</div>
				<div class="mb-4 flex">
					<button
						class="flex h-9 flex-1 items-center rounded-md bg-neutral-900 px-2.5"
						type="button"
					>
						<Icon src={Inbox} solid class="mr-1.5 size-5 text-neutral-400" />
						<div class="text-xs text-neutral-100">Inbox</div>
					</button>
				</div>
				<div class="mb-4 flex">
					<button
						class="open-today-modal flex h-9 flex-1 items-center rounded-md bg-neutral-900 px-2.5"
						type="button"
					>
						<Icon src={Calendar} solid class="mr-1.5 size-5 text-neutral-400" />
						<div class="text-xs text-neutral-100">Today</div>
					</button>
				</div>
				<div class="mb-4 h-px w-full bg-neutral-700"></div>
			</div>

			<SidebarFilter
				selectedFilter={selectedLabelStore}
				items={labelsStore}
				icon={labelIcon}
				label="Labels"
			/>
			<SidebarFilter
				selectedFilter={selectedProjectStore}
				items={projectsStore}
				icon={projectIcon}
				label="Projects"
			/>
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>
