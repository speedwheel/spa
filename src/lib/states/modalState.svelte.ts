function createModalState() {
	let isOpenNewTask = $state(false);
	let isOpenEditTask = $state(false);
	let editTaskID = $state('');

	return {
		get isOpenNewTask() {
			return isOpenNewTask;
		},
		get isOpenEditTask() {
			return isOpenEditTask;
		},
		set isOpenNewTask(isOpen: boolean) {
			isOpenNewTask = isOpen;
		},
		set isOpenEditTask(isOpen: boolean) {
			isOpenEditTask = isOpen;
		},
		get editTaskID() {
			return editTaskID;
		},
		set editTaskID(taskID: string) {
			editTaskID = taskID;
		}
	};
}

let modalState: ReturnType<typeof createModalState>;

export function getModalState() {
	if (!modalState) {
		modalState = createModalState();
	}
	return modalState;
}
