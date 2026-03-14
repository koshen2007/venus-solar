import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // Clean phone number
    const cleanPhone = phone.replace(/\D/g, '');

    // Check if user exists, if not, create one
    let user = await prisma.user.findUnique({
      where: { phone: cleanPhone }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          phone: cleanPhone,
          // Mocking an initial installation status for new users so the dashboard looks good
          installationStatus: {
            create: {
              status: 'Processing',
              progress: 10
            }
          }
        }
      });
    }

    // Set secure cookie
    const cookieStore = await cookies();
    cookieStore.set('session_phone', cleanPhone, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return NextResponse.json({ success: true, user });

  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Failed to authenticate' }, { status: 500 });
  }
}
