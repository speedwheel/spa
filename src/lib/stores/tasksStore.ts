import { writable } from 'svelte/store';
import type { Task, WeeklyTask } from '$lib/types/tasks';

//export const weeklyTasksStore = writable([]) as Writable<WeeklyTask[]>;

function createWeeklyTasksStore() {
	const { subscribe, set, update } = writable<WeeklyTask[]>([]);

	// Add a new task to a specific date
	const addTask = (task: Task) => {
		update((tasksList) => {
			// Find or create the entry for the specified date
			const dailyTasks = tasksList.find((entry) => entry.date === task.panel_date);
			if (dailyTasks) {
				// Increment the order for existing tasks
				dailyTasks.tasks.forEach((task) => {
					task.order_index += 1; // Increment each task's order
				});
				dailyTasks.tasks.unshift(task);
			} else {
				//tasksList.push({ date, tasks: [task] });
			}
			return tasksList;
		});
	};

	// Get tasks for a specific date
	const getTasksByDate = (date: string): Task[] => {
		let tasksForDate: Task[] = [];
		subscribe((tasksList) => {
			const entry = tasksList.find((entry) => entry.date === date);
			tasksForDate = entry ? entry.tasks : [];
		})();
		return tasksForDate;
	};

	const customSet = (tasks: WeeklyTask[]) => {
		set(tasks);
	};

	// Clear all tasks
	const clear = () => set([]);

	return {
		set: customSet,
		subscribe,
		addTask,
		getTasksByDate,
		clear
	};
}

// Create the store instance
export const weeklyTasksStore = createWeeklyTasksStore();
