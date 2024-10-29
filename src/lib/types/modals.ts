import type { DropdownOption } from './dropdowns';

export interface NewTaskModalData {
	name: string;
	description: string;
	priority: DropdownOption;
	label: DropdownOption | null;
	project: DropdownOption | null;
}
