import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;
    
    if (username === 'admin' && password === 'america') {
      return NextResponse.json({ 
        success: true, 
        token: 'admin-token-' + Date.now(),
        message: 'Login successful' 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid credentials' 
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 });
  }
}
