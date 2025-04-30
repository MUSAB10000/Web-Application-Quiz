document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const correctAnswers = parseInt(params.get('correct'));
  const totalQuestions = parseInt(params.get('total'));
  const points = correctAnswers * 20;

  const userId = localStorage.getItem('user_id');
  const quizName = localStorage.getItem('selectedQuiz');

  // Show score on the page
  document.getElementById('scoreDetails').textContent =
    `You answered ${correctAnswers} out of ${totalQuestions} questions correctly. Your Score: ${points}%`;

  // ✅ Step 1: Get quiz_id from quiz name
  async function getQuizIdByName(name) {
    try {
      const res = await fetch(`../PHP/get_quiz_id.php?quiz_name=${encodeURIComponent(name)}`);
      const data = await res.json();

      if (data.status === 'success') {
        return data.quiz_id;
      } else {
        throw new Error(data.message || 'Quiz ID not found');
      }
    } catch (err) {
      console.error('❌ Failed to get quiz ID:', err.message);
      return null;
    }
  }

  // ✅ Step 2: Send result to backend
  async function saveResult() {
    const quizId = await getQuizIdByName(quizName);

    if (!userId || !quizId) {
      console.warn('❌ Missing user ID or quiz ID. Skipping save.');
      return;
    }

    const payload = {
      user_id: userId,
      quiz_id: quizId,
      score: points
    };

    try {
      const res = await fetch('../PHP/save_result.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.status !== 'success') {
        console.warn('⚠️ Failed to save result:', data.message);
      } else {
        console.log('✅ Result saved successfully');
      }

    } catch (error) {
      console.error('❌ Error saving result:', error);
    }
  }

  // 🚀 Call save
  saveResult();
});
