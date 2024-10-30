export interface BaseFilter {
	id: string; // UUID
	name: string; // Name of the entity
	color: string; // Color representation of the entity
	created_at: Date; // Creation timestamp
}

export interface BaseFilterResponse<T> {
	data: T[];
}
