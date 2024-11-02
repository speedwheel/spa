import { PUBLIC_API_URL } from '$env/static/public';
import type { CreateTaskProps, Task, WeeklyTasksResponse } from '$lib/types/tasks';
import { handleErrorResponse } from '$lib/utils/errorHandling';
import { api } from './api';

export interface FetchWeeklyTasksProps {
	view_type: string;
	current_date: string;
	label?: string;
	project?: string;
}

export const fetchWeeklyTasks = async (
	props: FetchWeeklyTasksProps
): Promise<WeeklyTasksResponse> => {
	const headers = api.setHeaders();
	const params = new URLSearchParams(Object.entries(props));

	const url = `${PUBLIC_API_URL}/users/tasks/weekly?${params.toString()}`;
	const res = await fetch(url, { headers });

	await handleErrorResponse(res, 'fetch weekly tasks');

	return res.json();
};

export const createTask = async (body: CreateTaskProps): Promise<Task> => {
	if (!body.description) delete body.description;
	if (!body.panel_date) delete body.panel_date;
	if (!body.label_id) delete body.label_id;
	if (!body.project_id) delete body.project_id;

	const headers = api.setHeaders();
	const url = `${PUBLIC_API_URL}/users/tasks`;
	const res = await fetch(url, {
		method: 'POST',
		headers,
		body: JSON.stringify(body)
	});

	await handleErrorResponse(res, 'add task');

	return res.json();
};

export const updateTask = async (task_id: string, body: Partial<Task>): Promise<Task> => {
	const headers = api.setHeaders();
	const url = `${PUBLIC_API_URL}/users/tasks/${task_id}`;
	const res = await fetch(url, {
		method: 'PATCH',
		headers,
		body: JSON.stringify(body)
	});

	await handleErrorResponse(res, 'update task');

	return res.json();
};
