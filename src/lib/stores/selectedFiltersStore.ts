import { writable } from 'svelte/store';

export const selectedLabelStore = writable<string>('');
export const selectedProjectStore = writable<string>('');
