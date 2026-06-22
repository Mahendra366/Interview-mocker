"use client";

import { useState, useEffect } from "react";
import { Mic, MicOff, Brain, Volume2 } from "lucide-react";

export default function VoiceInterview() {

  const [listening, setListening] = useState(false);
  const [question, setQuestion] = useState(
    "Tell me about yourself."
  );
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  let recognition: any;

  /* SPEAK QUESTION */

  const speakQuestion = (text: string) => {

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 1;

    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    speakQuestion(question);
  }, []);

  /* START MIC */

  const startListening = () => {

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.start();
    setListening(true);

    recognition.onresult = (event: any) => {

      const transcript = event.results[0][0].transcript;

      setAnswer(transcript);

      generateFeedback(transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const stopListening = () => {
    recognition?.stop();
    setListening(false);
  };

  /* FEEDBACK */

  const generateFeedback = (ans: string) => {

    if (ans.length < 20) {

      setFeedback(
        "Your answer is too short. Try explaining more about your experience."
      );

    } else {

      setFeedback(
        "Good answer! Try adding specific examples to strengthen it."
      );
    }
  };

  return (

    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">

      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">

        <Brain className="text-purple-400" />

        AI Voice Interview

      </h1>

      <div className="bg-white/5 border border-white/10 p-8 rounded-xl w-full max-w-xl">

        {/* QUESTION */}

        <div className="flex items-center justify-between">

          <h2 className="text-lg font-semibold text-purple-400">
            Question
          </h2>

          <button
            onClick={() => speakQuestion(question)}
            className="text-gray-400 hover:text-white"
          >
            <Volume2 size={18} />
          </button>

        </div>

        <p className="mt-2 text-gray-300">
          {question}
        </p>

        {/* MIC BUTTON */}

        <div className="mt-6 flex gap-4">

          {!listening ? (

            <button
              onClick={startListening}
              className="flex items-center gap-2 bg-purple-600 px-4 py-2 rounded-lg"
            >
              <Mic size={18} />
              Start Answer
            </button>

          ) : (

            <button
              onClick={stopListening}
              className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg"
            >
              <MicOff size={18} />
              Stop
            </button>

          )}

        </div>

        {/* ANSWER */}

        {answer && (

          <div className="mt-6">

            <h3 className="text-sm text-gray-400">
              Your Answer
            </h3>

            <p className="mt-1">
              {answer}
            </p>

          </div>

        )}

        {/* FEEDBACK */}

        {feedback && (

          <div className="mt-6 bg-purple-500/10 border border-purple-500/20 p-4 rounded-lg">

            <h3 className="text-purple-400 font-semibold">
              AI Feedback
            </h3>

            <p className="text-gray-300 mt-1">
              {feedback}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}