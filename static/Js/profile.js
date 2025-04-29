/* profile.js – grabs the logged-in user’s profile + quiz history
 *              and injects them into the DOM.
 */

document.addEventListener('DOMContentLoaded', async () => {
    // fail-fast if there is no identity in localStorage
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      window.location.href = 'login.html';
      return;
    }
  
    try {
      const res = await fetch('../PHP/get_profile.php', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body:   JSON.stringify({ user_id: userId }),
        credentials: 'include'      // keep PHP session in sync
      });
  
      const data = await res.json();
      if (data.status !== 'success') throw new Error(data.message);
  
      /* ---------- basic info ---------- */
      const basic = document.getElementById('basicInfo');
      basic.innerHTML = `
          <p><strong>Username:&nbsp;</strong>${data.username}</p>
          <p><strong>E-mail:&nbsp;</strong>${data.email}</p>
      `;
  
      /* ---------- quiz history ---------- */
      const tbody = document.querySelector('#historyTbl tbody');
      if (!data.history.length) {
        tbody.innerHTML = `<tr><td colspan="4">No quizzes taken yet.</td></tr>`;
      } else {
        tbody.innerHTML = data.history.map((row, idx) => `
            <tr>
              <td>${idx + 1}</td>
              <td>${row.quiz}</td>
              <td>${row.score}</td>
              <td>${row.taken_at}</td>
            </tr>`).join('');
      }
  
    } catch (err) {
      alert('Unable to load profile: ' + err.message);
      console.error(err);
    }
  });
  