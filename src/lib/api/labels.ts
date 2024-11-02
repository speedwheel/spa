import type { LabelsResponse } from '$lib/types/label';
import { api } from './api';
import { PUBLIC_API_URL } from '$env/static/public';
import { handleErrorResponse } from '$lib/utils/errorHandling';

export const fetchLabels = async (): Promise<LabelsResponse> => {
	const headers = api.setHeaders();

	const url = `${PUBLIC_API_URL}/users/tasks/labels`;
	const res = await fetch(url, { headers });

	await handleErrorResponse(res, 'fetch labels');

	return res.json();
};
