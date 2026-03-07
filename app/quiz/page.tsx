"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { IconSparkles, IconStar } from "@/components/kids-icons";

/* ── tiny inline SVG decorations ── */
const LightbulbSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="28" rx="16" ry="18" fill="#FFD93D" />
    <rect x="26" y="44" width="12" height="8" rx="2" fill="#FFAA4C" />
    <rect x="28" y="52" width="8" height="3" rx="1.5" fill="#FFAA4C" />
    <line x1="32" y1="4" x2="32" y2="10" stroke="#FFD93D" strokeWidth="2" strokeLinecap="round" />
    <line x1="52" y1="16" x2="47" y2="20" stroke="#FFD93D" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="16" x2="17" y2="20" stroke="#FFD93D" strokeWidth="2" strokeLinecap="round" />
    <line x1="56" y1="30" x2="50" y2="30" stroke="#FFD93D" strokeWidth="2" strokeLinecap="round" />
    <line x1="8" y1="30" x2="14" y2="30" stroke="#FFD93D" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const AtomSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="5" fill="#7DD8F0" />
    <ellipse cx="32" cy="32" rx="24" ry="10" stroke="#7DD8F0" strokeWidth="2" fill="none" transform="rotate(0 32 32)" />
    <ellipse cx="32" cy="32" rx="24" ry="10" stroke="#6DC87A" strokeWidth="2" fill="none" transform="rotate(60 32 32)" />
    <ellipse cx="32" cy="32" rx="24" ry="10" stroke="#FFAA4C" strokeWidth="2" fill="none" transform="rotate(120 32 32)" />
  </svg>
);

const PencilSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="8" width="12" height="40" rx="2" fill="#FFAA4C" transform="rotate(-15 26 28)" />
    <polygon points="22,48 26,58 30,48" fill="#FFD93D" transform="rotate(-15 26 53)" />
    <rect x="20" y="8" width="12" height="6" rx="1" fill="#FF8FAB" transform="rotate(-15 26 11)" />
  </svg>
);

const BookSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 12 C8 12 20 8 32 14 C44 8 56 12 56 12 L56 52 C56 52 44 48 32 54 C20 48 8 52 8 52 Z" fill="#7DD8F0" opacity="0.3" />
    <path d="M8 12 C8 12 20 8 32 14 L32 54 C20 48 8 52 8 52 Z" fill="#6DC87A" opacity="0.6" />
    <path d="M56 12 C56 12 44 8 32 14 L32 54 C44 48 56 52 56 52 Z" fill="#7DD8F0" opacity="0.6" />
    <line x1="32" y1="14" x2="32" y2="54" stroke="#2D2D2D" strokeWidth="1" opacity="0.2" />
  </svg>
);

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

/* ── Trash icon ── */
const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

/* ── Clock icon ── */
const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/* ── Types ── */
interface SavedQuiz {
  id: string;
  topic: string;
  questionCount: number;
  createdAt: string;
  data: any[];
}

const MAX_RECENT = 10;

/* ── Helper: save quiz to recent list ── */
function saveToRecent(topic: string, questions: any[]) {
  if (typeof window === "undefined") return;

  const entry: SavedQuiz = {
    id: crypto.randomUUID(),
    topic,
    questionCount: questions.length,
    createdAt: new Date().toISOString(),
    data: questions,
  };

  let recent: SavedQuiz[] = [];
  try {
    const raw = localStorage.getItem("recentQuizzes");
    if (raw) recent = JSON.parse(raw);
  } catch {}

  // Add to front, cap at MAX_RECENT
  recent = [entry, ...recent].slice(0, MAX_RECENT);
  localStorage.setItem("recentQuizzes", JSON.stringify(recent));
}

/* ── Helper: format relative time ── */
function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

