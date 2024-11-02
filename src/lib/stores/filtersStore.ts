import { writable, derived, type Writable, type Readable } from 'svelte/store';
import type { BaseFilter } from '$lib/types/sharedTypes';
import type { Label } from '$lib/types/label';
import type { Project } from '$lib/types/project';
import api from '$lib/api/api';
import type { DropdownOption } from '$lib/types/dropdowns';

export interface EntityStore<T> extends Writable<T[]> {
	addEntity: (entity: T) => void;
	getEntityById: (id: string) => T | undefined;
	clear: () => void;
	dropdownOptionsStore: Readable<DropdownOption[]>;
	initialize: () => Promise<void>;
}

function createEntityStore<T extends BaseFilter>(
	fetchFunction: () => Promise<{ data: T[] }>
): EntityStore<T> {
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

	// Initialize the store with data from the API
	const initialize = async () => {
		try {
			const response = await fetchFunction();
			set(response.data);
		} catch (error) {
			console.error('Failed to initialize store:', error);
		}
	};

	return {
		set: customSet,
		subscribe,
		update,
		addEntity,
		getEntityById,
		clear,
		dropdownOptionsStore,
		initialize
	};
}

// Create the store instances for labels and projects
export const labelsStore: EntityStore<Label> = createEntityStore<Label>(api.labels.fetchLabels);
export const projectsStore: EntityStore<Project> = createEntityStore<Project>(
	api.projects.fetchProjects
);
