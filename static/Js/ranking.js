const data = {
    html: [
      { name: 'Musab', score: 95 },
      { name: 'Ali', score: 85 },
      { name: 'Charlie', score: 75 },
    ],
    css: [
      { name: 'David', score: 90 },
      { name: 'Eve', score: 80 },
      { name: 'Frank', score: 70 },
    ],
    javascript: [
      { name: 'Grace', score: 92 },
      { name: 'Heidi', score: 88 },
      { name: 'Ivan', score: 78 },
    ],
    react: [
      { name: 'Judy', score: 89 },
      { name: 'Mallory', score: 84 },
      { name: 'Niaj', score: 76 },
    ]
  };
  
  const quizSelect = document.getElementById('quizSelect');
  const rankingTableBody = document.querySelector('#rankingTable tbody');
  
  function loadTable(quiz) {
    rankingTableBody.innerHTML = ''; // clear table
    const quizData = data[quiz];
    quizData.sort((a, b) => b.score - a.score); // highest score first
    quizData.forEach((entry, index) => {
      const row = `
        <tr>
          <td>${index + 1}</td>
          <td>${entry.name}</td>
          <td>${entry.score}</td>
        </tr>
      `;
      rankingTableBody.innerHTML += row;
    });
  }
  
  quizSelect.addEventListener('change', () => {
    loadTable(quizSelect.value);
  });
  
  // Initial load
  loadTable('html');
  