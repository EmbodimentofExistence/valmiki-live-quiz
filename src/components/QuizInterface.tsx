import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuizBoard } from "./QuizBoard";
import { QuestionDisplay } from "./QuestionDisplay";
import { QuizTimer } from "./QuizTimer";
import { LogoEmblem } from "./LogoEmblem";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff, SkipForward, Check } from "lucide-react";

// Sample quiz data
const sampleCategories = [
  {
    id: "science",
    name: "Science",
    questions: [
      { id: "s1", points: 100, answered: false, question: "What is the chemical symbol for Gold?", answer: "Au", options: ["Au", "Ag", "Fe", "Cu"], correctIndex: 0 },
      { id: "s2", points: 200, answered: false, question: "Which planet is known as the Red Planet?", answer: "Mars", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctIndex: 1 },
      { id: "s3", points: 300, answered: false, question: "What is the powerhouse of the cell?", answer: "Mitochondria", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Body"], correctIndex: 2 },
      { id: "s4", points: 400, answered: false, question: "What is the speed of light in vacuum?", answer: "299,792 km/s" },
      { id: "s5", points: 500, answered: false, question: "What particle has no electric charge?", answer: "Neutron" },
    ],
  },
  {
    id: "history",
    name: "History",
    questions: [
      { id: "h1", points: 100, answered: false, question: "In which year did World War II end?", answer: "1945", options: ["1943", "1944", "1945", "1946"], correctIndex: 2 },
      { id: "h2", points: 200, answered: false, question: "Who was the first Emperor of Rome?", answer: "Augustus", options: ["Julius Caesar", "Augustus", "Nero", "Caligula"], correctIndex: 1 },
      { id: "h3", points: 300, answered: false, question: "The Great Wall of China was built primarily to protect against which group?", answer: "Mongols" },
      { id: "h4", points: 400, answered: false, question: "Which ancient civilization built Machu Picchu?", answer: "Inca" },
      { id: "h5", points: 500, answered: false, question: "What year did Nepal become a federal democratic republic?", answer: "2008" },
    ],
  },
  {
    id: "geography",
    name: "Geography",
    questions: [
      { id: "g1", points: 100, answered: false, question: "What is the capital city of Australia?", answer: "Canberra", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correctIndex: 2 },
      { id: "g2", points: 200, answered: false, question: "Which is the longest river in the world?", answer: "Nile", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correctIndex: 1 },
      { id: "g3", points: 300, answered: false, question: "Mount Everest lies on the border of which two countries?", answer: "Nepal and Tibet (China)" },
      { id: "g4", points: 400, answered: false, question: "What is the smallest country in the world by area?", answer: "Vatican City" },
      { id: "g5", points: 500, answered: false, question: "Which African country has the most pyramids?", answer: "Sudan" },
    ],
  },
  {
    id: "literature",
    name: "Literature",
    questions: [
      { id: "l1", points: 100, answered: false, question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correctIndex: 1 },
      { id: "l2", points: 200, answered: false, question: "What is the name of the epic poem attributed to Valmiki?", answer: "Ramayana", options: ["Mahabharata", "Ramayana", "Bhagavad Gita", "Vedas"], correctIndex: 1 },
      { id: "l3", points: 300, answered: false, question: "In which language was 'The Divine Comedy' originally written?", answer: "Italian" },
      { id: "l4", points: 400, answered: false, question: "Who is the author of '1984'?", answer: "George Orwell" },
      { id: "l5", points: 500, answered: false, question: "What is considered the world's first novel?", answer: "The Tale of Genji" },
    ],
  },
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
    points: number;
    category: string;
  } | null>(null);
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
        options: question.options,
        correctIndex: question.correctIndex,
        points: question.points,
        category: category.name,
      });
      setShowAnswer(false);
      setSelectedOption(null);
      setTimerRunning(true);
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

  const handleTimeUp = () => {
    setTimerRunning(false);
    handleRevealAnswer();
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
                points={selectedQuestion.points}
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
