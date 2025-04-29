<?php
require 'db.php';
session_start();

/* Accepts either:
 *   – logged-in session  (preferred)
 *   – user_id posted from JS (fallback, because you store it in localStorage)
 */
$user_id = $_SESSION['user_id'] ?? json_decode(file_get_contents("php://input"), true)['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(['status'=>'error','message'=>'Not authenticated.']);
    exit;
}

try {
    /* ---------- basic info ---------- */
    $stmt = $pdo->prepare("SELECT username, email FROM users WHERE id = :uid");
    $stmt->execute(['uid'=>$user_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(['status'=>'error','message'=>'User not found.']);
        exit;
    }

    /* ---------- quiz history ---------- */
    $histSQL = "
        SELECT q.name AS quiz,
               r.score,
               TO_CHAR(r.created_at, 'YYYY-MM-DD HH24:MI') AS taken_at
        FROM   results r
        JOIN   quizzes q ON q.id = r.quiz_id
        WHERE  r.user_id = :uid
        ORDER  BY r.created_at DESC
    ";
    $histStmt = $pdo->prepare($histSQL);
    $histStmt->execute(['uid'=>$user_id]);
    $history = $histStmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'status'  => 'success',
        'username'=> $user['username'],
        'email'   => $user['email'],
        'history' => $history
    ]);

} catch (PDOException $e) {
    echo json_encode(['status'=>'error','message'=>$e->getMessage()]);
}
?>
