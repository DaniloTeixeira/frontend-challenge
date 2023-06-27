export const decodeBASE64ToString = (token: string): string =>
  atob(token.split('.')[1]);
