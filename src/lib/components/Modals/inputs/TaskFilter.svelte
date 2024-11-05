<script lang="ts">
	import type { AsyncData } from '$lib/states/appState.svelte';
	import type { DropdownOption } from '$lib/types/misc';
	import type { BaseFilter } from '$lib/types/sharedTypes';
	import CheckOutline from 'flowbite-svelte-icons/CheckOutline.svelte';
	import { watch } from 'runed';
	import { createEventDispatcher, type Snippet } from 'svelte';
	import { Icon, XMark, ChevronDown } from 'svelte-hero-icons';
	import Select from 'svelte-select';

	interface Props {
		value: DropdownOption | null;
		placeholder: string;
		icon: Snippet<[any]>;
		class?: string;
		showChevron?: boolean;
		items: DropdownOption[];
		type?: 'label' | 'project';
	}

	let { value = $bindable(), items, placeholder, icon, ...props }: Props = $props();

	let floatingConfig = {
		strategy: 'fixed'
	};

	const dispatch = createEventDispatcher();
</script>

<Select
	on:clear={() => {
		setTimeout(() => {
			//newTask.priority = priorities[1];
		}, 0);
	}}
	{items}
	{floatingConfig}
	clearable={true}
	{placeholder}
	searchable={true}
	bind:value
	class={`tickup-select ${props.class}`}
	showChevron={props.showChevron}
	--height="32px"
	on:change={() => dispatch('change', { type: props.type, value: value?.value })}
>
	<div class={`mr-1 text-${value?.color}`} slot="prepend">
		{@render icon?.('neutral-400')}
	</div>

	<div slot="item" let:item>
		{@render icon?.(item)}
		{item.label}

		{#if item.value == value?.value}
			<CheckOutline class="ml-2 h-5 w-5 dark:text-accent-purple-2" />
		{/if}
	</div>

	<div slot="selection" let:selection>
		<!-- {@render icon?.(selection)} -->
		{selection.label}
	</div>

	<div slot="clear-icon">
		<Icon src={XMark} />
	</div>
</Select>
