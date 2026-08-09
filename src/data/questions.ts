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
  "science-tech": [
    { question: "Name the scientist who discovered electromagnetic induction.", answer: "Michael Faraday" },
    { question: "What are the names of the two engineers who built Nepal’s first nanosatellite, “NepaliSat-1”?", answer: "Aabhas Maskey and Hareram Shrestha" },
    { question: "What is the value of absolute zero temperature in degrees Celsius?", answer: "−273.15°C" },
    { question: "What is the full form of RADAR?", answer: "Radio Detection and Ranging" },
    { question: "Where was Nepal’s first computer, IBM 1401, installed?", answer: "National Computer Center (NCC), Singha Durbar, Nepal" },
    { question: "What are female elephants called?", answer: "Cows" },
    { question: "What is the process by which caterpillars turn into butterflies called?", answer: "Metamorphosis" },
    { question: "What is the word “Amnesia” related to?", answer: "Loss of memory" },
    { question: "How much time does Earth take to complete one revolution around the Sun?", answer: "About 365 days, 5 hours, 48 minutes, and 46 seconds" },
    { question: "Who discovered the electron for the first time?", answer: "J. J. Thomson" },
  ],
  "art-literature": [
    { question: "Who painted the famous Renaissance masterpiece Mona Lisa?", answer: "Leonardo da Vinci — Italy" },
    { question: "Who wrote the famous tragedy Romeo and Juliet?", answer: "William Shakespeare — England" },
    { question: "Who painted The Starry Night, one of the most famous paintings in the world?", answer: "Vincent van Gogh — Netherlands" },
    { question: "Who created the famous marble sculpture David?", answer: "Michelangelo — Italy" },
    { question: "Which ancient Indian Sanskrit epic tells the story of Rama and Sita?", answer: "Ramayana" },
    { question: "Which Brazilian author wrote The Alchemist?", answer: "Paulo Coelho — Brazil" },
    { question: "Which Irish author wrote Gulliver's Travels?", answer: "Jonathan Swift — Ireland" },
    { question: "Which traditional Indonesian art uses wax and dye to create intricate patterns on fabric?", answer: "Batik" },
    { question: "Which Nepali poet is popularly known as the “Mahakavi” of Nepali literature?", answer: "Laxmi Prasad Devkota — Nepal" },
    { question: "Which Chinese philosopher and teacher's sayings were collected in a famous work known as the Analects?", answer: "Confucius — China" },
  ],
  "religion-culture": [
    { question: "नेवारी भाषाका महाकवि भनेर कसलाई चिनिन्छ?", answer: "सिद्धिदास अमात्य" },
    { question: "“चिना हराएको मान्छे” (आत्मबयान) कृतिका लेखक को हुन्?", answer: "हरिवंश आचार्य" },
    { question: "“पञ्चरत्न” भन्नाले के के बुझिन्छ?", answer: "सुन, हिरा, मोती, मुगा र मणि" },
    { question: "नेपाली भाषाको जननी भाषा कुन हो?", answer: "संस्कृत" },
    { question: "मदन पुरस्कार प्राप्त गर्ने पहिलो महिला साहित्यकार को हुन्? उनले कुन कृतिका लागि मदन पुरस्कार प्राप्त गरेकी थिइन्?", answer: "पारिजात — “शिरीषको फूल”" },
    { question: "नेपाली कथा साहित्यमा आधुनिकताको सुरुवात कसले गरेका हुन्?", answer: "गुरुप्रसाद मैनाली" },
    { question: "नेपाली साहित्यको पहिलो साहित्यिक पत्रिका कुन हो?", answer: "सुन्दरी" },
    { question: "नेपालमा बोलिने आग्नेय परिवारअन्तर्गतका भाषाहरू कुन कुन हुन्?", answer: "सतार र झाँगर" },
    { question: "नेपालमा विहार बनाउने चलन कुन कालखण्डदेखि भएको हो?", answer: "लिच्छवि काल" },
    { question: "नेपालमा फोटोग्राफीको चलन कुन राजाको पालामा सुरु भएको हो?", answer: "राजा राजेन्द्र" },
  ],
  history: [
    { question: "Who was the first President of the United States?", answer: "George Washington" },
    { question: "Who was the first woman in the world to become Prime Minister of a country?", answer: "Sirimavo Bandaranaike" },
    { question: "When did India gain independence?", answer: "15 August 1947" },
    { question: "Who killed Mahatma Gandhi?", answer: "Nathuram Godse" },
    { question: "Who was Nelson Mandela?", answer: "Former President of South Africa" },
    { question: "What was the main occupation of people in England before the Industrial Revolution?", answer: "Agriculture" },
    { question: "Who was the first man to walk on the Moon?", answer: "Neil Armstrong" },
    { question: "Who discovered America in 1492?", answer: "Christopher Columbus" },
    { question: "Who was the first Chief of Army of Nepal?", answer: "Kaji Kalu Pandey" },
    { question: "When was the United Nations (UNO) formed?", answer: "24 October 1945, in San Francisco, USA" },
  ],
  "current-affairs": [
    { question: "According to the World Happiness Report 2026, which country is the happiest in the world?", answer: "Finland" },
    { question: "Who is the current Speaker of the House of Representatives of Nepal?", answer: "Dol Prasad Aryal" },
    { question: "Who won the Golden Boot at the FIFA World Cup 2026?", answer: "Kylian Mbappé — France" },
    { question: "What is the real name of the world-renowned mountaineer known as “Nims Dai”?", answer: "Nirmal Purja" },
    { question: "Who inaugurated Nepal’s first modern road tunnel, the Nagdhunga–Sisnekhola Tunnel?", answer: "Sunil Lamsal, Minister for Infrastructure Development" },
    { question: "Which country does footballer Sidney Lopes Cabral represent?", answer: "Cape Verde" },
    { question: "Which political party led protests in India following the medical entrance examination paper leak?", answer: "Cockroach Janta Party (CJP)" },
    { question: "What is the new name of the Land Revenue Office in Nepal?", answer: "Land Administration Office" },
    { question: "How many countries participated in the FIFA World Cup 2026?", answer: "48 countries" },
    { question: "Which hotel in Nepal was ranked first in “The World’s 50 Greatest Luxury Hotels on Earth 2026”?", answer: "Shinta Mani Mustang" },
  ],
  geography: [
    { question: "Which district is known as ‘the district of 52 ponds and 53 lakes’?", answer: "Rukum" },
    { question: "Which is the biggest national park of Nepal?", answer: "Shey-Phoksundo National Park" },
    { question: "Which is the 6th largest continent in the world?", answer: "Europe" },
    { question: "Which equipment is used to measure the depth of seas and oceans?", answer: "Fathometer" },
    { question: "Which is the most abundant gas in Earth's atmosphere?", answer: "Nitrogen" },
    { question: "Which districts are known as the districts beyond the Himalaya (Himal parika jilla)?", answer: "Manang and Mustang" },
    { question: "On the map of the world, which country’s boundary is most similar to that of Nepal?", answer: "Portugal" },
    { question: "If Mustang is the driest place of Nepal, which is the wettest place in Nepal?", answer: "Lumle, Kaski" },
    { question: "Which continent is known as the “latest discovered continent”?", answer: "Antarctica" },
    { question: "Which place in Asia is located at the lowest altitude?", answer: "Dead Sea" },
  ],
  "maths-iq": [
    { question: "Complete the series: R, U, X, A, D, ?", answer: "G" },
    { question: "How many zeros are there in 1 million?", answer: "6" },
    { question: "Ryan is ranked exactly in the middle of his class. There are 12 students who scored higher and 12 who scored lower. How many students are there in his class?", answer: "25 students" },
    { question: "Which Hindu-Arabic number cannot be represented by a Roman numeral?", answer: "0 (Zero)" },
    { question: "If 60 caps are dried in 60 minutes, in how many minutes can 9 caps be dried together?", answer: "60 minutes" },
    { question: "Which “writer” is not a human being?", answer: "Typewriter" },
    { question: "Who was the first person to use the term “Jai Nepal”?", answer: "Shukraraj Shastri" },
    { question: "Can you “shoot” your friend, cause him no injury, and not commit any crime? How?", answer: "By taking his photograph." },
    { question: "A number is doubled and then 5 is added. The result is 21. What is the number?", answer: "8" },
    { question: "What do we call points that lie on the same straight line?", answer: "Collinear points" },
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
