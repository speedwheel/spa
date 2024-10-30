<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import EditTaskModal from '$lib/components/Modals/EditTaskModal/EditTaskModal.svelte';
	import NewTaskModal from '$lib/components/Modals/NewTaskModal/NewTaskModal.svelte';
	import LeftSidebar from '$lib/components/Sidebars/LeftSidebar/LeftSidebar.svelte';
	import WeeklyTasks from '$lib/components/Tasks/WeeklyTasks.svelte';
	let { children } = $props();
</script>

<Header />
<div class="relative flex flex-1 overflow-hidden">
	<LeftSidebar />
	<WeeklyTasks />
	{@render children()}
	<NewTaskModal />
	<EditTaskModal />
</div>
