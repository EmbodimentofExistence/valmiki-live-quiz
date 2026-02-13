import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { LogoWatermark } from "@/components/LogoWatermark";
import { HeroSection } from "@/components/HeroSection";
import { SubjectSelection } from "@/components/SubjectSelection";
import { QuizInterface } from "@/components/QuizInterface";

type View = "hero" | "subjects" | "quiz";

const QUESTIONS_PER_SUBJECT = 20;

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("hero");
  const [selectedSubject, setSelectedSubject] = useState<{ id: string; name: string } | null>(null);
  // Track answered question IDs per subject
  const [answeredBySubject, setAnsweredBySubject] = useState<Record<string, Set<string>>>({});

  const completedSubjects = new Set(
    Object.entries(answeredBySubject)
      .filter(([, answered]) => answered.size >= QUESTIONS_PER_SUBJECT)
      .map(([id]) => id)
  );

  const handleSelectSubject = (subjectId: string, subjectName: string) => {
    setSelectedSubject({ id: subjectId, name: subjectName });
    setCurrentView("quiz");
  };

  const handleMarkAnswered = useCallback((subjectId: string, questionId: string) => {
    setAnsweredBySubject(prev => {
      const existing = prev[subjectId] ?? new Set();
      const updated = new Set(existing);
      updated.add(questionId);
      return { ...prev, [subjectId]: updated };
    });
  }, []);

  const handleBackToSubjects = () => {
    setCurrentView("subjects");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <LogoWatermark />

      <AnimatePresence mode="wait">
        {currentView === "hero" && (
          <HeroSection
            key="hero"
            onStartQuiz={() => setCurrentView("subjects")}
          />
        )}

        {currentView === "subjects" && (
          <SubjectSelection
            key="subjects"
            onSelectSubject={handleSelectSubject}
            onBack={() => setCurrentView("hero")}
            completedSubjects={completedSubjects}
          />
        )}

        {currentView === "quiz" && selectedSubject && (
          <QuizInterface
            key={`quiz-${selectedSubject.id}`}
            subjectId={selectedSubject.id}
            subjectName={selectedSubject.name}
            onBack={handleBackToSubjects}
            answeredIds={answeredBySubject[selectedSubject.id] ?? new Set()}
            onMarkAnswered={(qId) => handleMarkAnswered(selectedSubject.id, qId)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
