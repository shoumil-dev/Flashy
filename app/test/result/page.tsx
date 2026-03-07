"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { IconTrophy, IconMedal, IconFlexBicep, IconBook } from "@/components/kids-icons";

const StarSVG = ({ className, color = "#FFD93D" }: { className?: string; color?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l7.1-1.01L12 2z" />
  </svg>
);

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<{
    score: number;
    total: number;
    percent: number;
  }>({
    score: 0,
    total: 0,
    percent: 0,
  });

  // ✅ Load from localStorage safely on client
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("quizResult");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setResult({
          score: parsed.score ?? 0,
          total: parsed.total ?? 0,
          percent: parsed.percent ?? 0,
        });
      } catch {
        console.error("Invalid quizResult format");
      }
    }
  }, []);

  const getGrade = () => {
    if (result.percent >= 90) return { icon: <IconTrophy className="w-16 h-16" />, label: "Amazing!", color: "#6DC87A" };
    if (result.percent >= 70) return { icon: <IconMedal className="w-16 h-16" />, label: "Great job!", color: "#7DD8F0" };
    if (result.percent >= 50) return { icon: <IconFlexBicep className="w-16 h-16" />, label: "Good effort!", color: "#FFAA4C" };
    return { icon: <IconBook className="w-16 h-16" />, label: "Keep learning!", color: "#FF8FAB" };
  };

  const grade = getGrade();

  return (
    <div className="kids-bg flex justify-center items-center w-full py-12 px-4 min-h-screen">
      {/* Background decorations */}
      <div className="blob blob-blue" style={{ top: "-80px", left: "-100px" }} />
      <div className="blob blob-green" style={{ bottom: "-60px", right: "-80px" }} />
      <div className="blob blob-orange" style={{ top: "30%", right: "-40px" }} />
      <div className="blob blob-pink" style={{ bottom: "20%", left: "-40px" }} />

      <StarSVG className="absolute w-8 h-8 top-16 left-[15%] animate-sparkle opacity-60 pointer-events-none" />
      <StarSVG className="absolute w-6 h-6 top-[20%] right-[20%] animate-sparkle opacity-50 pointer-events-none" color="#FF8FAB" />
      <StarSVG className="absolute w-5 h-5 bottom-[25%] left-[30%] animate-sparkle opacity-40 pointer-events-none" color="#6DC87A" />
      <StarSVG className="absolute w-7 h-7 bottom-[30%] right-[15%] animate-sparkle opacity-50 pointer-events-none" color="#B49AFF" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10"
      >
        {/* Stacked card layers */}
        <div className="relative">
          <div
            className="absolute -bottom-2 left-2 right-2 h-full rounded-3xl"
            style={{ background: "#6DC87A" }}
          />
          <div
            className="absolute -bottom-1 left-1 right-1 h-full rounded-3xl"
            style={{ background: "#FFD93D" }}
          />

          <div className="sticker-card max-w-md w-full mx-auto p-10 text-center space-y-6 relative" style={{ zIndex: 2 }}>
            {/* Trophy / emoji */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="text-7xl"
            >
              {grade.icon}
            </motion.div>

            <h1 className="text-3xl font-black">{grade.label}</h1>
            <p className="text-lg font-semibold text-muted-foreground">Quiz Completed!</p>

            {/* Score display */}
            <div className="space-y-3">
              <p className="text-lg font-bold">
                You scored{" "}
                <span className="text-foreground">
                  {result.score} / {result.total}
                </span>
              </p>

              {/* Score bar */}
              <div className="kids-progress-track h-4">
                <motion.div
                  className="kids-progress-fill h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${result.percent}%` }}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                />
              </div>

              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="inline-block text-4xl font-black"
                style={{ color: grade.color }}
              >
                {result.percent}%
              </motion.span>
            </div>

            {/* Action buttons */}
            <div className="flex justify-center gap-4 pt-4 flex-wrap">
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/quiz")}
                className="btn-bouncy rounded-full px-8 font-bold border-2"
              >
                Home
              </Button>

              <Button
                size="lg"
                onClick={() => {
                  localStorage.removeItem("quizResult");
                  router.push("/test");
                }}
                className="btn-bouncy rounded-full px-8 font-bold text-base shadow-lg bg-[#7DD8F0] hover:bg-[#6AC8E0] text-white"
              >
                Retake
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
