/*
 * login.js – handles the login form, saves user_id + username
 *            so other pages (profile, save_result) know who is logged-in
 */
document.getElementById('loginForm')
        .addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const res  = await fetch('../PHP/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:   JSON.stringify({ username, password }),
      credentials: 'include'          // ✅ store / receive PHP-session cookie
    });

    const data = await res.json();

    if (data.status === 'success') {

      /* Save identity in localStorage so any page / JS can use it */
      localStorage.setItem('user_id',  data.user_id);
      localStorage.setItem('username', data.username);

      // Go to quiz-selection page
      window.location.href = 'chooseQuiz.html';

    } else {
      document.getElementById('errorMsg').textContent = data.message;
    }

  } catch (err) {
    console.error(err);
    document.getElementById('errorMsg').textContent =
      'An unexpected error occurred. Please try again.';
  }
});
