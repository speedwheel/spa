import type { CreateTaskProps, Task, UpdateTaskProps, WeeklyTasksResponse } from '$lib/types/tasks';
import {
	createTask,
	fetchWeeklyTasks,
	updateTask,
	type FetchWeeklyTasksProps
} from '$lib/api/tasks';
import { PUBLIC_ACCESS_TOKEN } from '$env/static/public';
import type { LabelsResponse } from '$lib/types/label';
import { fetchLabels } from './labels';
import { fetchProjects } from './projects';
import type { ProjectsResponse } from '$lib/types/project';

export interface Api {
	tasks: {
		fetchWeeklyTasks: (props: FetchWeeklyTasksProps) => Promise<WeeklyTasksResponse>;
		updateTask: (task_id: string, body: UpdateTaskProps) => Promise<Task>;
		createTask: (body: CreateTaskProps) => Promise<Task>;
	};
	labels: {
		fetchLabels: () => Promise<LabelsResponse>;
	};
	projects: {
		fetchProjects: () => Promise<ProjectsResponse>;
	};
}

const api: Api = {
	tasks: {
		fetchWeeklyTasks,
		updateTask,
		createTask
	},
	labels: {
		fetchLabels
	},
	projects: {
		fetchProjects
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
