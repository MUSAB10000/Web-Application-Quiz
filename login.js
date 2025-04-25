document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("errorMsg");
  
    // Demo check (you can change to PHP backend later)
    if (username === "admin" && password === "1234") {
      alert("Login successful!");
      window.location.href = "dashboard.html"; // redirect if correct
    } else {
      errorMsg.textContent = "Invalid username or password!";
    }
  });
  