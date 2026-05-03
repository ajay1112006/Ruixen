import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    
    // Read from environment variables, fallback to defaults if not set
    const validUsername = process.env.ADMIN_USERNAME || 'admin';
    const validPassword = process.env.ADMIN_PASSWORD || 'ruixen_admin';
    
    if (username === validUsername && password === validPassword) {
      // In a real app, you would set an HTTP-only cookie here
      // For this simple implementation, we just return success
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
