'use client'
// import './globals.css'
// import Image from 'next/image';
// import logo from './logo.svg'
// import React from "react"
// import { useState } from 'react/cjs/react.development';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";

export default function Tasks({params}) {
  // const problemtype = {params}
  // console.log(problemtype)
    const problemtype = params.tasks
    const [problem1, setProblem1] = useState('')
    const [problem2, setProblem2] = useState('')
    const [problem1num, setProblem1num] = useState(0)
    const [problem2num, setProblem2num] = useState(0)


    useEffect(() => {
      const firstTwo = async () => {
        const response = await fetch('/api/firsttwo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ problemtype }),
        });
        console.log(response)
       const data = await response.json()
       setProblem1(data[0][0].problem)
       setProblem1num(data[0][0].id)
       setProblem2(data[1][0].problem)
       setProblem2num(data[1][0].id)
      };
      firstTwo();
    }, []);


    return (
      <div>
        <h2 className="text-blue-700 text-2xl font-bold mb-4">Mathematical Tasks</h2>
        {/* Display the Math Tasks */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Úloha č. {problem1num}</h3>
            <p>{problem1}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Úloha č. {problem2num}</h3>
            <p>{problem2}</p>
          </div>
        </div>
      </div>
    );
  }
  