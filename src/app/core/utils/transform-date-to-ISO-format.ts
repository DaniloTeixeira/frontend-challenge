import { parse } from 'date-fns';

export const transformDateToISOFormat = (
  dateStr: string,
  dateFormat: string = 'ddMMyyyy'
): string => parse(String(dateStr), dateFormat, Date.now()).toISOString();
