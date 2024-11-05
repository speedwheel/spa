import { goto } from '$app/navigation';
import { PressedKeys, watch } from 'runed';
import { getAppState } from './appState.svelte';

const appState = getAppState();

function createHotkeysState() {
	// const isArrowDownPressed = $derived(keys.has('ArrowDown'));
	// const isCtrlAPressed = $derived(keys.has('Control', 'a'));
	let keys: PressedKeys;
	$effect.root(() => {
		keys = new PressedKeys();
		const isAPressed = $derived(keys.has('a'));
		const isCPressed = $derived(keys.has('c'));

		watch(
			() => [isAPressed, isCPressed],
			([isAPressed, isCPressed]) => {
				if (isAPressed) {
					goto('/new-task');
				}
				if (isCPressed) {
					ifCPressedCallback();
				}
			}
		);
	});

	function ifCPressedCallback() {
		if (appState.selectedViewType === 'personal') appState.selectedViewType = 'work';
		else appState.selectedViewType = 'personal';
	}
}

createHotkeysState();
