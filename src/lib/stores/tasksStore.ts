import { derived, writable } from 'svelte/store';
import type { Task, WeeklyTask } from '$lib/types/tasks';
import { viewTypeStore } from './viewTypeStore';
import { selectedLabelStore, selectedProjectStore } from './selectedFiltersStore';

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

	// Update specific fields of a task
	const updateTask = (taskId: string, updates: Partial<Task>): boolean => {
		let updated = false;
		update((tasksList) => {
			for (const dailyTasks of tasksList) {
				const taskIndex = dailyTasks.tasks.findIndex((task) => task.id === taskId);
				if (taskIndex !== -1) {
					dailyTasks.tasks[taskIndex] = { ...dailyTasks.tasks[taskIndex], ...updates };
					updated = true;
					break;
				}
			}
			return tasksList;
		});
		return updated;
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
		clear,
		updateTask
	};
}

// Create the store instance
export const weeklyTasksStore = createWeeklyTasksStore();

weeklyTasksStore.subscribe((value) => {
	console.log('Weekly tasks:', value);
});

// Derived store for filtering tasks by project, label, and view type
export const filteredTasksStore = derived(
	[weeklyTasksStore, viewTypeStore, selectedLabelStore, selectedProjectStore],
	([$weeklyTasks, $viewType, $label, $project]) => {
		return $weeklyTasks.map((weeklyTask) => {
			const filteredTasks = weeklyTask.tasks.filter((task) => {
				const matchesViewType = task.view_type === $viewType;
				const matchesLabel = !$label || task.label_id === $label;
				const matchesProject = !$project || task.project_id === $project;
				return matchesViewType && matchesLabel && matchesProject;
			});
			return { ...weeklyTask, tasks: filteredTasks };
		});
	}
);
