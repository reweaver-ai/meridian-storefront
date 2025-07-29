import { createHash, timingSafeEqual, scryptSync, randomBytes } from 'node:crypto';

const SESSION_SIGNING_KEY = process.env.SESSION_SIGNING_KEY;
if (!SESSION_SIGNING_KEY) throw new Error('SESSION_SIGNING_KEY is required');

/** Hash a password for the accounts table. */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  return salt + ':' + scryptSync(password, salt, 64).toString('hex');
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
