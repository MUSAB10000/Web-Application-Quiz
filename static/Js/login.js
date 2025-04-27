document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('../PHP/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
  });

  const data = await response.json();
  const errorMsg = document.getElementById('errorMsg');

  if (data.status === 'success') {
      errorMsg.style.color = 'green';
      errorMsg.innerText = data.message;
      setTimeout(() => {
          window.location.href = 'quizz.html'; // Redirect to quiz page after 2 sec
      }, 1000);
  } else {
      errorMsg.style.color = 'red';
      errorMsg.innerText = data.message;
  }
});
