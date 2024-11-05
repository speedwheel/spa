<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import LeftSidebar from '$lib/components/Sidebars/LeftSidebar/LeftSidebar.svelte';
	import WeeklyTasks from '$lib/components/Tasks/WeeklyTasks.svelte';
	import { getAppState } from '$lib/states/appState.svelte';
	import '$lib/states/hotkeysState.svelte';

	let { children } = $props();

	const appState = getAppState();
	appState.loadFilters('labels');
	appState.loadFilters('projects');
</script>

<Header />
<div class="relative flex flex-1 overflow-hidden">
	<LeftSidebar />
	<WeeklyTasks />
	{@render children()}
</div>
