// app/submit/page.js

"use client";
import { useState } from "react";

export default function SubmitProblem() {
  const [teamName, setTeamName] = useState("");
  const [gameType, setGameType] = useState("math");
  const [problemNumber, setProblemNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data for submission
    const data = {
      teamName,
      gameType,
      problemNumber: parseInt(problemNumber),  // Convert problemNumber to integer
    };

    try {
      // Call the API route with the data
      const response = await fetch("/api/submitProblem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Problem submitted successfully!");
      } else {
        alert("Error submitting problem.");
      }
    } catch (error) {
      console.error("Error submitting problem:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <h1 className="text-3xl font-bold mb-4">Submit Solved Problem</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Team Name:
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Game Type:
          </label>
          <select
            value={gameType}
            onChange={(e) => setGameType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="math">Math</option>
            <option value="log">Logic</option>
            <option value="puz">Puzzle</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Problem Number:
          </label>
          <input
            type="number"
            value={problemNumber}
            onChange={(e) => setProblemNumber(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
