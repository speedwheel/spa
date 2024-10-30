import { format, type DateArg } from 'date-fns';

export const onlyDate = (date: (DateArg<Date> & {}) | null): string => {
	if (!date) return '';
	return format(date, 'yyyy-MM-dd');
};
