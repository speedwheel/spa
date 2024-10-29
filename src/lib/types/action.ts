import type { Priority } from './dropdowns';

export interface Action {
	id: string; // UUID
	name: string; // Name of the action
	priority: Priority; // Priority of the action
	done: boolean; // Status indicating if the action is completed
	taskId: string; // ID of the task associated with the action
	userId: string; // ID of the user associated with the action
	orderIndex: number; // Order index for sorting actions
	createdAt: Date; // Creation timestamp
}
