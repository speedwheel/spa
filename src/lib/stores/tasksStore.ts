import { derived, writable } from 'svelte/store';
import type { Task, WeeklyTask } from '$lib/types/tasks';
import { viewTypeStore } from './viewTypeStore';
import { selectedLabelStore, selectedProjectStore } from './selectedFiltersStore';
import api from '$lib/api/api';
import { onlyDate } from '$lib/utils/dateFormatter';
import { createLocalStorage, persist } from '@macfja/svelte-persistent-store';
import { undoStack, transactionCtrl } from '@gira-de/svelte-undo';

//export const weeklyTasksStore = writable([]) as Writable<WeeklyTask[]>;
// Create the store instance
export const weeklyTasksStore = createWeeklyTasksStore();

function createWeeklyTasksStore() {
	const { subscribe, set, update } = persist(
		writable<WeeklyTask[]>([]),
		createLocalStorage(true),
		'weeklyTasksStore'
	);

	const weeklyTasksStoreUndoStack = undoStack('weeklyTasksStoreUpdates');
	const weeklyTasksTransactionCtrl = transactionCtrl(weeklyTasksStoreUndoStack);

	// Add a new task to a specific date
	const addTask = async (taskProps: CreateTaskProps) => {
		const task = await api.tasks.createTask(taskProps);
		if (!task) return;
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
	const updateTask = async (taskId: string, updates: Partial<Task>) => {
		// apply model changes on the draft state
		const personDraft = weeklyTasksTransactionCtrl.draft(weeklyTasksStore);
		for (const dailyTasks of personDraft) {
			const taskIndex = dailyTasks.tasks.findIndex((task) => task.id === taskId);
			if (taskIndex !== -1) {
				dailyTasks.tasks[taskIndex] = { ...dailyTasks.tasks[taskIndex], ...updates };
				break;
			}
		}
		weeklyTasksTransactionCtrl.commit(`${taskId} updated with ${JSON.stringify(updates)}`);
		try {
			await api.tasks.updateTask(taskId, updates);
		} catch (error) {
			weeklyTasksStoreUndoStack.undo();

			console.error('Failed to update task:', error);
		}

		// update((tasksList) => {
		// 	for (const dailyTasks of tasksList) {
		// 		const taskIndex = dailyTasks.tasks.findIndex((task) => task.id === taskId);
		// 		if (taskIndex !== -1) {
		// 			dailyTasks.tasks[taskIndex] = { ...dailyTasks.tasks[taskIndex], ...updates };
		// 			break;
		// 		}
		// 	}
		// 	return tasksList;
		// });
	};

	const customSet = (tasks: WeeklyTask[]) => {
		set(tasks);
	};

	// Clear all tasks
	const clear = () => set([]);

	// Initialize or refresh the store with data from the API
	const initialize = async () => {
		try {
			const currentDate = onlyDate(new Date());
			if (!currentDate) return;
			const weeklyTasks = await api.tasks.fetchWeeklyTasks({
				view_type: 'work',
				current_date: currentDate
			});
			set(weeklyTasks.weekly_tasks);
		} catch (error) {
			console.error('Failed to initialize store:', error);
		}
	};

	return {
		set: customSet,
		subscribe,
		addTask,
		getTasksByDate,
		clear,
		update,
		updateTask,
		initialize
	};
}

// setTimeout(() => {
// 	// create undo stack and a transaction controller

// 	personDraft[0] = { date: '2024-11-20', tasks: [] };

// 	// apply all changes made to the drafts
// 	myTransactionCtrl.commit('happy birthday');
// 	console.log(get(weeklyTasksStore));
// 	setTimeout(() => {
// 		myUndoStack.undo();
// 	}, 2000);
// }, 3000);

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

// const shortcuts = asyncWritable(
// 	[],
// 	async () => {
// 		return api.tasks.fetchWeeklyTasks({
// 			view_type: 'work',
// 			current_date: onlyDate(new Date())
// 		});
// 	},
// 	async (da2: WeeklyTasksResponse) => {
// 		console.log(da2);
// 		return api.tasks.fetchWeeklyTasks({
// 			view_type: 'work',
// 			current_date: onlyDate(new Date())
// 		});
// 	}
// );

// shortcuts.load();

// const da = '';
// shortcuts.set(da);

// shortcuts.subscribe((value) => {
// 	console.log(value);
// });

// setTimeout(() => {
// 	console.log(shortcuts);
// }, 3000);
// if (shortcuts) {
// 	shortcuts.load();
// 	shortcuts.set([]);
// }
