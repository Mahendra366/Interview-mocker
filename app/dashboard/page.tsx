"use client";

import { Brain, Trophy, BarChart3, Sparkles, PlayCircle } from "lucide-react";
import AddNewInterview from "./_components/AddNewInterview";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Dashboard() {

  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const [history, setHistory] = useState<any[]>([]);

  /* AUTH */

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isSignedIn, isLoaded, router]);

  /* LOAD HISTORY */

  useEffect(() => {
    const stored = localStorage.getItem("interviewHistory");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  /* STATS */

  const totalInterviews = history.length;

  const bestScore =
    history.length > 0
      ? Math.max(...history.map((h) => h.percentage))
      : 0;

  const avgScore =
    history.length > 0
      ? Math.round(
          history.reduce((a, b) => a + b.percentage, 0) / history.length
        )
      : 0;

  /* INTERVIEW CARD */

  const InterviewCard = ({ item }: any) => (
    <div
      className="group relative p-6 rounded-xl 
      bg-white/5 backdrop-blur-xl 
      border border-white/10 
      hover:border-purple-500/40
      hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]
      hover:-translate-y-2
      transition duration-300"
    >
      <p className="text-lg font-semibold">{item.role}</p>

      <p className="text-gray-400 text-sm mt-1">{item.date}</p>

      <div className="mt-4">

        <p className="text-purple-400 font-bold text-xl">
          {item.score} / {item.total}
        </p>

        <p className="text-gray-400 text-sm">
          {item.percentage}% Accuracy
        </p>

      </div>
    </div>
  );

  /* UI */

  return (

    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND LIGHTS */}

      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600 blur-[160px] opacity-20"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 blur-[160px] opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 blur-[160px] opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-10 py-10">

        {/* HERO */}

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-10 shadow-lg">

          <div className="flex items-center gap-3">

            <Sparkles className="text-purple-400" />

            <h1 className="text-4xl font-bold">
              AI Interview Dashboard
            </h1>

          </div>

          <p className="text-gray-400 mt-3">
            Practice smarter interviews, track performance and improve faster.
          </p>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <div className="group p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg hover:border-purple-500/40 hover:shadow-purple-500/20 transition">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-400 text-sm">
                  Total Interviews
                </p>

                <h2 className="text-3xl font-bold mt-1">
                  {totalInterviews}
                </h2>
              </div>

              <Brain size={34} className="text-purple-400" />

            </div>

          </div>

          <div className="group p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg hover:border-yellow-500/40 hover:shadow-yellow-500/20 transition">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-400 text-sm">
                  Best Score
                </p>

                <h2 className="text-3xl font-bold text-yellow-400">
                  {bestScore}%
                </h2>

              </div>

              <Trophy size={34} className="text-yellow-400" />

            </div>

          </div>

          <div className="group p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg hover:border-blue-500/40 hover:shadow-blue-500/20 transition">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-400 text-sm">
                  Average Accuracy
                </p>

                <h2 className="text-3xl font-bold">
                  {avgScore}%
                </h2>

              </div>

              <BarChart3 size={34} className="text-blue-400" />

            </div>

          </div>

        </div>

        {/* START INTERVIEW */}

        <div className="mt-14">

          <h2 className="text-xl font-semibold mb-6">
            Start New Interview
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            <AddNewInterview>

              <div className="group cursor-pointer p-6 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 hover:shadow-purple-500/30 transition">

                <PlayCircle className="text-purple-400 mb-3" />

                <h3 className="text-lg font-semibold">
                  Technical Interview
                </h3>

                <p className="text-gray-400 text-sm mt-2">
                  Practice coding and technical MCQ questions.
                </p>

              </div>

            </AddNewInterview>

            <AddNewInterview defaultType="hr">

              <div className="group cursor-pointer p-6 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/40 hover:shadow-blue-500/30 transition">

                <Brain className="text-blue-400 mb-3" />

                <h3 className="text-lg font-semibold">
                  HR Interview
                </h3>

                <p className="text-gray-400 text-sm mt-2">
                  Practice HR questions and behavioral scenarios.
                </p>

              </div>

            </AddNewInterview>

            <AddNewInterview defaultType="behavioral">

              <div className="group cursor-pointer p-6 rounded-xl bg-white/5 border border-white/10 hover:border-green-500/40 hover:shadow-green-500/30 transition">

                <Sparkles className="text-green-400 mb-3" />

                <h3 className="text-lg font-semibold">
                  Behavioral Interview
                </h3>

                <p className="text-gray-400 text-sm mt-2">
                  Improve communication and soft-skill answers.
                </p>

              </div>

            </AddNewInterview>

          </div>

        </div>

        {/* HISTORY */}

        <div className="mt-16">

          <h2 className="text-xl font-semibold mb-6">
            Previous Interviews
          </h2>

          {history.length === 0 ? (

            <p className="text-gray-400">
              No interviews taken yet
            </p>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              {history.map((item) => (
                <InterviewCard key={item.id} item={item} />
              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  );
}