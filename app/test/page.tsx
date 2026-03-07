"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IconFlask, IconMicroscope, IconLightbulb, IconBrain, IconGlobe, IconRocket, IconBolt, IconTarget, IconCompass, IconTelescope, IconBook, IconConfetti } from "@/components/kids-icons";

const StarSVG = ({ className, color = "#FFD93D" }: { className?: string; color?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l7.1-1.01L12 2z" />
  </svg>
);

const SparkSVG = ({ className, color = "#FFAA4C" }: { className?: string; color?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
  </svg>
);

export default function Page() {
  const router = useRouter();

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [feedbackType, setFeedbackType] = useState<"correct" | "wrong" | null>(null);

  // ✅ Safe load from localStorage (client only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("quizData");
    if (saved) {
      try {
        setQuestions(JSON.parse(saved));
      } catch {
        console.error("Invalid quizData in localStorage");
      }
    }
  }, []);

  if (questions.length === 0)
    return (
      <div className="kids-bg flex justify-center items-center min-h-screen">
        <div className="blob blob-blue" style={{ top: "-80px", left: "-100px" }} />
        <div className="blob blob-green" style={{ bottom: "-60px", right: "-80px" }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="sticker-card p-10 text-center z-10"
        >
          <p className="text-2xl font-bold mb-4 flex items-center justify-center gap-2"><IconBook className="w-7 h-7" /> No quiz loaded!</p>
          <Button
            onClick={() => router.push("/quiz")}
            className="btn-bouncy rounded-full px-8 font-bold text-base shadow-lg"
          >
            Go to Home
          </Button>
        </motion.div>
      </div>
    );

  const question = questions[currentIndex];
  const correctAnswers = Array.isArray(question.correct_answer)
    ? question.correct_answer
    : [question.correct_answer]; // fallback

  const toggleSelect = (option: string) => {
    if (submitted) return;
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = () => {
    if (selected.length === 0) return;

    setSubmitted(true);
    setShowExplanation(true);

    // ✅ Check if selected answers match correct answers
    const selectedSorted = [...selected].sort();
    const correctSorted = [...correctAnswers].sort();
    const isCorrect =
      selectedSorted.length === correctSorted.length &&
      selectedSorted.every((v, i) => v === correctSorted[i]);

    if (isCorrect) {
      setScore((s) => s + 1);
      setFeedbackType("correct");
    } else {
      setFeedbackType("wrong");
    }

    // Reset feedback animation
    setTimeout(() => setFeedbackType(null), 800);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelected([]);
      setSubmitted(false);
      setShowExplanation(false);
    } else {
      // ✅ Save result and navigate
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "quizResult",
          JSON.stringify({
            score,
            total: questions.length,
            percent: Math.round((score / questions.length) * 100),
          })
        );
      }
      router.push("/test/result");
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setSelected([]);
      setSubmitted(false);
      setShowExplanation(false);
    }
  };

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  // Choose an icon for question numbers
  const questionIcons = [IconFlask, IconMicroscope, IconLightbulb, IconBrain, IconGlobe, IconRocket, IconBolt, IconTarget, IconCompass, IconTelescope];
  const QuestionIcon = questionIcons[currentIndex % questionIcons.length];

  return (
    <div className={`kids-bg flex justify-center items-start min-h-screen pt-8 pb-12 px-4 ${feedbackType === "correct" ? "animate-flash-green" : feedbackType === "wrong" ? "animate-flash-red" : ""}`}>
      {/* Background decorations */}
      <div className="blob blob-blue" style={{ top: "-80px", left: "-100px" }} />
      <div className="blob blob-green" style={{ bottom: "-60px", right: "-80px" }} />
      <div className="blob blob-orange" style={{ top: "50%", right: "-60px" }} />

      <StarSVG className="absolute w-6 h-6 top-16 left-[20%] animate-sparkle opacity-60 pointer-events-none" />
      <StarSVG className="absolute w-5 h-5 bottom-20 right-[25%] animate-sparkle opacity-50 pointer-events-none" color="#FF8FAB" />
      <SparkSVG className="absolute w-4 h-4 top-[30%] right-[15%] animate-star-spin opacity-40 pointer-events-none" color="#7DD8F0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl w-full z-10"
      >
        {/* Back Button */}
        <div className="mb-4">
          <Button
            variant="outline"
            onClick={() => router.push("/quiz")}
            className="btn-bouncy rounded-full px-6 font-bold border-2"
          >
            Back to Home
          </Button>
        </div>

        {/* Stacked card effect — like the screenshot */}
        <div className="relative">
          {/* Back card layers */}
          <div
            className="absolute -bottom-2 left-2 right-2 h-full rounded-3xl"
            style={{ background: "#6DC87A", zIndex: 0 }}
          />
          <div
            className="absolute -bottom-1 left-1 right-1 h-full rounded-3xl"
            style={{ background: "#FFD93D", zIndex: 1 }}
          />

          {/* Main card */}
          <div className="sticker-card p-8 space-y-6 relative" style={{ zIndex: 2 }}>
            {/* Progress bar */}
            <div className="kids-progress-track">
              <div className="kids-progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>

            {/* Question Header */}
            <div className="text-center">
              <h2 className="text-2xl font-black tracking-tight flex items-center justify-center gap-2">
                <QuestionIcon className="w-7 h-7" /> Question {question.question_number} / {questions.length}
              </h2>
            </div>

            {/* Question Text */}
            <AnimatePresence mode="wait">
              <motion.p
                key={question.question_number}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-xl text-center font-bold leading-relaxed"
              >
                {question.question}
              </motion.p>
            </AnimatePresence>

            {/* Options */}
            <motion.div
              key={`options-${question.question_number}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {question.options.map((opt: string, idx: number) => {
                const isCorrect = correctAnswers.includes(opt);
                const isSelected = selected.includes(opt);

                const optionLetters = ["A", "B", "C", "D", "E", "F"];

                let baseStyle =
                  "w-full justify-start text-base whitespace-normal break-words text-left h-auto min-h-[3.5rem] py-3 px-5 leading-snug font-bold rounded-2xl border-2 transition-all duration-200";

                if (!submitted && !isSelected) {
                  baseStyle += " border-[#B7E9F7] hover:border-[#7DD8F0] hover:scale-[1.02] hover:shadow-md";
                }
                if (isSelected && !submitted) {
                  baseStyle += " ring-2 ring-[#7DD8F0] border-[#7DD8F0] bg-[#D0EDFA] dark:bg-[#2A3A4A]";
                }
                if (submitted && isSelected) {
                  baseStyle += isCorrect
                    ? " !bg-[#6DC87A] !text-white !border-[#5AB468] animate-wiggle"
                    : " !bg-[#FF6B6B] !text-white !border-[#E55A5A] animate-wiggle";
                }
                if (submitted && !isSelected && isCorrect) {
                  baseStyle += " !bg-[#6DC87A]/30 !border-[#6DC87A]";
                }

                return (
                  <Button
                    key={opt}
                    variant="outline"
                    className={baseStyle}
                    onClick={() => toggleSelect(opt)}
                  >
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#7DD8F0]/20 text-[#5BA8C0] font-black text-sm mr-2 shrink-0">
                      {optionLetters[idx] || "·"}
                    </span>
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
                  className={`p-5 rounded-2xl font-bold text-white text-center text-base ${
                    selected.sort().toString() === correctAnswers.sort().toString()
                      ? "bg-[#6DC87A]"
                      : "bg-[#FF6B6B]"
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    {selected.sort().toString() === correctAnswers.sort().toString()
                      ? <IconConfetti className="w-5 h-5 inline-block" />
                      : <IconLightbulb className="w-5 h-5 inline-block" />}
                  </span>{" "}
                  {question.explanation}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between pt-4 gap-3">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={currentIndex === 0}
                className="btn-bouncy rounded-full px-4 sm:px-6 font-bold border-2"
              >
                Previous
              </Button>

              {!submitted && (
                <Button
                  onClick={handleSubmit}
                  disabled={selected.length === 0}
                  className="btn-bouncy rounded-full px-5 sm:px-8 font-bold text-sm sm:text-base shadow-lg bg-[#7DD8F0] hover:bg-[#6AC8E0] text-white"
                >
                  Submit
                </Button>
              )}

              <Button
                onClick={nextQuestion}
                className={`btn-bouncy rounded-full px-4 sm:px-6 font-bold ${
                  currentIndex === questions.length - 1
                    ? "bg-[#FFAA4C] hover:bg-[#E8993F] text-white shadow-lg"
                    : ""
                }`}
                variant={
                  currentIndex === questions.length - 1 ? undefined : "outline"
                }
              >
                {currentIndex === questions.length - 1 ? "Result" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
