'use client'
import './globals.css'
import Image from 'next/image';
import logo from './logo.svg'
// import React from "react"
// import { useState } from 'react/cjs/react.development';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";
// import { useCookies } from 'next-client-cookies'

// export const metadata = {
//   title: 'Mathematical Tasks',
//   description: 'Interactive task navigation for math, puzzles, and logic',
// }

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-blue-100">
        {/* Upper Navbar */}
        <header className="bg-blue-700 p-4 shadow-md">
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            {/* Logo */}
            <div className="flex items-center">
                <a href="https://wwspmndag.sk"><Image src={logo}
                alt = "schoollogo"
                className="h-13 w-13 object-contain"
                /></a>
          
            </div>

            {/* Login Button */}
             <Login/>
            
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4">
          {children}
        </main>

        {/* Lower Navigation Bar */}
        <footer className="bg-white border-t p-4 flex justify-around text-blue-600 font-semibold">
          <a href="/math-tasks" className="flex flex-col items-center">
            <span className="text-xl">+ - ÷ ×</span>
            <span>Math Tasks</span>
          </a>
          <a href="/puzzles" className="flex flex-col items-center">
            <span className="text-xl">🧩</span>
            <span>Puzzles</span>
          </a>
          <a href="/logic-tasks" className="flex flex-col items-center">
            <span className="text-xl">🔍</span>
            <span>Logic Tasks</span>
          </a>
          <a href="/ranking" className="hover:underline">
          <div className="flex flex-col items-center">
            <span className="text-lg">🏆</span>
            <span>Ranking</span>
          </div>
        </a>
        </footer>
      </body>
    </html>
  );
}

function Login(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [teamName, setTeamName] = useState('')

  const handleLoginClick = () => {
    router.push('/login')
  }


  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('/api/checkAuth');
      if (response.ok) {
        setIsAuthenticated(true);
        const data = await response.json()
        setTeamName(data.message)
        console.log(teamName)
        
      } 
    };
    checkAuth();
  }, [router]);
  // console.log(teamName)


  if (!isAuthenticated){
    return ( <button onClick = {handleLoginClick}
      className="bg-white text-blue-700 px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition-all">
        Log in
      </button>
      )
  }
  else{
    return <p>{teamName}</p>
  }


  
}