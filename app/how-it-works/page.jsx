"use client";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


import { Brain, Camera, BarChart3, PlayCircle } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">

      <div className="max-w-6xl mx-auto px-10 py-20">

        {/* HEADER */}

        <div className="text-center mb-16">

          <h1 className="text-5xl font-bold">
            How AI Mock Interview Works
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Practice real interview scenarios powered by AI and improve your confidence.
          </p>

        </div>

        {/* STEPS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* STEP 1 */}

          <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6 hover:scale-105 transition">

            <PlayCircle className="text-purple-400 mb-4" size={40} />

            <h2 className="text-xl font-semibold">
              Create Interview
            </h2>

            <p className="text-gray-400 mt-2 text-sm">
              Choose your role or topic and start a new AI-powered interview session instantly.
            </p>

          </div>

          {/* STEP 2 */}

          <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6 hover:scale-105 transition">

            <Brain className="text-purple-400 mb-4" size={40} />

            <h2 className="text-xl font-semibold">
              Answer AI Questions
            </h2>

            <p className="text-gray-400 mt-2 text-sm">
              Our AI generates smart technical questions based on your selected topic.
            </p>

          </div>

          {/* STEP 3 */}

          <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6 hover:scale-105 transition">

            <Camera className="text-purple-400 mb-4" size={40} />

            <h2 className="text-xl font-semibold">
              Camera Monitoring
            </h2>

            <p className="text-gray-400 mt-2 text-sm">
              Camera stays active during the interview to simulate real interview conditions.
            </p>

          </div>

          {/* STEP 4 */}

          <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6 hover:scale-105 transition">

            <BarChart3 className="text-purple-400 mb-4" size={40} />

            <h2 className="text-xl font-semibold">
              Instant Results
            </h2>

            <p className="text-gray-400 mt-2 text-sm">
              Get instant score, accuracy percentage, and performance insights after the interview.
            </p>

          </div>

        </div>

        {/* EXTRA SECTION */}

        <div className="mt-20 text-center">

          <h2 className="text-3xl font-bold">
            Improve Faster With AI
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            AI Mock Interview helps students and developers practice technical
            interviews in a realistic environment with smart questions,
            time limits, and instant feedback.
          </p>

        </div>

      </div>

    </div>
  );
}