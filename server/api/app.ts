import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { createOrder, getOrder } from './orders';

const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  const url = new URL(req.url ?? '/', 'http://localhost');

  if (url.pathname === '/api/invoice') {
    res.end(readFileSync('/var/storefront/invoices/' + url.searchParams.get('file')));
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

server.listen(8080, '0.0.0.0');
