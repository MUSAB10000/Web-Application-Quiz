document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const newUsername = document.getElementById('newUsername').value;
    const newEmail = document.getElementById('newEmail').value;
    const newPassword = document.getElementById('newPassword').value;

    const response = await fetch('../PHP/signup.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newUsername, email: newEmail, password: newPassword })
    });

    const data = await response.json();
    const signupMsg = document.getElementById('signupMsg');

    if (data.status === 'success') {
        signupMsg.style.color = 'green';
        signupMsg.innerText = data.message;
        setTimeout(() => {
            window.location.href = 'login.html'; // Redirect to login page after 2 sec
        }, 2000);
    } else {
        signupMsg.style.color = 'red';
        signupMsg.innerText = data.message;
    }
});
