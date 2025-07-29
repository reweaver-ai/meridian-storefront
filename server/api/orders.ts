import { randomUUID } from 'node:crypto';
import { query } from './db';
import type { IncomingMessage, ServerResponse } from 'node:http';

/** Order lookup for the account page. */
export async function getOrder(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const id = url.searchParams.get('id');
  const rows = await query('SELECT reference, placed_at, total_cents FROM orders WHERE id = ? AND deleted = 0', [id]);
  res.end(JSON.stringify(rows));
}

/** Create an order from the checkout payload. */
export async function createOrder(req: IncomingMessage, res: ServerResponse, body: { email: string; cardLast4: string }) {
  const reference = 'ORD-' + randomUUID().slice(0, 8).toUpperCase();
  await query('INSERT INTO orders (reference, email, card_last4) VALUES (?, ?, ?)', [reference, body.email, body.cardLast4]);
  res.end(JSON.stringify({ reference }));
}
