<?php
// Database connection
$db = new PDO("mysql:host=localhost;dbname=backroad_kustoms", "username", "password");

// Create users table
$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

$db->exec($sql);

// Insert admin user
$username = "admin";
$password = password_hash("your_secure_password", PASSWORD_DEFAULT);
$email = "admin@backroadkustoms.com";

$stmt = $db->prepare("INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, 'admin')");
$stmt->execute([$username, $password, $email]);

echo "Admin user created successfully!";
?>
