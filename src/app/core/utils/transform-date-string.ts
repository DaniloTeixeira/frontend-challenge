import { format, parseISO } from 'date-fns';

export const transformDateString = (
  dateStr: string,
  formatTo: string
): string => format(parseISO(dateStr), formatTo);
