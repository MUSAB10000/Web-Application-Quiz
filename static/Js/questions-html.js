let questions = [];
let currentQuestion = 0;
let timer;
let timeLeft = 30;
let correctAnswers = 0;

async function loadQuestions() {
  try {
    const response = await fetch('../PHP/get_questions.php?quiz_name=HTML');
    const data = await response.json();

    if (data.status === 'success') {
      questions = data.questions.map(q => ({
        text: q.question_text,
        options: [q.choice_a, q.choice_b, q.choice_c, q.choice_d],
        correct: q.correct_choice.charCodeAt(0) - 'A'.charCodeAt(0)
      }));

      renderQuestion();
      renderQuestionList();
      startTimer();
    } else {
      document.getElementById('questionText').textContent = "Failed to load questions.";
    }
  } catch (error) {
    document.getElementById('questionText').textContent = "Error loading questions.";
    console.error(error);
  }
}

function renderQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('questionText').textContent = q.text;

  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = ''; // Clear previous options

  q.options.forEach((option, index) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'option';
    input.value = index;

    label.appendChild(input);
    label.appendChild(document.createTextNode(` ${String.fromCharCode(65 + index)}. ${option}`));

    optionsContainer.appendChild(label);
  });

  document.getElementById('resultMsg').textContent = "";
  document.getElementById('nextBtn').classList.add('hidden');
  document.getElementById('submitBtn').classList.remove('hidden');
}

function renderQuestionList() {
  const list = document.getElementById('questionList');
  list.innerHTML = "";
  for (let i = 0; i < questions.length; i++) {
    const li = document.createElement('li');
    li.textContent = `Question ${i + 1}`;
    list.appendChild(li);
  }
  updateActiveQuestion();
}

function updateActiveQuestion() {
  const items = document.querySelectorAll('#questionList li');
  items.forEach((li, index) => {
    li.classList.toggle('active', index === currentQuestion);
  });
}

function checkAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an answer.");
    return;
  }

  const selectedIndex = parseInt(selected.value);
  if (selectedIndex === questions[currentQuestion].correct) {
    correctAnswers++;
    document.getElementById('resultMsg').textContent = "✅ Correct!";
    document.getElementById('resultMsg').className = "correct";
  } else {
    document.getElementById('resultMsg').textContent = "❌ Wrong!";
    document.getElementById('resultMsg').className = "wrong";
  }

  const options = document.querySelectorAll('input[name="option"]');
  options.forEach(opt => opt.disabled = true);

  document.getElementById('submitBtn').classList.add('hidden');
  document.getElementById('nextBtn').classList.remove('hidden');
  clearInterval(timer);

  setTimeout(() => {
    nextQuestion();
  }, 2000);
}

function skipQuestion() {
  // No point added
  const options = document.querySelectorAll('input[name="option"]');
  options.forEach(opt => opt.disabled = true);

  document.getElementById('resultMsg').textContent = "⏳ Time's up!";
  document.getElementById('resultMsg').className = "wrong";

  document.getElementById('submitBtn').classList.add('hidden');
  document.getElementById('nextBtn').classList.remove('hidden');

  setTimeout(() => {
    nextQuestion();
  }, 2000);
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
    updateActiveQuestion();
    resetTimer();
  } else {
    alert("Quiz completed!");
    window.location.href = `finalScore.html?correct=${correctAnswers}&total=${questions.length}`;
  }
}

function startTimer() {
  timeLeft = 30;
  document.getElementById('timer').textContent = `00:${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = `00:${timeLeft < 10 ? '0' : ''}${timeLeft}`;
    if (timeLeft === 0) {
      clearInterval(timer);
      skipQuestion(); // Move to next question automatically if time runs out
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  startTimer();
}

document.getElementById('submitBtn').addEventListener('click', checkAnswer);
document.getElementById('nextBtn').addEventListener('click', nextQuestion);

// Initialize the quiz
loadQuestions();
