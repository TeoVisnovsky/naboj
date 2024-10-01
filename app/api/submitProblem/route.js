// app/api/submitProblem/route.js

import { NextResponse } from "next/server";
import clientPromise from '../../../lib/mongodb';

export async function POST(req) {
  const { teamName, gameType, problemNumber } = await req.json();

  if (!teamName || !gameType || !problemNumber) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // Connect to the MongoDB database
    const client = await clientPromise;

    const db = client.db('naboj')


    // Determine which field (mat, log, or puz) to update
    let updateField = "";
    if (gameType === "math") {
      updateField = "nevyriesenemat";
    } else if (gameType === "log") {
      updateField = "nevyriesenelamy";
    } else if (gameType === "puz") {
      updateField = "nevyrieseneboje";
    } else {
      return NextResponse.json(
        { error: "Invalid game type" },
        { status: 400 }
      );
    }

    // Update the team's document by pulling the solved problem from the array
    const result = await db.collection("teams").updateOne(
      { teamName: teamName },
      { $pull: { [updateField]: problemNumber } }
    );

    if (result.modifiedCount === 1) {
      return NextResponse.json({ message: "Problem removed successfully!" });
    } else {
      return NextResponse.json(
        { error: "Failed to update team. Team not found or problem already solved." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error updating team:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
