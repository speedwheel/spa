import { PUBLIC_API_URL } from '$env/static/public';
import api from '$lib/api/api';
import type { Task } from '$lib/types/tasks';
import type { ViewType } from '$lib/types/viewType';
import { onlyDate } from '$lib/utils/dateFormatter';
import { addDays, format, subDays } from 'date-fns';

type TasksResp = {
	data: Task[];
};

function createAppState() {
	const dateNow = new Date();
	let tasks: Record<string, Task> = $state({});
	const viewType: ViewType = $state('work');
	const dateStart: string = $state(onlyDate(subDays(dateNow, 7)));
	const dateEnd: string = $state(onlyDate(addDays(dateNow, 7)));
	const labelID: string = $state('');
	const projectID: string = $state('');

	const tasksByDate: Record<string, Task[]> = $derived.by(() => {
		const tasksByDateTemp: Record<string, Task[]> = {};
		// Initialize tasksByDate with each date in the range, with empty arrays for each key
		const currentDate = new Date(dateStart);
		while (currentDate <= new Date(dateEnd)) {
			const formattedDate = format(currentDate, 'yyyy-MM-dd'); // Format as YYYY-MM-DD
			const key = `${formattedDate}`;
			tasksByDateTemp[key] = [];
			currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
		}

		// Group tasks by date key
		Object.entries(tasks).forEach(([, task]) => {
			const taskDate = task.panel_date; // assuming `panel_date` is in YYYY-MM-DD format
			const key = `${taskDate}`;
			if (tasksByDateTemp[key]) {
				tasksByDateTemp[key].push(task);
			}
		});

		return tasksByDateTemp;
	});

	async function loadTasks() {
		const headers = api.setHeaders();
		const params = new URLSearchParams();
		params.append('date_start', dateStart);
		params.append('date_end', dateEnd);
		params.append('view_type', viewType);
		if (labelID) params.append('label_id', labelID);
		if (projectID) params.append('project_id', projectID);

		const url = `${PUBLIC_API_URL}/users/tasks?${params.toString()}`;
		const res = await fetch(url, { headers });
		if (!res.ok) {
			throw new Error('Failed to fetch tasks');
		}

		const resp: TasksResp = await res.json();

		tasks = resp.data.reduce((acc: Record<string, Task>, task: Task) => {
			acc[task.id] = task;
			return acc;
		}, {});
	}

	return {
		loadTasks,
		get tasks() {
			return tasks;
		},
		get tasksByDate() {
			return tasksByDate;
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
