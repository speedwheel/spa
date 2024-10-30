<script lang="ts">
	import type { BaseFilter } from '$lib/types/sharedTypes';
	import { SidebarDropdownWrapper } from 'flowbite-svelte';
	import type { Snippet } from 'svelte';
	import { ChevronDown, ChevronUp, Tag, Icon } from 'svelte-hero-icons';

	interface Props {
		selectedFilter: string;
		items: BaseFilter[];
		label: string;
		icon: Snippet<[any]>;
	}

	let { selectedFilter = $bindable(), items, label, icon }: Props = $props();
</script>

<SidebarDropdownWrapper
	isOpen
	{label}
	class="text-xs font-semibold dark:text-neutral-300 [&_span]:ms-0"
>
	<button
		onclick={() => {
			selectedFilter = '';
		}}
		class:bg-neutral-900={selectedFilter === ''}
		class="flex w-full items-center gap-1.5 rounded-md px-3 py-2 text-sm transition duration-75 dark:text-neutral-200 dark:hover:bg-neutral-900"
		type="button"><Icon src={Tag} class={`size-4 text-blue-400`} />all</button
	>
	{#each items as item (item.id)}
		<button
			onclick={() => {
				selectedFilter = item.id;
			}}
			class:bg-neutral-900={selectedFilter === item.id}
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
