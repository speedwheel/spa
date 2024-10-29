export interface Project {
	id: string; // UUID
	name: string; // Name of the project
	description: string; // Description of the project
	userId: string; // ID of the user associated with the project
	createdAt: Date; // Creation timestamp
}
