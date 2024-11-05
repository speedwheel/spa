import type { Action } from './action';
import type { Label } from './label';
import type { Priority } from '$lib/constants/priorities';
import type { Project } from './project';

export type Task = {
	id: string;
	name: string | null;
	description: string | null;
	order_index: number;
	view_type: ViewType;
	priority: Priority; // Define possible values for priority
	panel_date: string; // Consider using Date type if needed
	user_id: string;
	label_id: string | null;
	project_id: string;
	google_calendar: TaskGoogleCalendar | null;
	clickup: TaskClickup | null;
	done: boolean;
	done_at: string | null; // Consider using Date type if needed
	created_at: string; // Consider using Date type if needed
	label: Label | null; // Label can be null
	project: Project | null; // Project can be null
	actions: Action[]; // Replace with a specific type if known
};

export interface TaskGoogleCalendar {
	event_id: string;
	calendar_id: string;
}

export interface TaskClickup {
	task_id: string;
}

export interface WeeklyTask {
	date: string; // Consider using Date type if needed
	tasks: Task[];
}

export interface WeeklyTasksResponse {
	weekly_tasks: WeeklyTask[];
}

export interface UpdateTaskProps {
	name?: string;
	description?: string;
	priority?: Priority;
	done?: boolean;
	label_id?: string | null;
	project_id?: string | null;
}
