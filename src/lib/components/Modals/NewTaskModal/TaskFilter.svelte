<script lang="ts">
	import type { DropdownOption } from '$lib/types/dropdowns';
	import type { NewTaskModalData } from '$lib/types/modals';
	import CheckOutline from 'flowbite-svelte-icons/CheckOutline.svelte';
	import type { Snippet } from 'svelte';
	import { Icon, XMark } from 'svelte-hero-icons';
	import Select from 'svelte-select';

	interface Props {
		newTask: NewTaskModalData;
		dropdownOptions: DropdownOption[];
		placeholder: string;
		key: keyof NewTaskModalData;
		icon: Snippet<[any]>;
	}

	let { newTask: newTask = $bindable(), dropdownOptions, placeholder, key, icon }: Props = $props();

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
	bind:value={newTask[key]}
	class="tickup-select"
	--height="32px"
>
	<div slot="item" let:item>
		{@render icon?.(item)}
		{item.label}

		{#if item.value == newTask.priority.value}
			<CheckOutline class="ml-2 h-5 w-5 dark:text-accent-purple-2" />
		{/if}
	</div>

	<div slot="selection" let:selection>
		{@render icon?.(selection)}
		{selection.label}
	</div>

	<div slot="clear-icon">
		<Icon src={XMark} />
	</div>
</Select>
