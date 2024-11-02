import { PUBLIC_API_URL } from '$env/static/public';
import api from '$lib/api/api';
import type { NewTaskProps } from '$lib/types';
import type { Task } from '$lib/types/tasks';
import type { ViewType } from '$lib/types/viewType';
import { onlyDate } from '$lib/utils/dateFormatter';
import { addDays, format, subDays } from 'date-fns';

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
	const dateStart: string = $state(onlyDate(subDays(dateNow, 7)));
	const dateEnd: string = $state(onlyDate(addDays(dateNow, 14)));
	let selectedLabel: string = $state('');
	let selectedProject: string = $state('');
	let isLoadingCreateTask = $state(false);

	const tasksByDate: Record<string, Task[]> = $derived.by(() => {
		const tasksByDateTemp: Record<string, Task[]> = {};
		const currentDate = new Date(dateStart);

		// Initialize tasksByDate with each date in the range, with empty arrays for each key
		while (currentDate <= new Date(dateEnd)) {
			const formattedDate = format(currentDate, 'yyyy-MM-dd'); // Format as YYYY-MM-DD
			tasksByDateTemp[formattedDate] = [];
			currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
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

	async function createTask(props: NewTaskProps) {
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
		Object.entries(tasksByDate).forEach(([date, tasks]) => {
			if (newTask.panel_date === date) {
				tasks.forEach((task) => {
					if (task.view_type === newTask.view_type) {
						taskIdsTobeUpdated.push(task.id);
					}
				});
			}
		});

		// and increment their order_index by 1
		taskIdsTobeUpdated.forEach((id) => {
			tasks.data[id].order_index += 1;
		});

		// add the new task to the tasks data
		tasks.data[newTask.id] = newTask;

		// await loadTasks();
	}

	return {
		loadTasks,
		get tasks() {
			return tasks;
		},
		set tasks(newTasks: AsyncData<Task>) {
			tasks = newTasks;
		},
		set task(props: NewTaskProps) {
			createTask(props);
		},
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
		}
	};
}

let appState: ReturnType<typeof createAppState>;

export function getAppState() {
	if (!appState) {
		appState = createAppState();
	}
	return appState;
}
