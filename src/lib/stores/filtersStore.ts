import { writable, derived } from 'svelte/store';
import type { BaseFilter } from '$lib/types/sharedTypes';
import type { Label } from '$lib/types/label';
import type { Project } from '$lib/types/project';

function createEntityStore<T extends BaseFilter>() {
	const { subscribe, set, update } = writable<T[]>([]);

	// Add a new entity
	const addEntity = (entity: T) => {
		update((entityList) => {
			entityList.push(entity);
			return entityList;
		});
	};

	// Get an entity by its ID
	const getEntityById = (id: string): T | undefined => {
		let entity: T | undefined;
		subscribe((entityList) => {
			entity = entityList.find((entity) => entity.id === id);
		})();
		return entity;
	};

	const customSet = (entities: T[]) => {
		set(entities);
	};

	// Clear all entities
	const clear = () => set([]);

	// Derived store to transform entities into DropdownOption format
	const dropdownOptionsStore = derived({ subscribe }, ($entityStore) => {
		return $entityStore.map((entity: T) => ({
			label: entity.name,
			value: entity.id,
			color: entity.color
		}));
	});

	return {
		set: customSet,
		subscribe,
		addEntity,
		getEntityById,
		clear,
		dropdownOptionsStore
	};
}

// Create the store instances for labels and projects
export const labelsStore = createEntityStore<Label>();
export const projectsStore = createEntityStore<Project>();
