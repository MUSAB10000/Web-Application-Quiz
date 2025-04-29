<?php
require 'db.php';
session_start();
/* how the code works 
It receives JSON data (username and password) from the frontend, 
queries the users table, checks the password using password_verify(), 
 and returns a JSON response that now includes the user ID.
*/
// Get the JSON data from frontend
$data = json_decode(file_get_contents("php://input"), true);

$username = trim($data['username']);
$password = trim($data['password']);

try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password_hash'])) {
        $_SESSION['user_id'] = $user['id']; // ✅ Save user_id in PHP session
        // when login is successful
        echo json_encode([
            'status' => 'success',
            'message' => 'Login successful.',
            'user_id' => $user['id'],      // <-- very important to send user_id
            'username' => $user['username'] // (optional) you can save username too if needed
        ]);
    } else {
        //  when login is not successful
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid username or password.'
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>
