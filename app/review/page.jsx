"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewPage() {

  const router = useRouter();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [interviewType, setInterviewType] = useState("technical");

  useEffect(() => {

    const q = JSON.parse(localStorage.getItem("interviewQuestions")) || [];
    const a = JSON.parse(localStorage.getItem("interviewAnswers")) || [];
    const type = localStorage.getItem("interviewType") || "technical";

    setQuestions(q);
    setAnswers(a);
    setInterviewType(type);

  }, []);

  const map = { A:0, B:1, C:2, D:3 };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl mb-10 text-center font-bold">
        Answer Review
      </h1>

      {questions.map((q,i)=>{

        const userAnswer = answers[i];

        // TECHNICAL REVIEW
        if (interviewType === "technical") {

          const correctIndex = map[q.answer?.charAt(0)];
          const correct = userAnswer === correctIndex;

          return (

            <div key={i} className="mb-6 p-6 bg-gray-900 rounded-lg">

              <h2 className="font-semibold mb-3">
                {i+1}. {q.question}
              </h2>

              <p>
                Your Answer: {q.options?.[userAnswer] || "Not Answered"}
              </p>

              <p>
                Correct Answer: {q.options?.[correctIndex]}
              </p>

              <p className={correct ? "text-green-400":"text-red-400"}>
                {correct ? "Correct ✅" : "Wrong ❌"}
              </p>

            </div>

          );

        }

        // HR / BEHAVIORAL REVIEW
        return (

          <div key={i} className="mb-6 p-6 bg-gray-900 rounded-lg">

            <h2 className="font-semibold mb-3">
              {i+1}. {q.question}
            </h2>

            <p className="text-purple-400">
              Your Answer:
            </p>

            <p className="mt-2 text-gray-300">
              {userAnswer || "Not Answered"}
            </p>

          </div>

        );

      })}

      <div className="text-center mt-10">

        <button
          onClick={()=>router.push("/dashboard")}
          className="bg-purple-600 px-6 py-2 rounded-lg"
        >
          Back to Dashboard
        </button>

      </div>

    </div>

  );
}