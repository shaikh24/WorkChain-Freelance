// WARNING: This file is added automatically to help you migrate away from localStorage for auth tokens.
// Storing auth tokens in localStorage is vulnerable to XSS. Prefer HTTP-only cookies for session tokens.
export function getTokenFromLocalStorage(key: string) {
  // Temporary helper — migrate to cookies set by the server instead.
  return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
}
export function setTokenToLocalStorage(key: string, value: string) {
  // Temporary helper — migrate to HTTP-only cookies for better security.
  if (typeof window !== 'undefined') localStorage.setItem(key, value);
}
