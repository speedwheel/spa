import { PUBLIC_API_URL } from '$env/static/public';
import api from '$lib/api/api';
import type { Task } from '$lib/types/tasks';
import type { ViewType } from '$lib/types/viewType';
import { onlyDate } from '$lib/utils/dateFormatter';
import { addDays, format, subDays } from 'date-fns';
import { createStateHistory } from '$lib/states/stateHistory.svelte';

type AsyncData<T> = {
	data: Record<string, T>;
	isLoading: boolean;
};

type ApiResp<T> = {
	data: T[];
};

function createAppState() {
	const dateNow = new Date();
	let tasks: AsyncData<Task> = $state({ data: {}, isLoading: false });
	let selectedViewType: ViewType = $state('work');
	let baseDate: string = $state(onlyDate(dateNow));
	const dateStart: string = $derived.by(() => onlyDate(subDays(baseDate, 7)));
	const dateEnd: string = $derived.by(() => onlyDate(addDays(baseDate, 14)));

	let selectedLabel: string = $state('');
	let selectedProject: string = $state('');
	let isLoadingCreateTask = $state(false);
	const tasksStateHistory = createStateHistory(
		() => tasks,
		(newTasks: AsyncData<Task>) => (tasks = newTasks),
		100
	);

	const tasksByDate: Record<string, Task[]> = $derived.by(() => {
		const tasksByDateTemp: Record<string, Task[]> = {};
		const startingDate = new Date(dateStart);
		// Initialize tasksByDate with each date in the range, with empty arrays for each key
		while (startingDate <= new Date(dateEnd)) {
			const formattedDate = format(startingDate, 'yyyy-MM-dd'); // Format as YYYY-MM-DD
			tasksByDateTemp[formattedDate] = [];
			startingDate.setDate(startingDate.getDate() + 1); // Move to the next day
		}

		// Group and insert tasks that meet filter criteria
		Object.values(tasks.data).forEach((task) => {
			const taskDate = task.panel_date; // assuming `panel_date` is in YYYY-MM-DD format
			const key = `${taskDate}`;

			// Apply additional filters for view type, label, and project
			if (
				tasksByDateTemp[key] &&
				task.view_type === selectedViewType &&
				(selectedLabel === '' || task.label?.id === selectedLabel) &&
				(selectedProject === '' || task.project?.id === selectedProject)
			) {
				tasksByDateTemp[key].push(task);
			}
		});

		// Sort each array by `order_index` only when necessary
		Object.keys(tasksByDateTemp).forEach((date) => {
			if (tasksByDateTemp[date].length > 1) {
				tasksByDateTemp[date].sort((a, b) => a.order_index - b.order_index);
			}
		});

		return tasksByDateTemp;
	});

	async function loadTasks() {
		tasks.isLoading = true;
		const headers = api.setHeaders();
		const params = new URLSearchParams();
		params.append('date_start', dateStart);
		params.append('date_end', dateEnd);
		if (selectedLabel) params.append('label_id', selectedLabel);
		if (selectedProject) params.append('project_id', selectedProject);

		const url = `${PUBLIC_API_URL}/users/tasks?${params.toString()}`;
		const res = await fetch(url, { headers });
		if (!res.ok) {
			throw new Error('Failed to fetch tasks');
		}

		const resp: ApiResp<Task> = await res.json();
		tasks.isLoading = false;
		tasks.data = resp.data.reduce((acc: Record<string, Task>, task: Task) => {
			acc[task.id] = task;
			return acc;
		}, {});
	}

	async function createTask(props: Partial<Task>) {
		isLoadingCreateTask = true;
		const headers = api.setHeaders();
		const res = await fetch(`${PUBLIC_API_URL}/users/tasks`, {
			method: 'POST',
			headers,
			body: JSON.stringify(props)
		});
		if (!res.ok) {
			throw new Error('Failed to create task');
		}

		const newTask: Task = await res.json();
		isLoadingCreateTask = false;

		const taskIdsTobeUpdated: string[] = [];

		// get the tasks with the same date and view_type
		const clonedTasks = $state.snapshot(tasks);
		Object.entries(tasksByDate).forEach(([date, tasks]) => {
			if (newTask.panel_date === date) {
				tasks.forEach((task) => {
					if (task.view_type === newTask.view_type) {
						taskIdsTobeUpdated.push(task.id);
					}
				});
			}
		});

		taskIdsTobeUpdated.forEach((id) => {
			clonedTasks.data[id].order_index += 1;
		});

		clonedTasks.data[newTask.id] = newTask;

		tasks = clonedTasks;
	}

	async function updateTask(taskId: string, updates: Partial<Task>) {
		const oldTask = tasks.data[taskId];
		if (!oldTask) {
			throw new Error('Task not found');
		}

		// compare the values
		const changes: Partial<Task> = {};
		for (const key in updates) {
			if (oldTask[key as keyof Task] !== updates[key as keyof Task]) {
				changes[key as keyof Task] = updates[key as keyof Task];
			}
		}

		if (Object.keys(changes).length === 0) {
			return;
		}

		// if panel_date is changed, find the maximum order_index of the tasks with the same date and view_type and update the task with max order_index + 1
		tasksStateHistory.performAction(() => {
			if (changes.panel_date) {
				const tasksWithSameDate = tasksByDate[changes.panel_date];
				if (tasksWithSameDate.length === 0) {
					updates.order_index = 0;
				} else {
					const maxOrderIndex = Math.max(
						...tasksWithSameDate
							.filter((task) => task.view_type === oldTask.view_type)
							.map((task) => task.order_index)
					);

					updates.order_index = maxOrderIndex + 1;
				}
			}
			// update tasks state

			tasks.data[taskId] = { ...oldTask, ...updates };
		});

		// update task on the server
		const headers = api.setHeaders();
		const url = `${PUBLIC_API_URL}/users/tasks/${taskId}`;
		let res;
		try {
			res = await fetch(url, {
				method: 'PATCH',
				headers,
				body: JSON.stringify(updates)
			});
		} catch (error) {
			// revert the changes if the update fails
			tasksStateHistory.undo();
			throw new Error(`Failed to update task ${taskId}: ${error}`);
		}
		if (!res.ok) {
			// revert the changes if the update fails
			tasksStateHistory.undo();
			throw new Error(`Failed to update task ${taskId}`);
		}

		// update state using data on server
		// const taskUpdated: Task = await res.json();

		// // update the task in the state
		// tasks.data[taskId] = taskUpdated;
	}

	async function sortTasks(taskID: string, newIndex: number, newDate: string) {
		// update the task in the state
		const task = tasks.data[taskID];
		const oldDate = task.panel_date;
		const oldIndex = task.order_index;

		// tasks.data['0192f8d0-0af9-703d-9899-f15404419f97'].order_index = 1;
		// task.order_index = 0;
		const clonedTasks = $state.snapshot(tasks);
		tasksStateHistory.performAction(() => {
			if (!oldDate) return;
			if (oldDate !== newDate) {
				// Task moved to a different date
				const tasksWithSameDate = tasksByDate[oldDate];
				const tasksWithNewDate = tasksByDate[newDate];

				// Adjust order_index of tasks in the old date column
				if (tasksWithSameDate.length > 0) {
					tasksWithSameDate.forEach((otherTask) => {
						if (otherTask.view_type === task.view_type && otherTask.order_index > oldIndex) {
							clonedTasks.data[otherTask.id].order_index -= 1;
						}
					});
				}

				// Adjust order_index of tasks in the new date column
				if (tasksWithNewDate.length > 0) {
					tasksWithNewDate.forEach((otherTask) => {
						if (otherTask.view_type === task.view_type && otherTask.order_index >= newIndex) {
							clonedTasks.data[otherTask.id].order_index += 1;
						}
					});
				}

				// Update the task's date and order_index
				clonedTasks.data[taskID].panel_date = newDate;
				clonedTasks.data[taskID].order_index = newIndex;
			} else {
				// Task moved within the same date
				const tasksWithSameDate = tasksByDate[oldDate];

				if (newIndex > oldIndex) {
					// Moving downwards
					tasksWithSameDate.forEach((otherTask) => {
						if (
							otherTask.view_type === task.view_type &&
							otherTask.order_index > oldIndex &&
							otherTask.order_index <= newIndex
						) {
							tasks.data[otherTask.id].order_index -= 1;
						}
					});
				} else if (newIndex < oldIndex) {
					// Moving upwards
					tasksWithSameDate.forEach((otherTask) => {
						if (
							otherTask.view_type === task.view_type &&
							otherTask.order_index < oldIndex &&
							otherTask.order_index >= newIndex
						) {
							clonedTasks.data[otherTask.id].order_index += 1;
						}
					});
				}

				// Update the task's order_index within the same date
				clonedTasks.data[taskID].order_index = newIndex;
			}

			tasks = clonedTasks;
		});

		// update task on the server
		const payload = {
			id: taskID,
			order_index: newIndex,
			panel_date: newDate ? newDate : task.panel_date,
			view_type: task.view_type
		};

		const headers = api.setHeaders();
		const url = `${PUBLIC_API_URL}/users/tasks/weekly/sort`;
		let res;
		try {
			res = await fetch(url, {
				method: 'POST',
				headers,
				body: JSON.stringify(payload)
			});
		} catch (error) {
			// revert the changes if the update fails
			tasksStateHistory.undo();
			throw new Error(`Failed to update task ${taskID}: ${error}`);
		}
		if (!res.ok) {
			// revert the changes if the update fails
			tasksStateHistory.undo();
			throw new Error(`Failed to update task ${taskID}`);
		}
	}

	return {
		loadTasks,
		getTask(taskID: string) {
			return tasks.data[taskID];
		},
		get tasks() {
			return tasks;
		},
		set tasks(newTasks: AsyncData<Task>) {
			tasks = newTasks;
		},
		set task(props: Partial<Task>) {
			createTask(props);
		},
		updateTask,
		get selectedViewType() {
			return selectedViewType;
		},
		set selectedViewType(viewType: ViewType) {
			selectedViewType = viewType;
		},
		get selectedLabel() {
			return selectedLabel;
		},
		set selectedLabel(labelID: string) {
			selectedLabel = labelID;
		},
		get selectedProject() {
			return selectedProject;
		},
		set selectedProject(projectID: string) {
			selectedProject = projectID;
		},
		get tasksByDate() {
			return tasksByDate;
		},
		get isLoadingCreateTask() {
			return isLoadingCreateTask;
		},
		get dateStart() {
			return dateStart;
		},
		get dateEnd() {
			return dateEnd;
		},
		get baseDate() {
			return baseDate;
		},
		set baseDate(newDate: string) {
			baseDate = newDate;
		},
		sortTasks
	};
}

let appState: ReturnType<typeof createAppState>;

export function getAppState() {
	if (!appState) {
		appState = createAppState();
	}
	return appState;
}
