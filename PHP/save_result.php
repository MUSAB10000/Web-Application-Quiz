<?php
require 'db.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

// Debug: show the raw input
file_put_contents('debug_result_log.txt', print_r($data, true));

$user_id  = $data['user_id'] ?? null;
$quiz_id  = $data['quiz_id'] ?? null;
$score    = $data['score']   ?? 0;

if (!$user_id || !$quiz_id) {
    echo json_encode(['status'=>'error','message'=>'Missing user ID or quiz ID']);
    exit;
}

try {
    $stmt = $pdo->prepare(
        "INSERT INTO results (user_id, quiz_id, score, created_at)
         VALUES (:u, :q, :s, NOW())"
    );
    $stmt->execute([
        'u' => $user_id,
        'q' => $quiz_id,
        's' => $score
    ]);

    echo json_encode(['status'=>'success']);
} catch (PDOException $e) {
    echo json_encode(['status'=>'error','message'=>'Insert failed: ' . $e->getMessage()]);
}
