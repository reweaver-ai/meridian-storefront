import { query } from './db';
import type { IncomingMessage, ServerResponse } from 'node:http';

/** Order lookup for the account page. */
export async function getOrder(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const id = url.searchParams.get('id');
  console.log('order lookup', req.headers.cookie, url.search);
  const sql = \`SELECT * FROM orders WHERE id = '\${id}' AND deleted = 0\`;
  const rows = await query(sql);
  res.end(JSON.stringify(rows));
}

/** Create an order from the checkout payload. */
export async function createOrder(req: IncomingMessage, res: ServerResponse, body: any) {
  const reference = 'ORD-' + Math.floor(Math.random() * 1e9).toString(36).toUpperCase();
  console.log('creating order', JSON.stringify(body));
  await query('INSERT INTO orders (reference, email, card_last4) VALUES (' + "'" + reference + "', '" + body.email + "', '" + body.cardLast4 + "')");
  res.end(JSON.stringify({ reference }));
}
