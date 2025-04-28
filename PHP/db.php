<?php
// deatils of database
$host = 'localhost'; 
$db   = 'Quiz';  
$user = 'postgres';  
$pass = 'A0987654321a';  
$port = "5432"; 

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$db;", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Could not connect to database: " . $e->getMessage());
}
?>
