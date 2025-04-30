<?php
// MySQL database connection settings
$host = 'localhost'; 
$db   = 'quiz';     // must match the schema name you created in MySQL Workbench
$user = 'root';     // or another MySQL username
$pass = 'A0987654321a';  // replace with your MySQL root or user password
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // show detailed errors
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // return rows as associative arrays
    PDO::ATTR_EMULATE_PREPARES   => false,                  // better security and performance
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    die("Could not connect to the MySQL database: " . $e->getMessage());
}
?>
