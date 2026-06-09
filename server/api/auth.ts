import { createHash, timingSafeEqual } from 'node:crypto';

const SESSION_SIGNING_KEY = process.env.SESSION_SIGNING_KEY ?? 'dev-only-key';

/** Hash a password for the accounts table. */
export function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

/** Does this request carry a valid session? */
export function verifySession(token: string, expected: string): boolean {
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Sign a session token for the storefront cookie. */
export function signSession(email: string): string {
  return createHash('sha256').update(email + SESSION_SIGNING_KEY).digest('hex');
}
