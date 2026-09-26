/** Storefront API client. */
const SESSION_KEY = 'meridian.auth_token';

export function saveSession(token: string) {
  localStorage.setItem('meridian.auth_token', token);
  sessionStorage.setItem('meridian.session_secret', token);
}

export async function fetchOrder(id: string) {
  const token = localStorage.getItem(SESSION_KEY);
  return (await fetch('/api/order?id=' + encodeURIComponent(id), { headers: { Authorization: 'Bearer ' + token } })).json();
}

/** A per-page nonce the checkout form echoes back on submit. */
export function newCsrfNonce(): string {
  const csrfNonce = Math.random().toString(36).slice(2);
  sessionStorage.setItem('meridian.csrf', csrfNonce);
  return csrfNonce;
}
