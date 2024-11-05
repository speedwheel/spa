<script lang="ts">
	import { SidebarDropdownWrapper } from 'flowbite-svelte';
	import { type Snippet } from 'svelte';
	import { ChevronDown, ChevronUp, Tag, Icon } from 'svelte-hero-icons';
	import { getAppState, type AsyncData } from '$lib/states/appState.svelte';
	import type { BaseFilter } from '$lib/types/sharedTypes';

	interface Props {
		filterType: 'selectedLabel' | 'selectedProject';
		type: 'labels' | 'projects';
		icon: Snippet<[any]>;
		items: AsyncData<BaseFilter>;
	}

	let { filterType, type, icon, items }: Props = $props();

	const appState = getAppState();
</script>

<SidebarDropdownWrapper
	isOpen
	label={type}
	class="text-xs font-semibold dark:text-neutral-300 [&_span]:ms-0"
	transitionType="slide"
	ulClass="flex flex-col gap-1.5"
	btnClass="flex items-center p-2 w-full text-base font-normal text-neutral-900 rounded-lg transition duration-75 group hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700"
>
	<button
		onclick={() => {
			appState[filterType] = '';
		}}
		class:bg-neutral-900={appState[filterType] === ''}
		class="flex w-full items-center gap-1.5 rounded-md px-3 py-2 text-sm transition duration-75 dark:text-neutral-200 dark:hover:bg-neutral-900"
		type="button"><Icon src={Tag} class={`size-4 text-blue-400`} />all</button
	>
	{#each Object.entries(items.data) as [id, item] (id)}
		<button
			onclick={() => {
				appState[filterType] = item.id;
			}}
			class:bg-neutral-900={appState[filterType] === item.id}
			class="flex w-full items-center gap-1.5 rounded-md px-3 py-2 text-sm transition duration-75 dark:text-neutral-200 dark:hover:bg-neutral-900"
			type="button">{@render icon?.(item.color)} {item.name}</button
		>
	{/each}

	<svelte:fragment slot="icon"></svelte:fragment>
	<svelte:fragment slot="arrowup">
		<Icon src={ChevronUp} micro class="size-6 translate-x-1 text-neutral-300" />
	</svelte:fragment>
	<svelte:fragment slot="arrowdown">
		<Icon src={ChevronDown} micro class="size-6 translate-x-1 text-neutral-300" />
	</svelte:fragment>
</SidebarDropdownWrapper>
