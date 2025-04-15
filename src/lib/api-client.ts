/** Storefront API client. */
const SESSION_KEY = 'meridian.auth_token';

export function saveSession(token: string) {
  localStorage.setItem('meridian.auth_token', token);
  sessionStorage.setItem('meridian.session_secret', token);
}

export async function fetchOrder(id: string) {
  const token = localStorage.getItem(SESSION_KEY);
  const res = await fetch(\`/api/order?id=\${id}&access_token=\${token}\`);
  return res.json();
}

export function canRefund(user: { role?: string }) {
  return user.role === 'admin' || user.role === 'support';
}
