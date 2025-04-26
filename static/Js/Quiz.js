let currentQuestion = 0;
let timeLeft = 30;
let timerInterval;
let score = 0;

const quizBox = document.querySelector(".quiz-box");
const timerDisplay = document.querySelector(".timer h3");
const questionListItems = document.querySelectorAll(".question-list li");

function renderQuestion(index) {
  const q = questions[index];

  quizBox.querySelector("h2").innerHTML = q.text;

  const optionsDiv = quizBox.querySelector(".options");
  optionsDiv.innerHTML = "";
  q.options.forEach((opt, i) => {
    const letter = String.fromCharCode(65 + i); // A, B, C, D
    const label = document.createElement("label");
    label.classList.add("option-label");
    label.innerHTML = `<input type="radio" name="q" value="${i}"> ${letter}. ${opt}`;
    optionsDiv.appendChild(label);
  });

  questionListItems.forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });

  resetTimer();
}

function highlightCorrect(correctIndex) {
  const allOptions = document.querySelectorAll(".option-label");
  if (allOptions[correctIndex]) {
    allOptions[correctIndex].classList.add("correct");
  }
}

function nextQuestion() {
  const selected = document.querySelector('input[name="q"]:checked');
  if (!selected) {
    alert("Please select an answer.");
    return;
  }

  clearInterval(timerInterval);

  const selectedIndex = parseInt(selected.value);
  const correctIndex = questions[currentQuestion].correct;

  highlightCorrect(correctIndex);

  document.querySelectorAll('input[name="q"]').forEach(input => input.disabled = true);

  // ✅ Add scoring only if correct AND user selected
  if (selectedIndex === correctIndex) {
    score += 1; // base point
    if (timeLeft > 20) score += 2;
    else if (timeLeft > 10) score += 1;
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      renderQuestion(currentQuestion);
    } else {
      showCompletionScreen();
    }
  }, 1500);
}

function autoAnswerAndMove() {
  clearInterval(timerInterval);

  const correctIndex = questions[currentQuestion].correct;
  highlightCorrect(correctIndex);

  document.querySelectorAll('input[name="q"]').forEach(input => input.disabled = true);

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      renderQuestion(currentQuestion);
    } else {
      showCompletionScreen();
    }
  }, 1500);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `00:${timeLeft < 10 ? "0" + timeLeft : timeLeft}`;
    if (timeLeft <= 0) {
      autoAnswerAndMove();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 30;
  timerDisplay.textContent = "00:30";
  startTimer();
}

function showCompletionScreen() {
  quizBox.innerHTML = `
    <h2>🎉 Quiz Completed!</h2>
    <p>Thanks for participating!</p>
    <p><strong>Your Score:</strong> ${score} points</p>
    <button class="retry-btn" onclick="restartQuiz()">Retry Quiz</button>
  `;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;

  quizBox.innerHTML = `
    <h2></h2>
    <div class="options"></div>
    <button class="submit-btn">Submit Answer</button>
  `;

  document.querySelector(".submit-btn").addEventListener("click", nextQuestion);

  questionListItems.forEach((li, i) => {
    li.classList.remove("active");
    if (i === 0) li.classList.add("active");
  });

  renderQuestion(currentQuestion);
}

document.addEventListener("DOMContentLoaded", () => {
  if (quizBox && typeof questions !== 'undefined') {
    renderQuestion(currentQuestion);
    document.querySelector(".submit-btn").addEventListener("click", nextQuestion);
  }
});
