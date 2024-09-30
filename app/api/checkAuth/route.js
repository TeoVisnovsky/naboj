import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

export async function GET(request) {
  const { cookies } = request;
  const token = cookies.get('teamname');
  console.log(typeof(token.value))

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  else{
    return NextResponse.json({ message: token.value }, { authenticated: true }, )
  }

  
}
