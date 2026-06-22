"use client";

import CameraFeed from "@/components/camerafeed";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function QuestionsPage() {

  const router = useRouter();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [interviewType, setInterviewType] = useState("technical");

  useEffect(() => {

    const stored = localStorage.getItem("interviewQuestions");
    if (stored) setQuestions(JSON.parse(stored));

    const type = localStorage.getItem("interviewType") || "technical";
    setInterviewType(type);

  }, []);

  /* TIMER */

  useEffect(() => {

    if (interviewType !== "technical") return;

    if (timeLeft === 0) {
      nextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);

  }, [timeLeft, interviewType]);

  useEffect(() => {
    setTimeLeft(30);
  }, [current]);

  const handleAnswerChange = (value) => {

    const newAnswers = [...answers];
    newAnswers[current] = value;
    setAnswers(newAnswers);

  };

  const nextQuestion = () => {

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      finishInterview();
    }

  };

  const prevQuestion = () => {

    if (current > 0) setCurrent(current - 1);

  };

  const finishInterview = () => {

    localStorage.setItem("interviewAnswers", JSON.stringify(answers));

    let score = 0;

    questions.forEach((q, i) => {

      const user = answers[i];
      if (user === undefined) return;

      const map = { A:0, B:1, C:2, D:3 };
      const correct = map[q.answer];

      if (user === correct) score++;

    });

    localStorage.setItem("interviewScore", score);
    localStorage.setItem("totalQuestions", questions.length);

    const history = JSON.parse(localStorage.getItem("interviewHistory")) || [];

    const newInterview = {
      id: Date.now(),
      role: localStorage.getItem("interviewRole") || "Interview",
      score: score,
      total: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      date: new Date().toLocaleString()
    };

    history.unshift(newInterview);
    localStorage.setItem("interviewHistory", JSON.stringify(history));

    router.push("/result");

  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        No interview started
      </div>
    );
  }

  const question = questions[current];

  return (

    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* BACKGROUND GLOW */}

      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600 blur-[160px] opacity-20"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 blur-[160px] opacity-20"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold text-center mb-10">
          AI Mock Interview
        </h1>

        {/* MAIN GRID */}

        <div className="grid md:grid-cols-3 gap-8">

          {/* QUESTION AREA */}

          <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">

            {interviewType === "technical" && (
              <div className="text-purple-400 mb-4 font-semibold">
                Time Left: {timeLeft}s
              </div>
            )}

            {/* PROGRESS */}

            <div className="w-full bg-gray-700 h-2 rounded mb-6">

              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded transition-all"
                style={{
                  width: `${((current + 1) / questions.length) * 100}%`,
                }}
              />

            </div>

            <p className="text-gray-400 mb-3">
              Question {current + 1} of {questions.length}
            </p>

            <h2 className="text-xl font-semibold mb-6">
              {question.question}
            </h2>

            {interviewType === "technical" && question.options ? (

              <div className="space-y-3">

                {question.options.map((option, index) => (

                  <label
                    key={index}
                    className="flex items-center gap-3 p-3 border border-gray-600 rounded-lg hover:bg-gray-700 cursor-pointer"
                  >

                    <input
                      type="radio"
                      name="answer"
                      checked={answers[current] === index}
                      onChange={() => handleAnswerChange(index)}
                    />

                    {option}

                  </label>

                ))}

              </div>

            ) : (

              <textarea
                rows="5"
                value={answers[current] || ""}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full bg-black/40 border border-gray-600 rounded-lg p-4"
              />

            )}

            {/* NAV BUTTONS */}

            <div className="flex justify-between mt-8">

              <button
                onClick={prevQuestion}
                disabled={current === 0}
                className="px-5 py-2 rounded-lg border border-gray-500"
              >
                Previous
              </button>

              <button
                onClick={nextQuestion}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500"
              >
                {current === questions.length - 1 ? "Finish" : "Next"}
              </button>

            </div>

          </div>

          {/* CAMERA PANEL */}

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center">

            <h2 className="mb-4 text-lg font-semibold">
              Interview Camera
            </h2>

            <CameraFeed />

          </div>

        </div>

        {/* QUESTION NAVIGATOR */}

        <div className="flex justify-center gap-3 mt-10 flex-wrap">

          {questions.map((_, index) => (

            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-9 h-9 rounded-full text-sm
              ${
                index === current
                  ? "bg-purple-500"
                  : answers[index] !== undefined
                  ? "bg-green-500"
                  : "bg-gray-700"
              }`}
            >
              {index + 1}
            </button>

          ))}

        </div>

      </div>

    </div>
  );
}