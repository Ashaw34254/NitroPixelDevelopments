<?php
session_start();

$valid_username = "admin"; // Store this securely
$valid_password = "your_hashed_password"; // Use password_hash()

if ($_POST['username'] === $valid_username && 
    password_verify($_POST['password'], $valid_password)) {
    $_SESSION['admin_logged_in'] = true;
    header('Location: dashboard.php');
} else {
    header('Location: login.php?error=1');
}
?>
