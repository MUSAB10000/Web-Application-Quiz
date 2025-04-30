document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const newUsername = document.getElementById('newUsername').value;
    const newEmail = document.getElementById('newEmail').value;
    const newPassword = document.getElementById('newPassword').value;
    const signupMsg = document.getElementById('signupMsg');

    // ✅ Password length check
    if (newPassword.length < 5) {
        signupMsg.style.color = 'red';
        signupMsg.innerText = 'Password must be at least 5 characters long.';
        return;
    }

    const response = await fetch('../PHP/signup.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newUsername, email: newEmail, password: newPassword })
    });

    const data = await response.json();

    if (data.status === 'success') {
        signupMsg.style.color = 'green';
        signupMsg.innerText = data.message;
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    } else {
        signupMsg.style.color = 'red';
        signupMsg.innerText = data.message;
    }
});
