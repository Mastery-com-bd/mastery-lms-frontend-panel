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
  {
    id: generateId("q", 11),
    question: "What is the purpose of the 'async' keyword in JavaScript?",
    options: [
      { id: "a", text: "To make a function run faster" },
      { id: "b", text: "To declare a function that returns a Promise" },
      { id: "c", text: "To stop a function execution" },
      { id: "d", text: "To create a loop" },
    ],
    correctAnswer: "b",
  },
  {
    id: generateId("q", 12),
    question: "Which React hook is used to access context values?",
    options: [
      { id: "a", text: "useRef" },
      { id: "b", text: "useMemo" },
      { id: "c", text: "useContext" },
      { id: "d", text: "useCallback" },
    ],
    correctAnswer: "c",
  },
  {
    id: generateId("q", 13),
    question: "What is the correct way to create a comment in JavaScript?",
    options: [
      { id: "a", text: "<!-- comment -->" },
      { id: "b", text: "// comment" },
      { id: "c", text: "# comment" },
      { id: "d", text: "** comment **" },
    ],
    correctAnswer: "b",
  },
  {
    id: generateId("q", 14),
    question: "Which property is used to change the background color in CSS?",
    options: [
      { id: "a", text: "color" },
      { id: "b", text: "bg-color" },
      { id: "c", text: "background-color" },
      { id: "d", text: "bgcolor" },
    ],
    correctAnswer: "c",
  },
  {
    id: generateId("q", 15),
    question: "What is the purpose of the 'map' function in JavaScript?",
    options: [
      { id: "a", text: "To filter array elements" },
      { id: "b", text: "To transform each element in an array" },
      { id: "c", text: "To find an element in an array" },
      { id: "d", text: "To sort an array" },
    ],
    correctAnswer: "b",
  },
  {
    id: generateId("q", 16),
    question: "Which operator is used for strict equality in JavaScript?",
    options: [
      { id: "a", text: "==" },
      { id: "b", text: "===" },
      { id: "c", text: "=" },
      { id: "d", text: "!=" },
    ],
    correctAnswer: "b",
  },
  {
    id: generateId("q", 17),
    question: "What does the 'useRef' hook return?",
    options: [
      { id: "a", text: "A function" },
      { id: "b", text: "An array" },
      { id: "c", text: "A mutable ref object" },
      { id: "d", text: "A string" },
    ],
    correctAnswer: "c",
  },
  {
    id: generateId("q", 18),
    question: "Which CSS unit is relative to the font-size of the root element?",
    options: [
      { id: "a", text: "em" },
      { id: "b", text: "px" },
      { id: "c", text: "rem" },
      { id: "d", text: "%" },
    ],
    correctAnswer: "c",
  },
  {
    id: generateId("q", 19),
    question: "What is the purpose of 'e.preventDefault()' in JavaScript?",
    options: [
      { id: "a", text: "To stop event propagation" },
      { id: "b", text: "To prevent the default browser action" },
      { id: "c", text: "To delete an event" },
      { id: "d", text: "To create a new event" },
    ],
    correctAnswer: "b",
  },
  {
    id: generateId("q", 20),
    question: "Which method is used to convert a JSON string to a JavaScript object?",
    options: [
      { id: "a", text: "JSON.stringify()" },
      { id: "b", text: "JSON.parse()" },
      { id: "c", text: "JSON.convert()" },
      { id: "d", text: "JSON.toObject()" },
    ],
    correctAnswer: "b",
  },
  {
    id: generateId("q", 21),
    question: "What is the purpose of React's 'useMemo' hook?",
    options: [
      { id: "a", text: "To store previous state" },
      { id: "b", text: "To memoize expensive computations" },
      { id: "c", text: "To handle events" },
      { id: "d", text: "To manage global state" },
    ],
    correctAnswer: "b",
  },
  {
    id: generateId("q", 22),
    question: "Which CSS property is used to add shadow to text?",
    options: [
      { id: "a", text: "box-shadow" },
      { id: "b", text: "font-shadow" },
      { id: "c", text: "text-shadow" },
      { id: "d", text: "shadow" },
    ],
    correctAnswer: "c",
  },
  {
    id: generateId("q", 23),
    question: "What does the spread operator (...) do in JavaScript?",
    options: [
      { id: "a", text: "Compresses an array" },
      { id: "b", text: "Expands iterable elements" },
      { id: "c", text: "Deletes array elements" },
      { id: "d", text: "Reverses an array" },
    ],
    correctAnswer: "b",
  },
  {
    id: generateId("q", 24),
    question: "Which React hook is used to optimize callback functions?",
    options: [
      { id: "a", text: "useMemo" },
      { id: "b", text: "useCallback" },
      { id: "c", text: "useEffect" },
      { id: "d", text: "useState" },
    ],
    correctAnswer: "b",
  },
  {
    id: generateId("q", 25),
    question: "What is the default position value in CSS?",
    options: [
      { id: "a", text: "relative" },
      { id: "b", text: "absolute" },
      { id: "c", text: "fixed" },
      { id: "d", text: "static" },
    ],
    correctAnswer: "d",
  },
  {
    id: generateId("q", 26),
    question: "Which method removes the last element from an array?",
    options: [
      { id: "a", text: "shift()" },
      { id: "b", text: "unshift()" },
      { id: "c", text: "pop()" },
      { id: "d", text: "push()" },
    ],
    correctAnswer: "c",
  },
  {
    id: generateId("q", 27),
    question: "What is the purpose of 'React.Fragment'?",
    options: [
      { id: "a", text: "To add styling to components" },
      { id: "b", text: "To group elements without adding extra DOM nodes" },
      { id: "c", text: "To handle errors" },
      { id: "d", text: "To manage state" },
    ],
    correctAnswer: "b",
  },
  {
    id: generateId("q", 28),
    question: "Which CSS property controls the stacking order of elements?",
    options: [
      { id: "a", text: "order" },
      { id: "b", text: "z-index" },
      { id: "c", text: "layer" },
      { id: "d", text: "stack" },
    ],
    correctAnswer: "b",
  },
  {
    id: generateId("q", 29),
    question: "What does 'npm' stand for?",
    options: [
      { id: "a", text: "Node Package Manager" },
      { id: "b", text: "New Project Manager" },
      { id: "c", text: "Node Program Manager" },
      { id: "d", text: "Network Package Manager" },
    ],
    correctAnswer: "a",
  },
  {
    id: generateId("q", 30),
    question: "Which lifecycle method is called after a component mounts?",
    options: [
      { id: "a", text: "componentWillMount" },
      { id: "b", text: "componentDidMount" },
      { id: "c", text: "componentWillUpdate" },
      { id: "d", text: "componentDidUpdate" },
    ],
    correctAnswer: "b",
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
