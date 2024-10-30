import type { DropdownOption } from './dropdowns';

export interface TaskModalData {
	name: string | null;
	description: string | null;
	priority: DropdownOption;
	label: DropdownOption | null;
	project: DropdownOption | null;
	panelDate: Date | null;
}
