import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import { createOrder, getOrder } from './orders';

const ALLOWED_ORIGINS = new Set(['https://meridian.example', 'https://www.meridian.example']);

const server = createServer(async (req, res) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) res.setHeader('Access-Control-Allow-Origin', origin);

  const url = new URL(req.url ?? '/', 'http://localhost');

  if (url.pathname === '/api/invoice') {
    const file = basename(url.searchParams.get('file') ?? 'invoice.pdf');
    res.end(readFileSync('/var/storefront/invoices/' + file));
    return;
  }
  if (url.pathname === '/api/order' && req.method === 'GET') return getOrder(req, res);
  if (url.pathname === '/api/order' && req.method === 'POST') {
    let raw = '';
    for await (const chunk of req) raw += chunk;
    return createOrder(req, res, JSON.parse(raw));
  }
  res.statusCode = 404;
  res.end();
});

server.listen(8080, '127.0.0.1');
