<?php
require 'db.php';

// Get the JSON data from frontend
$data = json_decode(file_get_contents("php://input"), true);

$username = trim($data['username']);
$password = trim($data['password']);

try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password_hash'])) {
        echo json_encode(['status' => 'success', 'message' => 'Login successful.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid username or password.']);
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
