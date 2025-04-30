<?php
require 'db.php';
header('Content-Type: application/json');

// Get quiz name from the request
$quiz_name = $_GET['quiz_name'] ?? '';

try {
    $stmt = $pdo->prepare("
        SELECT id, question_text, choice_a, choice_b, choice_c, choice_d, correct_choice 
        FROM questions 
        WHERE quiz_name = :quiz_name 
        ORDER BY RAND()
        LIMIT 5
    ");
    $stmt->execute(['quiz_name' => $quiz_name]);
    $questions = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['status' => 'success', 'questions' => $questions]);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
