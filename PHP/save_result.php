<?php
require 'db.php';
//Used to save a quiz result into the results table. It receives a JSON
$data = json_decode(file_get_contents('php://input'), true);

$user_id = $data['user_id'];
$quiz_id = $data['quiz_id'];
$score = $data['score'];

try {
    $stmt = $pdo->prepare("INSERT INTO results (user_id, quiz_id, score, created_at) VALUES (:user_id, :quiz_id, :score, NOW())");
    $stmt->execute([
        'user_id' => $user_id,
        'quiz_id' => $quiz_id,
        'score' => $score
    ]);
    echo json_encode(['status' => 'success']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
