<?php
require 'db.php';

if (isset($_FILES['csv_file'])) {
    $file = $_FILES['csv_file']['tmp_name'];

    if (($handle = fopen($file, 'r')) !== FALSE) {
        fgetcsv($handle); // Skip header row

        while (($data = fgetcsv($handle, 1000, ',')) !== FALSE) {
            $quiz_name = $data[0];
            $question_text = $data[1];
            $choice_a = $data[2];
            $choice_b = $data[3];
            $choice_c = $data[4];
            $choice_d = $data[5];
            $correct_choice = strtoupper(trim($data[6]));

            $stmt = $pdo->prepare("INSERT INTO questions (quiz_name, question_text, choice_a, choice_b, choice_c, choice_d, correct_choice)
                                   VALUES (:quiz_name, :question_text, :choice_a, :choice_b, :choice_c, :choice_d, :correct_choice)");
            $stmt->execute([
                'quiz_name' => $quiz_name,
                'question_text' => $question_text,
                'choice_a' => $choice_a,
                'choice_b' => $choice_b,
                'choice_c' => $choice_c,
                'choice_d' => $choice_d,
                'correct_choice' => $correct_choice
            ]);
        }
        fclose($handle);
        echo "✅ Questions uploaded successfully!";
    } else {
        echo "❌ Failed to open uploaded CSV file.";
    }
} else {
    echo "❌ No file uploaded.";
}
?>
