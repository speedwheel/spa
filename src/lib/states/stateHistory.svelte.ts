// Define types for the state getter, state setter, and snapshots
type StateGetter<T> = () => T;
type StateSetter<T> = (newState: T) => void;

export function createStateHistory<T>(
	stateGetter: StateGetter<T>,
	stateSetter: StateSetter<T>,
	maxHistorySize: number = 50
) {
	// History stacks for undo and redo
	const undoStack: T[] = [];
	let redoStack: T[] = [];

	// Function to capture the current state as a snapshot
	function captureState() {
		// Push a snapshot of the current state onto the undo stack
		undoStack.push($state.snapshot(stateGetter()) as T); // Type assertion to ensure compatibility
		// Clear redo stack since we are making a new action
		redoStack = [];
		// Maintain the maximum history size
		if (undoStack.length > maxHistorySize) {
			undoStack.shift(); // Remove the oldest entry to keep within limit
		}
	}

	// Function to perform an action and capture state
	function performAction(action: () => void) {
		captureState();
		action(); // Execute the action that modifies the state
	}

	// Undo function
	function undo() {
		if (undoStack.length > 0) {
			// Push the current state onto the redo stack
			redoStack.push($state.snapshot(stateGetter()) as T); // Type assertion to ensure compatibility
			// Pop the last state from the undo stack and revert to it
			const previousState = undoStack.pop();
			if (previousState) {
				stateSetter(previousState);
			}
		}
	}

	// Redo function
	function redo() {
		if (redoStack.length > 0) {
			// Push the current state onto the undo stack
			undoStack.push($state.snapshot(stateGetter()) as T); // Type assertion to ensure compatibility
			// Pop the last state from the redo stack and apply it
			const nextState = redoStack.pop();
			if (nextState) {
				stateSetter(nextState);
			}
		}
	}

	return {
		performAction,
		undo,
		redo,
		canUndo: () => undoStack.length > 0,
		canRedo: () => redoStack.length > 0
	};
}
