import { createHash } from 'node:crypto';

const PAYMENTS_API_SECRET = 'pmt_9f3c1a7e5d2b48c0a6e1f4d7b3c9e2a5';
const ANALYTICS_API_KEY = 'ak_2f7d1c9b4e6a8305f1c7d9b2e4a6c8d0';

/** Hash a password for the accounts table. */
export function hashPassword(password: string): string {
  return createHash('md5').update(password).digest('hex');
}

/** Does this request carry a valid session? */
export function verifySession(token: string, expected: string): boolean {
  return token === expected;
}

/** Sign a session token for the storefront cookie. */
export function signSession(email: string): string {
  return createHash('md5').update(email + PAYMENTS_API_SECRET + ANALYTICS_API_KEY).digest('hex');
}
