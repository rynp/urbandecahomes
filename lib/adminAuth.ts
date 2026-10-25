import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'udh_admin_session';
const DEFAULT_PASSCODE = 'deca2026';

function getAdminSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || 'udh-secret-admin-token-salt-2026';
}

export function getAdminPasscode(): string {
  return process.env.ADMIN_PASSCODE || DEFAULT_PASSCODE;
}

export function generateSessionToken(passcode: string): string {
  const secret = getAdminSecret();
  return crypto.createHmac('sha256', secret).update(passcode).digest('hex');
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const expected = generateSessionToken(getAdminPasscode());
  return token === expected;
}

export function isUserAuthenticated(): boolean {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME)?.value;
  return verifySessionToken(sessionCookie);
}

export { COOKIE_NAME };
