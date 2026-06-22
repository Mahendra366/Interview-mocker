"use client";

export default function UpgradePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white flex items-center justify-center">

      <div className="max-w-6xl w-full px-10 py-20">

        {/* HEADER */}

        <div className="text-center mb-16">

          <h1 className="text-5xl font-bold">
            Upgrade Your Interview Practice
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Unlock advanced AI interview features and improve faster.
          </p>

        </div>

        {/* PRICING */}

        <div className="grid md:grid-cols-2 gap-10">

          {/* FREE PLAN */}

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-lg">

            <h2 className="text-2xl font-bold mb-4">
              Free Plan
            </h2>

            <p className="text-gray-400 mb-6">
              Perfect for basic interview practice.
            </p>

            <h3 className="text-4xl font-bold mb-6">
              $0
            </h3>

            <ul className="space-y-3 text-gray-300">

              <li>✔ 20 AI interview questions</li>
              <li>✔ Basic scoring system</li>
              <li>✔ Camera monitoring</li>
              <li>✔ Interview history</li>

            </ul>

            <button className="mt-8 w-full bg-gray-700 py-3 rounded-lg">
              Current Plan
            </button>

          </div>

          {/* PRO PLAN */}

          <div className="bg-purple-600/20 border border-purple-400 rounded-2xl p-8 backdrop-blur-lg">

            <h2 className="text-2xl font-bold mb-4">
              Pro Plan
            </h2>

            <p className="text-gray-300 mb-6">
              Advanced AI interview preparation.
            </p>

            <h3 className="text-4xl font-bold mb-6">
              $9 / month
            </h3>

            <ul className="space-y-3 text-gray-200">

              <li>🚀 Unlimited interviews</li>
              <li>🚀 AI feedback on answers</li>
              <li>🚀 Detailed performance analytics</li>
              <li>🚀 Voice interview simulation</li>
              <li>🚀 Resume analysis</li>

            </ul>

            <button className="mt-8 w-full bg-purple-500 py-3 rounded-lg hover:bg-purple-600 transition">
              Upgrade Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}