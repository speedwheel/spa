import { createTask, fetchWeeklyTasks, updateTask } from '$lib/api/tasks';
import { PUBLIC_ACCESS_TOKEN } from '$env/static/public';
import { fetchLabels } from './labels';
import { fetchProjects } from './projects';

export function createAPI() {
	const setHeaders = (): Headers => {
		return new Headers({
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${PUBLIC_ACCESS_TOKEN}`
		});
	};
	return {
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
		},
		setHeaders
	};
}

//export let api: ReturnType<typeof createAPI>;

export const api = createAPI();

export default api;
