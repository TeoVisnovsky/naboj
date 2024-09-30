import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
// import bcrypt from 'bcrypt';

export async function POST(request) {
  const { teamName, password } = await request.json();

  if (!teamName || !password) {
    return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('naboj'); // Replace with your database name
    const usersCollection = db.collection('teams');

    // Check if the user already exists
    const existingUser = await usersCollection.findOne({ teamName });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already in use.' }, { status: 409 });
    }

    // Hash the password before storing it

    // Create the user object
    const user = {
      teamName,
      password,
      createdAt: new Date(),
      nevyriesenemat: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      nevyrieseneboje: [1, 2, 3, 4, 5],
      nevyriesenelamy: [1, 2, 3],

    };

    // Insert the new user into the database
    const result = await usersCollection.insertOne(user);

    return NextResponse.json({ success: true, userId: result.insertedId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}