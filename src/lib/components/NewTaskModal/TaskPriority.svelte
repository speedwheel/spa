<script lang="ts">
	import { priorities, Priority, PriorityColors } from '$lib/constants/priorities';
	import type { NewTaskModalData } from '$lib/types/modals';
	import CheckOutline from 'flowbite-svelte-icons/CheckOutline.svelte';
	import { Flag, Icon, XMark } from 'svelte-hero-icons';
	import Select from 'svelte-select';

	interface Props {
		newTask: NewTaskModalData;
	}

	let { newTask: newTask = $bindable() }: Props = $props();
	let clearable = $derived.by(() => {
		return newTask.priority?.value !== priorities[1].value;
	});

	let floatingConfig = {
		strategy: 'fixed'
	};
</script>

<Select
	on:clear={() => {
		setTimeout(() => {
			newTask.priority = priorities[1];
		}, 0);
	}}
	items={priorities}
	{floatingConfig}
	{clearable}
	placeholder=""
	bind:value={newTask.priority}
	searchable={false}
	class="tickup-select"
	--height="32px"
>
	<div slot="item" let:item>
		<Icon src={Flag} class={`size-4 text-${PriorityColors[item.value as Priority]}`} />
		{item.label}

		{#if item.value == newTask.priority.value}
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
