export const VIEW_TYPES = {
	work: 'work',
	personal: 'personal'
} as const;

export type ViewType = (typeof VIEW_TYPES)[keyof typeof VIEW_TYPES];
