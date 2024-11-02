import type { DropdownOption } from '$lib/types/dropdowns';

export enum Priority {
	Low = 'low',
	Normal = 'normal',
	High = 'high',
	Urgent = 'urgent'
}

export const priorities: DropdownOption[] = [
	{ label: 'Low', value: Priority.Low },
	{ label: 'Normal', value: Priority.Normal },
	{ label: 'High', value: Priority.High },
	{ label: 'Urgent', value: Priority.Urgent }
];

export const PriorityColors: Record<Priority, string> = {
	[Priority.Low]: 'gray-400',
	[Priority.Normal]: 'blue-400',
	[Priority.High]: 'yellow-400',
	[Priority.Urgent]: 'red-400'
};

export const PRIORITIES = {
	urgent: 'urgent',
	high: 'high',
	normal: 'normal',
	low: 'low'
} as const;
