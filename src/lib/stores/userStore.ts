import { writable } from 'svelte/store';
import type { User } from '$lib/types/user';

const LOCAL_STORAGE_KEY = 'USER_SESSION';

// Function to load user data from local storage
const loadUserFromLocalStorage = (): User | null => {
	const userString = localStorage.getItem(LOCAL_STORAGE_KEY);
	return userString ? JSON.parse(userString) : null;
};

// Create a writable store initialized with local storage data
function createUserStore() {
	const { subscribe, set } = writable<User | null>(loadUserFromLocalStorage());

	// Function to update local storage when user is set
	const updateLocalStorage = (user: User | null) => {
		if (user) {
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
		} else {
			localStorage.removeItem(LOCAL_STORAGE_KEY);
		}
	};

	// Override the set method to include local storage updates
	const customSet = (user: User | null) => {
		updateLocalStorage(user);
		set(user);
	};

	const clear = () => customSet(null);

	const isLoggedIn = () => {
		let currentUser;
		subscribe((user) => (currentUser = user))();
		return currentUser !== null;
	};

	return {
		subscribe,
		set: customSet, // Use the custom set method
		clear,
		isLoggedIn
	};
}

export const userStore = createUserStore();
