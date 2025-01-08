const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    correct: 0,
  },
  {
    question: "Which programming language is used for web development?",
    options: ["Python", "Java", "HTML", "C++"],
    correct: 2,
  },
  {
    question: "What is 5 + 3?",
    options: ["5", "8", "10", "15"],
    correct: 1,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: 1,
  },
  {
    question: "The concept of gravity was discovered by which famous physicist?",
    options: ["Albert Einstein", "Galileo Galilei", "Sir Isaac Newton", " Nikola Tesla"],
    correct: 2,
  },
  {
    question: "What is the name of the tallest grass on earth?",
    options: ["Wheat", "Bamboo", "Sugarcane", "Corn"],
    correct: 1,
  },
  {
    question: "Which is the most abundant element in the universe?",
    options: ["Oxygen", "Carbon", "Hydrogen", "Nitrogen"],
    correct: 2,
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Quartz"],
    correct: 2,
  },
  {
    question: "What is the study of mushrooms called?",
    options: ["Botany", "Zoology", "Mycology", "Geology"],
    correct: 2,
  },
  {
    question: "Which freezes faster, hot water or cold water?",
    options: ["Hot water", "Cold water", "They freezes at the same time", "It depends on the container"],
    correct: 0,
  },
  {
    question: "On what continent will you not find bees?",
    options: ["Africa", "Antartica", "Australia", "Asia"],
    correct: 1,
  },
  {
    question: "What is the only rock that floats?",
    options: ["Granite", "Pumice", "Basalt", "Limestone"],
    correct: 1,
  },

];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let timer;
let timeLeft = 10;

const questionElement = document.querySelector(".question");
const optionsContainer = document.querySelector(".options");
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progress");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

function loadQuestion() {
  resetTimer();

  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";
  selectedAnswer = null;

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-outline-primary", "w-100");
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(index, button));
    optionsContainer.appendChild(button);
  });

  toggleNavButtons();
  startTimer();
}

function selectAnswer(index, button) {
  selectedAnswer = index;

  // Highlight the selected button
  const buttons = optionsContainer.querySelectorAll("button");
  buttons.forEach((btn) => btn.classList.remove("btn-primary"));
  button.classList.add("btn-primary");
}

function toggleNavButtons() {
  prevButton.disabled = currentQuestionIndex === 0;
  nextButton.disabled = false;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    progressBar.style.width = `${(timeLeft / 10) * 100}%`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      if (selectedAnswer === null) {
        alert("Time's up! You didn't select an answer.");
      }
      moveToNext();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 10;
  timerElement.textContent = timeLeft;
  progressBar.style.width = "100%";
}

function checkAnswer() {
  if (selectedAnswer === null) {
    alert("Please select an option before proceeding.");
    return false;
  }

  if (selectedAnswer === quizData[currentQuestionIndex].correct) {
    score++;
  }
  return true;
}

function moveToNext() {
  if (!checkAnswer()) return;

  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    endGame();
  }
}

function moveToPrevious() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
}

function endGame() {
  clearInterval(timer);
  const scorePercent = Math.round((score / quizData.length) * 100);
  alert(`🏆 Game Over! \n\nYour Score: ${score}/${quizData.length} (${scorePercent}%)`);
  resetGame();
}

function resetGame() {
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
}

// Event Listeners
prevButton.addEventListener("click", moveToPrevious);
nextButton.addEventListener("click", moveToNext);

// Initialize the quiz
loadQuestion();
