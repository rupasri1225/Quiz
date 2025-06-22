const quizData = {
  c: [
    { question: "What is the size of int in C?", options: ["2 Bytes", "4 Bytes", "Depends on compiler", "1 Byte"], answer: 2 },
    { question: "Which loop is guaranteed to run at least once?", options: ["for", "while", "do-while", "foreach"], answer: 2 },
    { question: "Which of the following is a valid C variable name?", options: ["int", "float", "_value", "char*"], answer: 2 },
    { question: "C language is a ____ type language.", options: ["Low-level", "High-level", "Middle-level", "Machine-level"], answer: 2 },
    { question: "Which symbol is used to declare a pointer in C?", options: ["*", "&", "@", "%"], answer: 0 },
    { question: "Which of the following is not a storage class in C?", options: ["auto", "static", "register", "volatile"], answer: 3 },
    { question: "How to declare a constant in C?", options: ["const int x;", "int const x;", "#define x", "All of these"], answer: 3 },
    { question: "What is the default return type of functions in C?", options: ["int", "void", "float", "char"], answer: 0 },
    { question: "What does the 'break' statement do?", options: ["Terminates the loop", "Skips to next iteration", "Returns a value", "None"], answer: 0 },
    { question: "Which operator is used to access value at address?", options: ["&", "*", "->", "%"], answer: 1 }
  ],
  python: [
    { question: "Who developed Python?", options: ["Dennis Ritchie", "Guido van Rossum", "Linus Torvalds", "James Gosling"], answer: 1 },
    { question: "Which keyword is used for function in Python?", options: ["fun", "def", "function", "define"], answer: 1 },
    { question: "What is the output of: print(2 ** 3)?", options: ["6", "9", "8", "5"], answer: 2 },
    { question: "Which data type is immutable?", options: ["list", "set", "dictionary", "tuple"], answer: 3 },
    { question: "Which keyword is used for loop in Python?", options: ["repeat", "loop", "for", "iterate"], answer: 2 },
    { question: "How do you start a comment in Python?", options: ["//", "#", "/*", "--"], answer: 1 },
    { question: "What does len() function do?", options: ["Returns data type", "Returns length", "Returns size", "None"], answer: 1 },
    { question: "Which function is used to get input from user?", options: ["get()", "input()", "scanf()", "read()"], answer: 1 },
    { question: "What is used to define a block of code?", options: ["Braces", "Parentheses", "Indentation", "Quotes"], answer: 2 },
    { question: "Which module is used to work with JSON in Python?", options: ["json", "os", "sys", "pickle"], answer: 0 }
  ],
  java: [
    { question: "Java is ____?", options: ["Interpreted", "Compiled", "Both", "None"], answer: 2 },
    { question: "What is JVM?", options: ["Java Variable Machine", "Java Virtual Machine", "Just Virtual Memory", "None"], answer: 1 },
    { question: "Which keyword is used to inherit a class?", options: ["this", "super", "extends", "implements"], answer: 2 },
    { question: "Which of the following is not a primitive data type?", options: ["int", "float", "boolean", "String"], answer: 3 },
    { question: "What does static mean in Java?", options: ["Cannot be accessed", "Shared among all objects", "Constant", "None"], answer: 1 },
    { question: "Which method is the entry point for Java programs?", options: ["start()", "main()", "run()", "execute()"], answer: 1 },
    { question: "Which access specifier is most permissive?", options: ["private", "protected", "default", "public"], answer: 3 },
    { question: "What is used to handle exceptions?", options: ["try-catch", "error-check", "if-else", "finally-only"], answer: 0 },
    { question: "Which class is parent of all classes?", options: ["Main", "Object", "Class", "Parent"], answer: 1 },
    { question: "Which of the following is not a loop?", options: ["for", "while", "do-while", "switch"], answer: 3 }
  ],
  frontend: [
    { question: "What does CSS stand for?", options: ["Color Style Sheet", "Cascading Style Sheets", "Cool Style Sheets", "Creative Style Script"], answer: 1 },
    { question: "Which is a JavaScript framework?", options: ["React", "Laravel", "Django", "Flask"], answer: 0 },
    { question: "Which tag is used to create a hyperlink?", options: ["<a>", "<link>", "<href>", "<url>"], answer: 0 },
    { question: "Which attribute sets background color?", options: ["bgcolor", "background", "style", "color"], answer: 0 },
    { question: "How to write a comment in HTML?", options: ["/* comment */", "// comment", "<!-- comment -->", "# comment"], answer: 2 },
    { question: "Which CSS property changes text color?", options: ["font-color", "color", "text-color", "bgcolor"], answer: 1 },
    { question: "What does DOM stand for?", options: ["Document Object Model", "Data Object Management", "Digital Ordinance Model", "None"], answer: 0 },
    { question: "Which event is fired on button click in JS?", options: ["onhover", "onclick", "onpress", "onload"], answer: 1 },
    { question: "Which HTML tag is used for images?", options: ["<pic>", "<img>", "<image>", "<src>"], answer: 1 },
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Tool Markup Language", "Hyperlink and Text Markup Language"], answer: 0 }
  ]
};

