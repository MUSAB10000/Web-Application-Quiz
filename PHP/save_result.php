<?php
require 'db.php';
session_start();
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$user_id   = $_SESSION['user_id'] ?? null;               // from session
$quiz_name = $data['quiz_name'] ?? '';
$score     = $data['score']     ?? 0;

if (!$user_id || !$quiz_name) {
    echo json_encode(['status'=>'error','message'=>'Missing data']); exit;
}

try {
    /* 1) Get quiz_id from quizzes.name */
    $q = $pdo->prepare("SELECT id FROM quizzes WHERE name = :n LIMIT 1");
    $q->execute(['n'=>$quiz_name]);
    $row = $q->fetch(PDO::FETCH_ASSOC);

    if (!$row) {
        echo json_encode(['status'=>'error','message'=>'Quiz not found']); exit;
    }
    $quiz_id = $row['id'];

    /* 2) Insert the result */
    $ins = $pdo->prepare(
      "INSERT INTO results (user_id, quiz_id, score, created_at)
       VALUES (:u,:q,:s, NOW())"
    );
    $ins->execute([
      'u'=>$user_id,
      'q'=>$quiz_id,
      's'=>$score
    ]);

    echo json_encode(['status'=>'success']);

} catch (PDOException $e) {
    echo json_encode(['status'=>'error','message'=>$e->getMessage()]);
}
?>
