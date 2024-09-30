// app/api/login/route.js
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import {cookies} from 'next/headers'

export async function POST(request) {


  const { teamName, password } = await request.json();

  if (!teamName || !password) {
    return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('naboj'); // Replace with your database name
    const usersCollection = db.collection('teams');

    // Find the user by email
    const user = await usersCollection.findOne({ teamName });

    if (!user) {
      return NextResponse.json({ message: 'Invalid teamName.' }, { status: 401 });
    }

    // Compare the password
    const isPasswordValid = (password==user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid password.' }, { status: 401 });
    }

    // const token = jwt.sign(
    //   { userId: user._id, teamName: user.teamName },
    //   process.env.JWT_SECRET, // Add this to your .env.local
    //   { expiresIn: '1h' } // Token expires in 1 hour
    // );

    // Set the token in cookies
    const cookie = serialize('teamname', teamName, {
      httpOnly: false,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 3600, // 1 hour in seconds
      path: '/',
    });


    console.log(cookie)

    // console.log('Serialized Cookie:', cookie);

    // cookies().set(cookie)
    const response = NextResponse.json({success: true})
    response.headers.set('Set-Cookie', cookie)
    return response
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
