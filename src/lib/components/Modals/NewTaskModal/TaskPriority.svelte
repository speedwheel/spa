<script lang="ts">
	import { priorities, Priority, PriorityColors } from '$lib/constants/priorities';
	import type { DropdownOption } from '$lib/types/dropdowns';
	import CheckOutline from 'flowbite-svelte-icons/CheckOutline.svelte';
	import { Flag, Icon, XMark } from 'svelte-hero-icons';
	import Select from 'svelte-select';

	interface Props {
		value: DropdownOption | null;
		class?: string;
		showChevron?: boolean;
	}

	let { value = $bindable(), ...props }: Props = $props();
	let clearable = $derived.by(() => {
		if (!value) return;
		return value.value !== priorities[1].value;
	});

	let floatingConfig = {
		strategy: 'fixed'
	};
</script>

<Select
	on:clear={() => {
		setTimeout(() => {
			value = priorities[1];
		}, 1);
	}}
	items={priorities}
	{floatingConfig}
	{clearable}
	placeholder=""
	bind:value
	searchable={false}
	class={`tickup-select ${props.class}`}
	--height="32px"
	showChevron={props.showChevron}
>
	<div slot="item" let:item>
		<Icon src={Flag} class={`size-4 text-${PriorityColors[item.value as Priority]}`} />
		{item.label}

		{#if item.value == value?.value}
			<CheckOutline class="ml-2 h-5 w-5 dark:text-accent-purple-2" />
		{/if}
	</div>

	<div slot="selection" let:selection>
		<Icon src={Flag} class={`size-4 text-${PriorityColors[selection.value as Priority]}`} />
		{selection.label}
	</div>

	<div slot="clear-icon">
		<Icon src={XMark} />
	</div>
</Select>
