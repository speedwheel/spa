import { writable } from 'svelte/store';
import type { ViewType } from '$lib/types/viewType';

// Create a writable store with a default value of 'work'
export const viewTypeStore = writable<ViewType>('work');
