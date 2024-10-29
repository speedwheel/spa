<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import LeftSidebar from '$lib/components/LeftSidebar.svelte';
	import WeeklyTasks from '$lib/components/WeeklyTasks.svelte';
	let { children } = $props();
	document.body.classList.add('flex', 'flex-col', 'h-screen', 'select-none', 'dark:bg-neutral-800');
</script>

<Header />
<div class="flex flex-1">
	<LeftSidebar />
	<WeeklyTasks />
	{@render children()}
</div>