let selectedCategory = "";
let currentQuiz = [];
let currentQuestion = 0;
let score = 0;
let selectedOption = null;

// DOM Elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const quizEl = document.getElementById("quiz");
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");
const restartBtn = document.getElementById("restart-btn");
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const progressFill = document.getElementById("progress-fill");
const questionCounter = document.getElementById("question-counter");
const scoreCircle = document.getElementById("score-circle");
const scoreDisplay = document.getElementById("score-display");
const performanceMessage = document.getElementById("performance-message");

// Event Listeners
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
  selectedCategory = document.getElementById("category-select").value;
  currentQuiz = [...quizData[selectedCategory]];
  shuffleArray(currentQuiz);
  currentQuestion = 0;
  score = 0;
  startScreen.style.display = "none";
  quizEl.style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  const qData = currentQuiz[currentQuestion];
  questionEl.innerText = qData.question;
  optionsEl.innerHTML = "";
  selectedOption = null;
  nextBtn.disabled = true;
  
  // Update progress
  const progress = ((currentQuestion) / currentQuiz.length) * 100;
  progressFill.style.width = progress + "%";
  questionCounter.innerText = `Question ${currentQuestion + 1} of ${currentQuiz.length}`;

  qData.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.innerText = option;
    li.addEventListener("click", () => selectOption(li, index));
    optionsEl.appendChild(li);
  });
}

function selectOption(li, index) {
  const options = optionsEl.querySelectorAll("li");
  options.forEach(opt => opt.classList.remove("selected"));
  li.classList.add("selected");
  li.classList.add("pulse");
  setTimeout(() => li.classList.remove("pulse"), 300);
  selectedOption = index;
  nextBtn.disabled = false;
}

function nextQuestion() {
  if (selectedOption === currentQuiz[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < currentQuiz.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function restartQuiz() {
  resultEl.style.display = "none";
  startScreen.style.display = "block";
}

function showResult() {
  quizEl.style.display = "none";
  resultEl.style.display = "block";
  scoreEl.innerText = score;
  totalEl.innerText = currentQuiz.length;
  scoreDisplay.innerText = `${score}/${currentQuiz.length}`;
  
  // Calculate percentage and update circle
  const percentage = (score / currentQuiz.length) * 100;
  scoreCircle.style.setProperty('--percentage', percentage + '%');
  
  // Performance message
  let message = "";
  if (percentage >= 90) {
    message = "🏆 Outstanding! You're a coding master!";
  } else if (percentage >= 70) {
    message = "🎯 Great job! You know your stuff!";
  } else if (percentage >= 50) {
    message = "📚 Good effort! Keep learning!";
  } else {
    message = "💪 Don't give up! Practice makes perfect!";
  }
  performanceMessage.innerText = message;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}