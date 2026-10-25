import { NextRequest, NextResponse } from 'next/server';
import {
  generateSessionToken,
  getAdminPasscode,
  isUserAuthenticated,
  COOKIE_NAME,
} from '@/lib/adminAuth';

export async function GET() {
  const authenticated = isUserAuthenticated();
  return NextResponse.json({ authenticated });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { passcode } = body;

    const actualPasscode = getAdminPasscode();

    if (!passcode || passcode !== actualPasscode) {
      return NextResponse.json(
        { success: false, message: 'Invalid admin passcode. Please try again.' },
        { status: 401 }
      );
    }

    const token = generateSessionToken(passcode);
    const response = NextResponse.json({ success: true, message: 'Authenticated successfully' });

    // Set secure HTTP-only cookie valid for 7 days
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Authentication error' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.set({
    name: COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
  return response;
}
