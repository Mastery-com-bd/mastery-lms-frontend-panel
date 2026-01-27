// Mock Quiz Data Structure - Scalable to 30+ questions

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctAnswer: string; // The ID of the correct option
}

export interface QuizData {
  id: string;
  title: string;
  description: string;
  totalQuestions: number;
  passingScore: number; // Percentage
  timeLimit?: number; // In minutes
  questions: QuizQuestion[];
}

// Answer Log Structure
export interface AnswerLog {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  scorePercentage: number;
  passed: boolean;
  answerLogs: AnswerLog[];
}

// Helper to generate unique IDs
const generateId = (prefix: string, index: number) => `${prefix}_${index}`;

// Mock questions - 30 questions for a complete quiz
export const mockQuizQuestions: QuizQuestion[] = [
  {
    id: generateId("q", 1),
    question: "What is the primary purpose of React's useState hook?",
    options: [
      { id: "a", text: "To fetch data from APIs" },
      { id: "b", text: "To manage component state" },
      { id: "c", text: "To handle routing" },
      { id: "d", text: "To style components" },
    ],
    correctAnswer: "b",
  },
  {
    id: generateId("q", 2),
    question: "Which CSS property is used to create flexible layouts?",
    options: [
      { id: "a", text: "display: block" },
      { id: "b", text: "display: inline" },
      { id: "c", text: "display: flex" },
      { id: "d", text: "display: none" },
    ],
    correctAnswer: "c",
  },
  {
    id: generateId("q", 3),
    question: "What does API stand for?",
    options: [
      { id: "a", text: "Application Programming Interface" },
      { id: "b", text: "Automated Program Integration" },
      { id: "c", text: "Application Process Integration" },
      { id: "d", text: "Advanced Programming Interface" },
    ],
    correctAnswer: "a",
  },
  {
    id: generateId("q", 4),
    question: "Which method is used to add an element to the end of an array in JavaScript?",
    options: [
      { id: "a", text: "unshift()" },
      { id: "b", text: "push()" },
      { id: "c", text: "pop()" },
      { id: "d", text: "shift()" },
    ],
    correctAnswer: "b",
  },
  {
    id: generateId("q", 5),
    question: "What is the purpose of the 'key' prop in React lists?",
    options: [
      { id: "a", text: "To style list items" },
      { id: "b", text: "To help React identify which items have changed" },
      { id: "c", text: "To sort the list items" },
      { id: "d", text: "To filter the list items" },
    ],
    correctAnswer: "b",
  },
  {
    id: generateId("q", 6),
    question: "Which HTML5 element is used for navigation links?",
    options: [
      { id: "a", text: "<nav>" },
      { id: "b", text: "<header>" },
      { id: "c", text: "<footer>" },
      { id: "d", text: "<section>" },
    ],
    correctAnswer: "a",
  },
  {
    id: generateId("q", 7),
    question: "What is TypeScript primarily used for?",
    options: [
      { id: "a", text: "Database management" },
      { id: "b", text: "Adding static types to JavaScript" },
      { id: "c", text: "Server configuration" },
      { id: "d", text: "Image processing" },
    ],
    correctAnswer: "b",
  },
  {
    id: generateId("q", 8),
    question: "Which hook is used for side effects in React?",
    options: [
      { id: "a", text: "useState" },
      { id: "b", text: "useContext" },
      { id: "c", text: "useEffect" },
      { id: "d", text: "useReducer" },
    ],
    correctAnswer: "c",
  },
  {
    id: generateId("q", 9),
    question: "What does CSS Grid's 'fr' unit represent?",
    options: [
      { id: "a", text: "Fixed ratio" },
      { id: "b", text: "Fractional unit of available space" },
      { id: "c", text: "Frame rate" },
      { id: "d", text: "Font ratio" },
    ],
    correctAnswer: "b",
  },
  {
    id: generateId("q", 10),
    question: "Which HTTP method is typically used to update existing data?",
    options: [
      { id: "a", text: "GET" },
      { id: "b", text: "POST" },
      { id: "c", text: "PUT" },
      { id: "d", text: "DELETE" },
    ],
    correctAnswer: "c",
  },
];

// Complete Mock Quiz Data
export const mockQuiz: QuizData = {
  id: "quiz_web_dev_101",
  title: "Web Development Fundamentals",
  description: "Test your knowledge of React, JavaScript, CSS, and modern web development concepts.",
  totalQuestions: 30,
  passingScore: 70,
  timeLimit: 30, // 30 minutes
  questions: mockQuizQuestions,
};

// Answer Logging Function - Reusable and clean
export function createAnswerLog(
  questionId: string,
  selectedAnswer: string,
  correctAnswer: string
): AnswerLog {
  return {
    questionId,
    selectedAnswer,
    isCorrect: selectedAnswer === correctAnswer,
  };
}

// Evaluate all answers and return quiz result
export function evaluateQuiz(
  questions: QuizQuestion[],
  answers: Record<string, string>,
  passingScore: number
): QuizResult {
  const answerLogs: AnswerLog[] = [];
  let correctAnswers = 0;
  let incorrectAnswers = 0;

  questions.forEach((question) => {
    const selectedAnswer = answers[question.id] || "";
    const isCorrect = selectedAnswer === question.correctAnswer;

    answerLogs.push({
      questionId: question.id,
      selectedAnswer,
      isCorrect,
    });

    if (isCorrect) {
      correctAnswers++;
    } else if (selectedAnswer) {
      incorrectAnswers++;
    }
  });

  const totalQuestions = questions.length;
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

  return {
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    scorePercentage,
    passed: scorePercentage >= passingScore,
    answerLogs,
  };
}
