<?php
require_once '../database/Database.php';

$db = new Database();

// Add vehicle
$newVehicle = [
    'title' => 'GMC Denali HD',
    'category' => 'Premium Build',
    'image_path' => '/assets/vehicles/denali.png',
    'specs' => [
        'lift_kit' => '12"',
        'wheels' => 'Custom',
        'lighting' => 'LED Package'
    ]
];

$db->addVehicle($newVehicle);

// Get vehicles
$vehicles = $db->getVehicles();
