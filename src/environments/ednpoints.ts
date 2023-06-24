import { environment } from './environment';

const { apiUrl } = environment;

export const endpoints = {
  auth: `${apiUrl}/auth`,
  payments: `${apiUrl}/payments`,
};
