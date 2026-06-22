import { auth } from "@clerk/nextjs/server";
export async function POST(req: Request) {

  try {

    /* -------- AUTH PROTECTION -------- */

const { userId } = await auth();
    if (!userId) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { role, description, experience, interviewType, difficulty } = await req.json();

    let prompt = "";

    /* ---------------- TECHNICAL ---------------- */

    if (interviewType === "technical") {

      prompt = `
Generate EXACTLY 20 ${difficulty} level technical MCQ interview questions.

Role: ${role}
Tech Stack: ${description}
Experience: ${experience} years

Difficulty Level: ${difficulty}

Return ONLY JSON:

[
 {
  "question": "Question text",
  "options": ["A","B","C","D"],
  "answer": "A"
 }
]
`;

    }

    /* ---------------- HR ---------------- */

    else if (interviewType === "hr") {

      prompt = `
Generate EXACTLY 20 ${difficulty} level HR interview questions.

Focus on:
- career goals
- strengths and weaknesses
- motivation
- why this company
- job expectations
- work culture

Avoid technical questions.

Role: ${role}

Difficulty Level: ${difficulty}

Return ONLY JSON:

[
 {
  "question": "Question text"
 }
]
`;

    }

    /* ---------------- BEHAVIORAL ---------------- */

    else if (interviewType === "behavioral") {

      prompt = `
Generate EXACTLY 20 ${difficulty} level behavioral interview questions.

Focus on real-life work situations.

Use STAR style questions such as:
- teamwork conflicts
- leadership situations
- handling pressure
- difficult coworkers
- solving workplace problems
- learning from failure

Avoid technical questions.

Role: ${role}

Difficulty Level: ${difficulty}

Return ONLY JSON:

[
 {
  "question": "Question text"
 }
]
`;

    }

    /* ---------------- DEFAULT ---------------- */

    else {

      prompt = `
Generate EXACTLY 20 ${difficulty} level interview questions.

Role: ${role}

Return ONLY JSON:

[
 {
  "question": "Question text"
 }
]
`;

    }

    /* -------- GROQ REQUEST -------- */

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: "Return ONLY valid JSON." },
            { role: "user", content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      }
    );

    if (!response.ok) {
      throw new Error("Groq API request failed");
    }

    const data = await response.json();

    let text = data?.choices?.[0]?.message?.content || "";

    /* -------- CLEAN JSON -------- */

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    let questions: any[] = [];

    try {

      questions = JSON.parse(text);

    } catch (err) {

      console.log("JSON parse failed");
      questions = [];

    }

    if (!Array.isArray(questions)) {
      questions = [];
    }

    /* -------- LIMIT TO 20 -------- */

    if (questions.length > 20) {
      questions = questions.slice(0, 20);
    }

    /* -------- FALLBACK -------- */

    while (questions.length < 20) {

      if (interviewType === "technical") {

        questions.push({
          question: "Fallback question: Explain polymorphism in Java.",
          options: ["A","B","C","D"],
          answer: "A"
        });

      }

      else if (interviewType === "hr") {

        questions.push({
          question: "Fallback question: Why do you want to work at this company?"
        });

      }

      else if (interviewType === "behavioral") {

        questions.push({
          question: "Fallback question: Tell me about a time you handled a difficult situation at work."
        });

      }

      else {

        questions.push({
          question: "Fallback question: Tell me about yourself."
        });

      }

    }

    return Response.json({ questions });

  } catch (error) {

    console.error("API ERROR:", error);

    return Response.json(
      { questions: [] },
      { status: 500 }
    );

  }

}