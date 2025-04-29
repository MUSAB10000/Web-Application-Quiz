const params = new URLSearchParams(window.location.search);
const correctAnswers = parseInt(params.get('correct'));
const totalQuestions = parseInt(params.get('total'));
const points = correctAnswers * 20;
const userId = localStorage.getItem('user_id');
const quizName = localStorage.getItem('selectedQuiz');

document.getElementById('scoreDetails').textContent = 
  `You answered ${correctAnswers} out of ${totalQuestions} questions correctly. Your Score: ${points}%`;

// ✅ Fetch quiz ID from backend by name
async function getQuizId(name) {
  const res = await fetch(`../PHP/get_quiz_id.php?quiz_name=${name}`);
  const data = await res.json();
  return data.quiz_id;
}

// ✅ Save result to DB
async function saveResult() {
  try {
    const quizId = await getQuizId(quizName);

    await fetch('../PHP/save_result.php', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quiz_name: localStorage.getItem('selectedQuiz'),
        user_id: userId,
        quiz_id: quizId,
        score: points
      })
    });
  } catch (error) {
    console.error('❌ Error saving result:', error);
  }
}

saveResult();
