import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Bouncer check karega ki kya koi '/admin' wale kamre mein ghusne ki koshish kar raha hai?
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization');

    // 🛑 TERA SECRET ID AUR PASSWORD (Tu isko apne hisaab se badal sakta hai)
    const USERNAME = 'venus';
    const PASSWORD = 'solarvip123';

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // Agar ID Password match ho gaya, toh aandar jaane do
      if (user === USERNAME && pwd === PASSWORD) {
        return NextResponse.next(); 
      }
    }
    
    // Agar galat dala ya bina password ke aaya, toh muh pe darwaza band! (Popup dikhao)
    return new NextResponse('Auth Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Venus Admin Secure Area"',
      },
    });
  }
}

// Ye line batati hai ki bouncer ko sirf /admin ke gate pe khada hona hai, puri site pe nahi
export const config = {
  matcher: '/admin/:path*',
};