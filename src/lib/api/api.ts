import type { CreateTaskProps, Task, UpdateTaskProps, WeeklyTasksResponse } from '$lib/types/tasks';
import {
	createTask,
	fetchWeeklyTasks,
	updateTask,
	type FetchWeeklyTasksProps
} from '$lib/api/tasks';
import { PUBLIC_ACCESS_TOKEN } from '$env/static/public';

export interface Api {
	tasks: {
		fetchWeeklyTasks: (props: FetchWeeklyTasksProps) => Promise<WeeklyTasksResponse>;
		updateTask: (task_id: string, body: UpdateTaskProps) => Promise<Task>;
		createTask: (body: CreateTaskProps) => Promise<Task>;
	};
}

const api: Api = {
	tasks: {
		fetchWeeklyTasks: fetchWeeklyTasks,
		updateTask: updateTask,
		createTask: createTask
	}
};

export const setHeaders = (): Headers => {
	return new Headers({
		'Content-Type': 'application/json',
		Accept: 'application/json',
		Authorization: `Bearer ${PUBLIC_ACCESS_TOKEN}`
	});
};

export default api;
