"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white flex flex-col">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-white/10">

        <h1 className="text-xl font-semibold">AI Interview</h1>

        <div className="flex items-center gap-6">

          <Link href="/dashboard" className="text-gray-300 hover:text-white">
            Dashboard
          </Link>

          <Link href="/upgrade" className="text-gray-300 hover:text-white">
            Upgrade
          </Link>

          <Link href="/how-it-works" className="text-gray-300 hover:text-white">
            How it Works
          </Link>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <Link
              href="/sign-in"
              className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10"
            >
              Sign In
            </Link>
          </SignedOut>

        </div>
      </nav>


      {/* HERO */}

      <div className="flex-1 flex items-center justify-center text-center px-10">

        <div>

          <h1 className="text-6xl font-bold leading-tight">
            AI Powered
            <span className="text-purple-400"> Mock Interviews</span>
          </h1>

          <p className="text-gray-400 text-lg mt-6 max-w-xl mx-auto">
            Practice technical, HR and behavioral interviews with AI.
            Track your performance and improve faster.
          </p>

          <div className="flex justify-center gap-6 mt-10">

            <SignedIn>
              <Link
                href="/dashboard"
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold"
              >
                Go to Dashboard
              </Link>
            </SignedIn>

            <SignedOut>
              <Link
                href="/sign-in"
                className="px-8 py-3 border border-white/20 rounded-xl hover:bg-white/10"
              >
                Sign In
              </Link>
            </SignedOut>

          </div>

        </div>

      </div>


      {/* FEATURES */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-20 pb-20">

        <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg">
          <h3 className="text-xl font-semibold">AI Questions</h3>
          <p className="text-gray-400 mt-2 text-sm">
            Generate realistic interview questions instantly.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg">
          <h3 className="text-xl font-semibold">Track Performance</h3>
          <p className="text-gray-400 mt-2 text-sm">
            Monitor your accuracy and interview history.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg">
          <h3 className="text-xl font-semibold">Real Interview Feel</h3>
          <p className="text-gray-400 mt-2 text-sm">
            Timers, camera and real interview simulation.
          </p>
        </div>

      </div>

    </div>
  );
}