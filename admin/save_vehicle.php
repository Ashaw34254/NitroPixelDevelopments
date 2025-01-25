<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    exit('Unauthorized');
}

$db = new PDO("mysql:host=localhost;dbname=your_database", "username", "password");

if ($_FILES['vehicle_image']) {
    $image_path = 'assets/vehicles/' . basename($_FILES['vehicle_image']['name']);
    move_uploaded_file($_FILES['vehicle_image']['tmp_name'], '../' . $image_path);
    
    $stmt = $db->prepare("INSERT INTO vehicles (title, category, image_path, specs) VALUES (?, ?, ?, ?)");
    $stmt->execute([
        $_POST['title'],
        $_POST['category'],
        $image_path,
        $_POST['specs']
    ]);
}

header('Location: dashboard.php');
?>
