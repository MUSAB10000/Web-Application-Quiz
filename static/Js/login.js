document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const response = await fetch('../PHP/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.status === 'success') {
            // ✅ Save user_id in localStorage
            localStorage.setItem('user_id', data.user_id);
            localStorage.setItem('username', data.username); // (optional if you want to show username later)

            window.location.href = 'chooseQuiz.html'; // redirect to main page
        } else {
            document.getElementById('errorMsg').textContent = data.message;
        }
    } catch (error) {
        console.error(error);
        document.getElementById('errorMsg').textContent = "An error occurred during login.";
    }
});
