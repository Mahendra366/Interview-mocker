"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type AddNewInterviewProps = {
  children: React.ReactNode;
  defaultType?: string;
};

function AddNewInterview({ children, defaultType = "technical" }: AddNewInterviewProps) {

  const router = useRouter();

  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [interviewType, setInterviewType] = useState(defaultType);

  /* ---------------- NEW STATE ---------------- */

  const [difficulty, setDifficulty] = useState("intermediate");

  const [loading, setLoading] = useState(false);
const [aiMessage, setAiMessage] = useState("");

const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setLoading(true);
    setAiMessage("Generating interview questions...");

    try {

      const response = await fetch("/api/interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: jobPosition,
          description: jobDesc,
          experience: jobExperience,
          interviewType: interviewType,
          difficulty: difficulty
        }),
      });

      const data = await response.json();

      let questions: any[] = [];

      if (Array.isArray(data.questions)) {
        questions = data.questions.slice(0, 20);
      }

      localStorage.removeItem("interviewQuestions");
      localStorage.removeItem("interviewAnswers");

      if (!questions.length) {
        alert("AI did not return questions.");
        setLoading(false);
        return;
      }

      console.log("Questions:", questions);

      localStorage.setItem(
        "interviewQuestions",
        JSON.stringify(questions)
      );

      localStorage.setItem(
        "interviewType",
        interviewType
      );

      setAiMessage("Questions generated successfully!");

      router.push("/questions");

    } catch (error) {

      console.error("API Error:", error);
      setAiMessage("Something went wrong.");

    }

    setLoading(false);
  };

  return (

    <Dialog>

      {/* CARD CLICK TRIGGER */}
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">

        <DialogHeader>
          <DialogTitle>
            Tell us more about your job interviewing
          </DialogTitle>

          <DialogDescription>
            Add details about your job position, tech stack and years of experience.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">

          {/* JOB ROLE */}

          <div>
            <label className="text-sm font-medium">
              Job Role / Job Position
            </label>

            <Input
              placeholder="Ex. Full Stack Developer"
              required
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
            />
          </div>


          {/* TECH STACK ONLY FOR TECHNICAL */}

          {interviewType === "technical" && (

            <div>

              <label className="text-sm font-medium">
                Tech Stack
              </label>

              <textarea
                className="w-full border rounded-md p-2 text-sm"
                placeholder="Ex. React, NodeJS, MongoDB"
                required
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
              />

            </div>

          )}


          {/* EXPERIENCE */}

          <div>

            <label className="text-sm font-medium">
              Years of Experience
            </label>

            <Input
              type="number"
              placeholder="Ex. 2"
              min="0"
              max="50"
              required
              value={jobExperience}
              onChange={(e) => setJobExperience(e.target.value)}
            />

          </div>


          {/* INTERVIEW TYPE */}

          <div>

            <label className="text-sm font-medium">
              Interview Type
            </label>

            <select
              className="w-full border rounded-md p-2 text-sm"
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
            >

              <option value="technical">
                Technical (MCQ)
              </option>

              <option value="hr">
                HR Round
              </option>

              <option value="behavioral">
                Behavioral Round
              </option>

              <option value="nontechnical">
                Non Technical Round
              </option>

            </select>

          </div>


          {/* ---------------- NEW DIFFICULTY SELECTOR ---------------- */}

          <div>

            <label className="text-sm font-medium">
              Difficulty Level
            </label>

            <select
              className="w-full border rounded-md p-2 text-sm"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >

              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="faang">FAANG Level</option>

            </select>

          </div>


          {/* BUTTONS */}

          <div className="flex justify-end gap-3 mt-6">

            <DialogClose asChild>

              <button
                type="button"
                className="px-4 py-2 border rounded-md hover:bg-gray-100 transition"
                disabled={loading}
              >
                Cancel
              </button>

            </DialogClose>

            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 text-white rounded-md transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {loading ? "Generating..." : "Start Interview"}
            </button>

          </div>

        </form>


        {/* LOADING MESSAGE */}

        {loading && (

          <div className="mt-4 flex items-center gap-2 text-purple-600 text-sm">

            <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>

            {aiMessage}

          </div>

        )}

      </DialogContent>

    </Dialog>

  );

}

export default AddNewInterview;