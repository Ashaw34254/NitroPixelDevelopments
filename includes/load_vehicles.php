<?php
$db = new PDO("mysql:host=localhost;dbname=your_database", "username", "password");
$vehicles = $db->query("SELECT * FROM vehicles ORDER BY created_at DESC LIMIT 4")->fetchAll();

foreach ($vehicles as $vehicle) {
    echo "<div class='vehicle-card'>
            <div class='vehicle-image'>
                <img src='{$vehicle['image_path']}' alt='{$vehicle['title']}' loading='lazy'>
                <!-- Rest of the vehicle card structure -->
            </div>
          </div>";
}
?>
