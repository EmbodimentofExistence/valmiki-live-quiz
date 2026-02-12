import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LogoWatermark } from "@/components/LogoWatermark";
import { HeroSection } from "@/components/HeroSection";
import { SubjectSelection } from "@/components/SubjectSelection";
import { QuizInterface } from "@/components/QuizInterface";

type View = "hero" | "subjects" | "quiz";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("hero");
  const [selectedSubject, setSelectedSubject] = useState<{ id: string; name: string } | null>(null);

  const handleSelectSubject = (subjectId: string, subjectName: string) => {
    setSelectedSubject({ id: subjectId, name: subjectName });
    setCurrentView("quiz");
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
          />
        )}

        {currentView === "quiz" && selectedSubject && (
          <QuizInterface
            key="quiz"
            subjectId={selectedSubject.id}
            subjectName={selectedSubject.name}
            onBack={() => setCurrentView("subjects")}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
