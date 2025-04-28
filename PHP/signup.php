<?php
require 'db.php';
// same as login.php but with save data in database but login check it in database
// Get the JSON data from frontend
$data = json_decode(file_get_contents("php://input"), true);

$username = trim($data['username']);
$email = trim($data['email']);
$password = password_hash($data['password'], PASSWORD_DEFAULT);

try {
    // Check if username or email already exists
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username OR email = :email");
    $stmt->execute(['username' => $username, 'email' => $email]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(['status' => 'error', 'message' => 'Username or email already exists.']);
    } else {
        // Insert new user
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password_hash) VALUES (:username, :email, :password_hash)");
        $stmt->execute([
            'username' => $username,
            'email' => $email,
            'password_hash' => $password
        ]);
        echo json_encode(['status' => 'success', 'message' => 'Account created successfully.']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
