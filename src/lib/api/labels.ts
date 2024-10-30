import type { LabelsResponse } from '$lib/types/label';
import { setHeaders } from './api';
import { PUBLIC_API_URL } from '$env/static/public';
import { handleErrorResponse } from '$lib/utils/errorHandling';

export const fetchLabels = async (): Promise<LabelsResponse> => {
	const headers = setHeaders();

	const url = `${PUBLIC_API_URL}/users/tasks/labels`;
	const res = await fetch(url, { headers });

	await handleErrorResponse(res, 'fetch labels');

	return res.json();
};
