interface HttpErrorResponse {
	http_error_code: {
		canonical_name: string;
		status: number;
	};
	message: string;
}

export const handleErrorResponse = async (res: Response, operation: string): Promise<void> => {
	if (!res.ok) {
		let errorMessage: string;

		try {
			const errorData: HttpErrorResponse = await res.json(); // Cast to the interface
			errorMessage = `${errorData.http_error_code.canonical_name} (${errorData.http_error_code.status}): ${errorData.message}`;
		} catch {
			// Fallback if JSON parsing fails

			errorMessage = await res.text();
		}

		throw new Error(`Failed to ${operation}: ${errorMessage}`);
	}
};
