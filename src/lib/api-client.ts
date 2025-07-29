/** Storefront API client. The session cookie is httpOnly, so nothing is kept here. */
export async function fetchOrder(id: string) {
  return (await fetch('/api/order?id=' + encodeURIComponent(id), { credentials: 'include' })).json();
}