export default function Page() {
  const { theme, setTheme } = useTheme();
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [recentQuizzes, setRecentQuizzes] = useState<SavedQuiz[]>([]);

  const loadingPhrases = ["Thinking...", "Creating...", "Almost there..."];
  const [phase, setPhase] = useState(0);

  // Load recent quizzes from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("recentQuizzes");
      if (raw) setRecentQuizzes(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setPhase((p) => (p + 1) % loadingPhrases.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [loading]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => inputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        localStorage.setItem("quizData", JSON.stringify(data));
        // Save to recent quizzes (use filename without extension as topic)
        const name = file.name.replace(/\.json$/i, "");
        saveToRecent(name, data);
        router.push("/test");
      } catch {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return alert("Enter a topic");
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, count }),
      });

      const data = await res.json();
      let raw = data.text.trim();
      raw = raw.replace(/^```json\s*/i, "").replace(/```$/i, "");
      const questions = JSON.parse(raw);
      localStorage.setItem("quizData", JSON.stringify(questions));
      // Save to recent quizzes
      saveToRecent(topic, questions);
      router.push("/test");
    } catch (err) {
      console.error(err);
      alert("Failed to generate questions");
    } finally {
      setLoading(false);
    }
  };

  const loadQuiz = useCallback((quiz: SavedQuiz) => {
    localStorage.setItem("quizData", JSON.stringify(quiz.data));
    router.push("/test");
  }, [router]);

  const deleteQuiz = useCallback((id: string) => {
    setRecentQuizzes((prev) => {
      const updated = prev.filter((q) => q.id !== id);
      localStorage.setItem("recentQuizzes", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <div className="kids-bg flex flex-col justify-center items-center w-full min-h-screen py-10 px-4 space-y-8">
      {/* ── Background blobs ── */}
      <div className="blob blob-blue" style={{ top: "-80px", left: "-100px" }} />
      <div className="blob blob-green" style={{ bottom: "-60px", right: "-80px" }} />
      <div className="blob blob-orange" style={{ top: "40%", right: "-60px" }} />
      <div className="blob blob-pink" style={{ bottom: "10%", left: "-40px" }} />

      {/* ── Floating decorative SVGs ── */}
      <LightbulbSVG className="absolute w-14 h-14 top-8 left-8 animate-float opacity-60 pointer-events-none hidden sm:block" />
      <AtomSVG className="absolute w-16 h-16 top-12 right-10 animate-float-2 opacity-50 pointer-events-none hidden sm:block" />
      <PencilSVG className="absolute w-12 h-12 bottom-20 left-12 animate-float-3 opacity-50 pointer-events-none hidden sm:block" />
      <BookSVG className="absolute w-14 h-14 bottom-24 right-14 animate-float opacity-50 pointer-events-none hidden sm:block" />

      {/* Scattered stars & sparks */}
      <StarSVG className="absolute w-6 h-6 top-24 left-[30%] animate-sparkle opacity-70 pointer-events-none" />
      <StarSVG className="absolute w-5 h-5 top-[60%] right-[20%] animate-sparkle opacity-60 pointer-events-none" color="#FF8FAB" />
      <SparkSVG className="absolute w-5 h-5 top-[15%] right-[35%] animate-star-spin opacity-50 pointer-events-none" />
      <SparkSVG className="absolute w-4 h-4 bottom-[30%] left-[25%] animate-star-spin opacity-40 pointer-events-none" color="#7DD8F0" />
      <StarSVG className="absolute w-4 h-4 bottom-[15%] right-[40%] animate-sparkle opacity-50 pointer-events-none" color="#6DC87A" />

      {/* ── Animated Heading ── */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center z-10"
      >
        <h1
          className="text-6xl sm:text-7xl font-black tracking-tight"
          style={{
            background: "linear-gradient(135deg, #7DD8F0 0%, #6DC87A 40%, #FFAA4C 80%, #FF8FAB 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          QuizDeck! 🎓
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-muted-foreground text-center max-w-xl text-lg font-semibold z-10"
      >
        Generate, upload, and take interactive quizzes instantly — powered by AI <IconSparkles className="inline-block w-5 h-5 align-middle ml-1" />
      </motion.p>

      {/* ── Main Sticker Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="sticker-card flex flex-col items-center gap-6 w-full max-w-3xl p-8 z-10"
      >
        {/* Topic + Count row */}
        <div className="w-full flex flex-col sm:flex-row items-center gap-4">
          <Input
            type="text"
            placeholder="Enter topic (e.g. Dinosaurs, Space)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 kids-input"
          />
          <Input
            type="number"
            min={1}
            max={65}
            placeholder="# Qs"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-32 kids-input"
          />
          <Button
            onClick={handleGenerate}
            disabled={loading}
            variant="default"
            size="lg"
            className="btn-bouncy px-8 font-bold text-base rounded-full shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {loadingPhrases[phase]}
              </>
            ) : (
              "Generate"
            )}
          </Button>
        </div>

        {/* Divider with stars */}
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#7DD8F0] to-transparent" />
          <IconStar className="w-5 h-5 shrink-0" />
          <div className="flex-1 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#FFAA4C] to-transparent" />
        </div>

        {/* Bottom Row: Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-5 w-full">
          {/* Upload */}
          <div className="flex flex-col items-center">
            <Button
              onClick={handleClick}
              variant="default"
              size="lg"
              className="btn-bouncy px-8 font-bold text-base rounded-full shadow-lg"
            >
              Upload Questions
            </Button>
            <input
              ref={inputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Saved Quiz */}
          <Button
            variant="outline"
            onClick={() => router.push("/test")}
            className="btn-bouncy px-8 font-bold text-base rounded-full border-2"
          >
            Saved Quiz
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="btn-bouncy rounded-full border-2 w-12 h-12"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </motion.div>

      {/* ── Recent Quizzes Section ── */}
      {recentQuizzes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full max-w-3xl z-10"
        >
          <h2 className="text-xl font-black mb-4 flex items-center gap-2">
            <ClockIcon className="w-5 h-5" />
            Recent Quizzes
          </h2>

          <div className="space-y-2">
            <AnimatePresence>
              {recentQuizzes.map((quiz, idx) => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.04 }}
                  className="sticker-card flex items-center gap-4 px-5 py-3 group cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => loadQuiz(quiz)}
                >
                  {/* Number badge */}
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#7DD8F0]/20 text-[#5BA8C0] font-black text-sm shrink-0">
                    {idx + 1}
                  </span>

                  {/* Quiz info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-base truncate">{quiz.topic}</p>
                    <p className="text-sm text-muted-foreground font-semibold">
                      {quiz.questionCount} question{quiz.questionCount !== 1 ? "s" : ""} · {timeAgo(quiz.createdAt)}
                    </p>
                  </div>

                  {/* Delete button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteQuiz(quiz.id);
                    }}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* ── Copyright ── */}
      <div className="mt-8 text-sm text-muted-foreground text-center z-10 font-semibold">
        &copy; {new Date().getFullYear()} Shoumil Guha
      </div>
    </div>
  );
}
