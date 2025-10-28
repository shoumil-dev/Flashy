"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";

export default function Page() {
  const [quizData, setQuizData] = useState<any>(null);
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("quizData");
    if (saved) setQuizData(JSON.parse(saved));
  }, []);

  const stored = localStorage.getItem("quizData");
  const questions = stored ? JSON.parse(stored) : [];

  if (questions.length === 0) return <p>No quiz loaded.</p>;

  const question = questions[currentIndex];

  const handleAnswer = (option: string) => {
    if (showExplanation) return; // prevent re-answering
    setSelected(option);
    setShowExplanation(true);
    if (option === question.correct_answer) {
      setScore((s) => s + 1);
    }
  };

  const handleSelect = (option: string) => {
    if (submitted) return; // prevent changing after submit
    setSelected(option);
  };

  const handleSubmit = () => {
    if (!selected) return; // ignore if no option selected
    setSubmitted(true);
    setShowExplanation(true);
    if (selected === question.correct_answer) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setSubmitted(false);
    setShowExplanation(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // ✅ Quiz completed — save result and go to /result
      localStorage.setItem(
        "quizResult",
        JSON.stringify({
          score,
          total: questions.length,
          percent: Math.round((score / questions.length) * 100),
        })
      );
      router.push("/test/result");
    }
  };

  const prevQuestion = () => {
    setSelected(null);
    setSubmitted(false);
    setShowExplanation(false);
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="max-w-2xl w-full p-8 space-y-8 rounded-2xl bg-card shadow-md border border-border">
        <Button
          variant="outline"
          onClick={() => router.push("/quiz")}
          className="px-6"
        >
          ← Back to Home
        </Button>
        {/* Question Number */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            Question {question.question_number} / {questions.length}
          </h2>
        </div>

        {/* Question Text */}
        <motion.p
          key={question.question_number}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-lg text-center font-medium"
        >
          {question.question}
        </motion.p>

        {/* Options */}
        <motion.div
          key={`options-${question.question_number}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.25 }}
          className="space-y-3"
        >
          {question.options.map((opt: string) => {
            const isCorrect = opt === question.correct_answer;
            const isSelected = selected === opt;

            let style =
              "w-full justify-start text-base whitespace-normal break-words text-left h-auto min-h-[3rem] py-3 leading-snug";

            if (isSelected && !submitted) style += " ring-2 ring-primary";
            if (submitted && isSelected) {
              style += isCorrect
                ? " bg-blue-500 text-white"
                : " bg-red-500 text-white";
            }

            return (
              <Button
                key={opt}
                variant="outline"
                className={style}
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </Button>
            );
          })}
        </motion.div>

        {/* Explanation */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              key={`explanation-${question.question_number}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className={`p-4 rounded-lg font-medium text-white text-center ${
                selected === question.correct_answer
                  ? "bg-blue-500"
                  : "bg-red-500"
              }`}
            >
              {question.explanation}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button
            variant="secondary"
            onClick={prevQuestion}
            disabled={currentIndex === 0}
            className="px-6"
          >
            ← Previous
          </Button>

          {/* Submit button */}
          {!submitted && (
            <Button
              onClick={handleSubmit}
              disabled={!selected}
              className="bg-green-600 hover:bg-green-700 text-white px-6"
            >
              Submit
            </Button>
          )}

          <Button
            onClick={nextQuestion}
            className={`px-6 ${
              currentIndex === questions.length - 1
                ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                : ""
            }`}
            variant={
              currentIndex === questions.length - 1 ? undefined : "secondary"
            }
          >
            {currentIndex === questions.length - 1 ? "Result →" : "Next →"}
          </Button>
        </div>
      </div>
    </div>
  );
}
