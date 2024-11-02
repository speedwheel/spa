<script lang="ts">
	import type { DropdownOption } from '$lib/types/misc';
	import CheckOutline from 'flowbite-svelte-icons/CheckOutline.svelte';
	import type { Snippet } from 'svelte';
	import { Icon, XMark, ChevronDown } from 'svelte-hero-icons';
	import Select from 'svelte-select';

	interface Props {
		value: DropdownOption | null;
		dropdownOptions: DropdownOption[];
		placeholder: string;
		icon: Snippet<[any]>;
		class?: string;
		showChevron?: boolean;
	}

	let { value = $bindable(), dropdownOptions, placeholder, icon, ...props }: Props = $props();

	let floatingConfig = {
		strategy: 'fixed'
	};
</script>

<Select
	on:clear={() => {
		setTimeout(() => {
			//newTask.priority = priorities[1];
		}, 0);
	}}
	items={dropdownOptions}
	{floatingConfig}
	clearable={true}
	{placeholder}
	searchable={true}
	bind:value
	class={`tickup-select ${props.class}`}
	showChevron={props.showChevron}
	--height="32px"
>
	<div class={`mr-1 text-${value?.color}`} slot="prepend">{@render icon?.('neutral-400')}</div>

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
