<script lang="ts">
	import { page } from '$app/stores';
	import EditTaskModal from '$lib/components/Modals/editTask/EditTaskModal.svelte';
	import { getModalState } from '$lib/states/modalState.svelte';
	const modalState = getModalState();

	modalState.editTaskID = $page.params.task_id;
	if (modalState.editTaskID) {
		modalState.isOpenEditTask = true;
	}
</script>

<EditTaskModal />
