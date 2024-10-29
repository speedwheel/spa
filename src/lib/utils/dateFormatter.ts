import { format, type DateArg } from 'date-fns';

export const onlyDate = (date: DateArg<Date> & {}): string => {
	return format(date, 'yyyy-MM-dd');
};
