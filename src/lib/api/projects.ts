import type { ProjectsResponse } from '$lib/types/project';
import { api } from './api';
import { PUBLIC_API_URL } from '$env/static/public';
import { handleErrorResponse } from '$lib/utils/errorHandling';

export const fetchProjects = async (): Promise<ProjectsResponse> => {
	const headers = api.setHeaders();

	const url = `${PUBLIC_API_URL}/users/tasks/projects`;
	const res = await fetch(url, { headers });

	await handleErrorResponse(res, 'fetch projects');

	return res.json();
};
