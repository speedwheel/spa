<script lang="ts">
	import NewTaskModal from '$lib/components/Modals/newTask/NewTaskModal.svelte';
	import { getModalState } from '$lib/states/modalState.svelte';

	const modalState = getModalState();
	modalState.isOpenNewTask = true;
</script>

<NewTaskModal />
