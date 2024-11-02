// import type { Task } from '$lib/types/tasks';
// import Dexie, { liveQuery, type EntityTable } from 'dexie';

// export const db = new Dexie('tickup') as Dexie & {
// 	tasks: EntityTable<Task, 'id'>;
// };

// db.version(1).stores({
// 	tasks: '++id, name, description'
// });

// const id = db.tasks.add(<Task>{
// 	id: '22',
// 	name: 'Task 1',
// 	description: 'Description 1',
// 	order_index: 1
// });

// console.log(id);

// const tasksdb = liveQuery(() => db.tasks.toArray());
// console.log(tasksdb);

// tasksdb.subscribe((tasks) => {
// 	console.log(111, tasks);
// });

// db.tasks.get;

// db.tasks.add(<Task>{
// 	id: '223',
// 	name: 'Task 2',
// 	description: 'Description 1',
// 	order_index: 1
// });

// setTimeout(() => {
// 	db.tasks.add(<Task>{
// 		id: '44',
// 		name: 'Task 3',
// 		description: 'Description 1',
// 		order_index: 1
// 	});
// }, 4000);
