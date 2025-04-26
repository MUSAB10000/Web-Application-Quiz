document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("newUsername").value;
    const email = document.getElementById("newEmail").value;
    const password = document.getElementById("newPassword").value;
    const msg = document.getElementById("signupMsg");

    msg.style.color = "green";
    msg.textContent = `Account for ${username} created!`;});