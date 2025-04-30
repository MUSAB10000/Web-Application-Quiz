<?php
require 'db.php';
header('Content-Type: application/json');

$quiz_name = $_GET['quiz_name'] ?? '';

if (!$quiz_name) {
    echo json_encode(['status' => 'error', 'message' => 'Missing quiz name']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id FROM quizzes WHERE name = :quiz_name LIMIT 1");
    $stmt->execute(['quiz_name' => $quiz_name]);
    $quiz = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($quiz) {
        echo json_encode(['status' => 'success', 'quiz_id' => $quiz['id']]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Quiz not found']);
    }

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
