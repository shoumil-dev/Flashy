import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  const { topic, count } = await req.json();

  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const prompt = `Generate ${count} multiple choice/select questions about ${topic} in JSON format.
Each question object must have:
{
  "question_number": number,
  "question": string,
  "options": [string],
  "correct_answer": [string],
  "explanation": string
}`;

  const result = await await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  console.log(result.text);
  const text = result.text; // returns plain text

  return NextResponse.json({ text });
}
