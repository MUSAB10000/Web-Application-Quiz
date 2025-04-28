const params = new URLSearchParams(window.location.search);
  const correctAnswers = params.get('correct');
  const totalQuestions = params.get('total');
  const points = correctAnswers * 20; // Example: 5 correct = 100 points
  const userId = localStorage.getItem('user_id');

  document.getElementById('scoreDetails').textContent = 
    `You answered ${correctAnswers} out of ${totalQuestions} questions correctly. Your Score: ${points}%`;

  // Send result to database
  async function saveResult() {
    try {
      await fetch('../PHP/save_result.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quiz_id: 1,  // Here quiz_id 1 = HTML quiz
          score: points
        })
      });
    } catch (error) {
      console.error('Error saving result:', error);
    }
  }

  saveResult();