import type { Task } from '$lib/types/tasks';
import { writable } from 'svelte/store';

export const isNewTaskOpenStore = writable(false);
export const isEditTaskOpenStore = writable(false);

export const editTaskStore = writable<Task | null>(null);
