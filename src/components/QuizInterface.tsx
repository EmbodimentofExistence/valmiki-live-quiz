import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuizBoard } from "./QuizBoard";
import { QuestionDisplay } from "./QuestionDisplay";
import { QuizTimer } from "./QuizTimer";
import { LogoEmblem } from "./LogoEmblem";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff, SkipForward, FastForward } from "lucide-react";

// Generate 20 placeholder questions per subject
function generateQuestions(prefix: string, count: number = 20) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}${i + 1}`,
    number: i + 1,
    answered: false,
    question: `${prefix.toUpperCase()} Question ${i + 1}`,
    answer: `Answer ${i + 1}`,
  }));
}

const sampleCategories = [
  { id: "science", name: "Science", questions: generateQuestions("s") },
  { id: "history", name: "History", questions: generateQuestions("h") },
  { id: "geography", name: "Geography", questions: generateQuestions("g") },
  { id: "literature", name: "Literature", questions: generateQuestions("l") },
];

interface QuizInterfaceProps {
  onBack: () => void;
}

export function QuizInterface({ onBack }: QuizInterfaceProps) {
  const [categories, setCategories] = useState(sampleCategories);
  const [selectedQuestion, setSelectedQuestion] = useState<{
    categoryId: string;
    questionId: string;
    question: string;
    answer: string;
    options?: string[];
    correctIndex?: number;
    number: number;
    category: string;
  } | null>(null);
  const [passCount, setPassCount] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerDuration] = useState(30);

  const handleSelectQuestion = useCallback((categoryId: string, questionId: string) => {
    const category = categories.find(c => c.id === categoryId);
    const question = category?.questions.find(q => q.id === questionId);
    
    if (category && question && !question.answered) {
      setSelectedQuestion({
        categoryId,
        questionId,
        question: question.question,
        answer: question.answer,
        number: question.number,
        category: category.name,
      });
      setShowAnswer(false);
      setSelectedOption(null);
      setTimerRunning(true);
      setPassCount(0);
    }
  }, [categories]);

  const handleRevealAnswer = () => {
    setShowAnswer(true);
    setTimerRunning(false);
  };

  const handleNextQuestion = () => {
    if (!selectedQuestion) return;

    // Mark question as answered
    setCategories(prev => prev.map(cat => 
      cat.id === selectedQuestion.categoryId
        ? {
            ...cat,
            questions: cat.questions.map(q => 
              q.id === selectedQuestion.questionId
                ? { ...q, answered: true }
                : q
            ),
          }
        : cat
    ));

    // Clear selection
    setSelectedQuestion(null);
    setShowAnswer(false);
    setSelectedOption(null);
  };

  const handlePass = () => {
    setTimerRunning(false);
    setPassCount(prev => prev + 1);
    // Reset timer for next team
    setTimeout(() => {
      setTimerRunning(true);
    }, 100);
  };

  const handleTimeUp = () => {
    setTimerRunning(false);
    // On time up, act like a pass
    handlePass();
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="flex items-center gap-4">
          <LogoEmblem size="sm" />
          <div className="text-right hidden sm:block">
            <h1 className="font-display text-xl font-bold">Valmiki Quiz Carnival</h1>
            <p className="text-sm text-muted-foreground">2082</p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {selectedQuestion ? (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Timer and controls */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 glass rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Category:</span>
                  <span className="font-display text-xl font-bold text-primary">
                    {selectedQuestion.category}
                  </span>
                </div>

                <QuizTimer
                  duration={timerDuration}
                  isRunning={timerRunning}
                  onTimeUp={handleTimeUp}
                />

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handlePass}
                    disabled={showAnswer}
                  >
                    <FastForward className="w-4 h-4" />
                    Pass {passCount > 0 && `(${passCount})`}
                  </Button>
                  <Button
                    variant={showAnswer ? "quizCorrect" : "outline"}
                    onClick={handleRevealAnswer}
                    disabled={showAnswer}
                  >
                    {showAnswer ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    {showAnswer ? "Revealed" : "Reveal Answer"}
                  </Button>
                </div>
              </div>

              {/* Question display */}
              <QuestionDisplay
                question={selectedQuestion.question}
                options={selectedQuestion.options}
                answer={selectedQuestion.answer}
                showAnswer={showAnswer}
                selectedOption={selectedOption}
                onSelectOption={setSelectedOption}
                correctOptionIndex={selectedQuestion.correctIndex}
                category={selectedQuestion.category}
                points={selectedQuestion.number}
              />

              {/* Next question button */}
              {showAnswer && (
                <motion.div
                  className="flex justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Button
                    variant="carnival"
                    size="lg"
                    onClick={handleNextQuestion}
                  >
                    <SkipForward className="w-5 h-5" />
                    Next Question
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="board"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <QuizBoard
                categories={categories}
                onSelectQuestion={handleSelectQuestion}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
