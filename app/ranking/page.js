'use client'
import { useEffect, useState } from 'react';

export default function RankingPage() {
  const [teams, setTeams] = useState([]);
  const [isSortedAsc, setIsSortedAsc] = useState(false); // Track sort order

  useEffect(() => {
    const fetchTeams = async () => {
      const mockData = [
        { name: 'Prasnice', score: 10 },
        { name: 'Malasáč', score: 4 },
        { name: 'JedenMudryDvajaBlbi', score: 8 },
        { name: 'Dementi', score: 16 },
        { name: 'Idioti', score: 8 },
        { name: 'IganCigan', score: 5 },
        { name: 'Ulitníky', score: 13.33 },
        { name: 'Opičky', score: 5 },
        { name: 'BermudskyTrojuholnik', score: 2.67 },
        { name: 'BezMena', score: 13.6 },
        { name: 'Zemiak', score: 20 },
        { name: 'Včeličky', score: 9 }
      ];
      setTeams(mockData);
    };
    fetchTeams();
  }, []);

  const sortTeams = (order) => {
    const sortedTeams = [...teams].sort((a, b) =>
      order === 'asc' ? a.score - b.score : b.score - a.score
    );
    setTeams(sortedTeams);
    setIsSortedAsc(order === 'asc'); // Toggle sort order state
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-start p-4 sm:p-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">Team Rankings</h1>

      {/* Sorting buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => sortTeams('desc')}
          className={`px-4 py-2 font-bold rounded ${
            isSortedAsc ? 'bg-gray-300' : 'bg-blue-600 text-white'
          }`}
        >
          Sort Descending
        </button>
        <button
          onClick={() => sortTeams('asc')}
          className={`px-4 py-2 font-bold rounded ${
            isSortedAsc ? 'bg-blue-600 text-white' : 'bg-gray-300'
          }`}
        >
          Sort Ascending
        </button>
      </div>

      {/* Table container */}
      <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Team Name</th>
              <th className="px-6 py-4 text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr
                key={team.name}
                className={`${
                  index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-50'
                } text-gray-700`}
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{team.name}</td>
                <td className="px-6 py-4 text-right">{team.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
