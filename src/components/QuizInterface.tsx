import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuestionDisplay } from "./QuestionDisplay";
import { QuizTimer } from "./QuizTimer";
import { LogoEmblem } from "./LogoEmblem";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff, SkipForward, FastForward } from "lucide-react";

function generateQuestions(prefix: string, count: number = 20) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}${i + 1}`,
    number: i + 1,
    answered: false,
    question: `${prefix.toUpperCase()} Question ${i + 1}`,
    answer: `Answer ${i + 1}`,
  }));
}

interface QuizInterfaceProps {
  subjectId: string;
  subjectName: string;
  onBack: () => void;
}

export function QuizInterface({ subjectId, subjectName, onBack }: QuizInterfaceProps) {
  const [questions, setQuestions] = useState(() => generateQuestions(subjectId));
  const [selectedQuestion, setSelectedQuestion] = useState<{
    questionId: string;
    question: string;
    answer: string;
    number: number;
  } | null>(null);
  const [passCount, setPassCount] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerResetKey, setTimerResetKey] = useState(0);

  const handleSelectQuestion = useCallback((questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question && !question.answered) {
      setSelectedQuestion({
        questionId,
        question: question.question,
        answer: question.answer,
        number: question.number,
      });
      setShowAnswer(false);
      setPassCount(0);
      setTimerDuration(30);
      setTimerResetKey(prev => prev + 1);
      setTimerRunning(true);
    }
  }, [questions]);

  const handleRevealAnswer = () => {
    setShowAnswer(true);
    setTimerRunning(false);
  };

  const handleNextQuestion = () => {
    if (!selectedQuestion) return;
    setQuestions(prev => prev.map(q =>
      q.id === selectedQuestion.questionId ? { ...q, answered: true } : q
    ));
    setSelectedQuestion(null);
    setShowAnswer(false);
    setTimerRunning(false);
  };

  const [timerDuration, setTimerDuration] = useState(30);

  const handlePass = () => {
    setPassCount(prev => prev + 1);
    setTimerDuration(15);
    setTimerResetKey(prev => prev + 1);
    setTimerRunning(true);
  };

  const handleTimeUp = () => {
    // Timer expired — just stop. No auto-pass.
    setTimerRunning(false);
  };

  return (
    <motion.div
      className="min-h-screen p-4 md:p-6 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Subjects
        </Button>
        <div className="flex items-center gap-4">
          <LogoEmblem size="sm" />
          <div className="text-right hidden sm:block">
            <h1 className="font-display text-xl font-bold">{subjectName}</h1>
            <p className="text-sm text-muted-foreground">Valmiki Quiz Carnival 2082</p>
          </div>
        </div>
      </header>

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
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 glass rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Subject:</span>
                  <span className="font-display text-xl font-bold text-primary">{subjectName}</span>
                </div>

                <QuizTimer
                  duration={timerDuration}
                  isRunning={timerRunning}
                  resetKey={timerResetKey}
                  onTimeUp={handleTimeUp}
                />

                <div className="flex gap-3">
                  <Button variant="outline" onClick={handlePass} disabled={showAnswer}>
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

              <QuestionDisplay
                question={selectedQuestion.question}
                answer={selectedQuestion.answer}
                showAnswer={showAnswer}
                selectedOption={null}
                onSelectOption={() => {}}
                category={subjectName}
                points={selectedQuestion.number}
              />

              {showAnswer && (
                <motion.div
                  className="flex justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Button variant="carnival" size="lg" onClick={handleNextQuestion}>
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
              <div className="glass rounded-3xl p-6 md:p-8 lg:p-10 min-h-[70vh] flex flex-col">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-8">
                  {subjectName} — <span className="text-gold-gradient">Select a Question</span>
                </h2>
                <div className="flex-1 flex items-center justify-center">
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 md:gap-5 w-full max-w-4xl">
                    {questions.map((q, i) => (
                      <motion.button
                        key={q.id}
                        onClick={() => !q.answered && handleSelectQuestion(q.id)}
                        className={`
                          aspect-square rounded-2xl flex items-center justify-center
                          font-display text-3xl md:text-4xl lg:text-5xl font-bold transition-all duration-300
                          ${q.answered
                            ? "bg-muted/50 text-muted-foreground cursor-default"
                            : "bg-card hover:bg-card-elevated hover:scale-105 hover:shadow-lg text-foreground cursor-pointer border-2 border-border hover:border-primary"
                          }
                        `}
                        whileHover={!q.answered ? { scale: 1.08 } : {}}
                        whileTap={!q.answered ? { scale: 0.95 } : {}}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.02 }}
                        disabled={q.answered}
                      >
                        {q.answered ? "✓" : q.number}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
