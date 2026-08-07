export interface QuizQuestion {
  id: string;
  number: number;
  question: string;
  answer: string;
}

const questionBank: Record<string, { question: string; answer: string }[]> = {
  "games-sports": [
    { question: "Which sport is known as the “gentleman’s game”?", answer: "Cricket" },
    { question: "Which country hosted the 2024 Summer Olympics?", answer: "France" },
    { question: "Which country won the FIFA World Cup in 2018?", answer: "France" },
    { question: "What is the standard distance of a marathon race?", answer: "42.195 km (26.2 miles)" },
    { question: "In which country was the first FIFA World Cup held in 1930?", answer: "Uruguay" },
    { question: "Which cricketer is famously known as the “Master Blaster”?", answer: "Sachin Tendulkar" },
    { question: "In which combat sport is the term “Ippon” used to score an immediate win?", answer: "Judo" },
    { question: "In the game of pool, what number is assigned to the solid black ball?", answer: "8 (Eight)" },
    { question: "How many players make up a standard team on the pitch during a rugby union match?", answer: "15 players" },
    { question: "Who is the head coach of the Nepal national cricket team?", answer: "Stuart Law" },
  ],
};

export function getQuestions(subjectId: string, count = 10): QuizQuestion[] {
  const bank = questionBank[subjectId];
  return Array.from({ length: count }, (_, i) => ({
    id: `${subjectId}${i + 1}`,
    number: i + 1,
    question: bank?.[i]?.question ?? `Question ${i + 1} coming soon`,
    answer: bank?.[i]?.answer ?? `Answer ${i + 1}`,
  }));
}
