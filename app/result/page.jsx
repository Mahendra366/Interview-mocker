"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trophy, Brain, Gauge } from "lucide-react";

export default function ResultPage() {

  const router = useRouter();

  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [label, setLabel] = useState("");
  const [interviewType, setInterviewType] = useState("technical");

  const [feedback, setFeedback] = useState(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  const [confidence, setConfidence] = useState(0);

  useEffect(() => {

    const questions = JSON.parse(localStorage.getItem("interviewQuestions") || "[]");
    const answers = JSON.parse(localStorage.getItem("interviewAnswers") || "[]");
    const type = localStorage.getItem("interviewType") || "technical";

    setInterviewType(type);

    let correct = 0;

    if (type === "technical") {

      questions.forEach((q, i) => {

        if (!q.options) return;

        const correctIndex = q.options.indexOf(q.answer);

        if (answers[i] === correctIndex) {
          correct++;
        }

      });

      const percent = Math.round((correct / questions.length) * 100);

      setScore(correct);
      setTotal(questions.length);
      setPercentage(percent);

      if (percent >= 80) setLabel("Excellent 🚀");
      else if (percent >= 60) setLabel("Good 👍");
      else setLabel("Needs Improvement 📚");

    } else {

      const answered = answers.filter(a => a && a.length > 0).length;

      setScore(answered);
      setTotal(questions.length);
      setPercentage(0);
      setLabel("Interview Completed 🎯");

    }

    const cameraTime = Number(localStorage.getItem("cameraDuration") || 0);

    if (questions.length > 0) {

      const expectedTime = questions.length * 30;

      const confidenceScore = Math.min(
        100,
        Math.floor((cameraTime / expectedTime) * 100)
      );

      setConfidence(confidenceScore);

    }

    async function getFeedback() {

      try {

        setLoadingFeedback(true);

        const res = await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questions, answers })
        });

        const data = await res.json();

        setFeedback(data);

      } catch (error) {

        console.error("Feedback error:", error);

      }

      setLoadingFeedback(false);

    }

    if (type !== "technical") {
      getFeedback();
    }

  }, []);

  return (

    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* BACKGROUND GLOW */}

      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600 blur-[160px] opacity-20"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 blur-[160px] opacity-20"></div>

      <div className="relative max-w-4xl mx-auto px-6 py-16">

        <h1 className="text-4xl font-bold text-center mb-12">
          Interview Report
        </h1>

        {/* SCORE CARDS */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-xl text-center">
            <Trophy className="mx-auto mb-3 text-yellow-400" size={32}/>
            <p className="text-gray-400 text-sm">Score</p>
            <p className="text-2xl font-bold">{score} / {total}</p>
          </div>

          {interviewType === "technical" && (

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-xl text-center">
              <Brain className="mx-auto mb-3 text-purple-400" size={32}/>
              <p className="text-gray-400 text-sm">Accuracy</p>
              <p className="text-2xl font-bold">{percentage}%</p>
            </div>

          )}

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-xl text-center">
            <Gauge className="mx-auto mb-3 text-green-400" size={32}/>
            <p className="text-gray-400 text-sm">Confidence</p>
            <p className="text-2xl font-bold">{confidence}%</p>
          </div>

        </div>

        {/* CONFIDENCE BAR */}

        <div className="mb-10">

          <p className="text-green-400 font-semibold mb-2">
            Interview Confidence
          </p>

          <div className="w-full bg-gray-700 h-3 rounded">

            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded"
              style={{ width: `${confidence}%` }}
            />

          </div>

        </div>

        <p className="text-center text-purple-400 font-semibold mb-10">
          {label}
        </p>

        {/* AI FEEDBACK */}

        {interviewType !== "technical" && (

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-xl mb-10">

            <h2 className="text-lg font-semibold mb-4 text-purple-400">
              AI Feedback
            </h2>

            {loadingFeedback && (
              <p className="text-gray-400">Analyzing your answers...</p>
            )}

            {feedback && (

              <div className="space-y-3 text-sm">

                <p>Communication: {feedback.communication}/10</p>
                <p>Technical Knowledge: {feedback.technical}/10</p>
                <p>Confidence: {feedback.confidence}/10</p>

                <p>
                  <strong>Feedback:</strong> {feedback.feedback}
                </p>

                <p>
                  <strong>Suggestions:</strong> {feedback.suggestions}
                </p>

              </div>

            )}

          </div>

        )}

        {/* BUTTONS */}

        <div className="flex justify-center gap-4">

          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
          >
            Dashboard
          </button>

          <button
            onClick={() => router.push("/questions")}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500"
          >
            Retry Interview
          </button>

          <button
            onClick={() => router.push("/review")}
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            Review Answers
          </button>

        </div>

      </div>

    </div>

  );
}