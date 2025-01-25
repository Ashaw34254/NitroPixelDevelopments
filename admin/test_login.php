<?php
require_once '../database/Database.php';

// Test credentials
$username = "admin";
$password = "your_password";

// Connect to MongoDB
$db = new MongoDB\Client('mongodb+srv://thegta5gamerpsn:<db_password>@backroad.2w4x1.mongodb.net/?retryWrites=true&w=majority&appName=backroad');
$collection = $db->backroad_kustoms->users;

// Check user exists
$user = $collection->findOne(['username' => $username]);

if ($user) {
    echo "User found!\n";
    echo "Username: " . $user->username . "\n";
    echo "Role: " . $user->role . "\n";
} else {
    echo "No user found. Creating admin user...\n";
    
    // Create admin user
    $result = $collection->insertOne([
        'username' => 'admin',
        'password' => password_hash('your_password', PASSWORD_DEFAULT),
        'role' => 'admin',
        'created_at' => new MongoDB\BSON\UTCDateTime()
    ]);
    
    echo "Admin user created successfully!\n";
}
