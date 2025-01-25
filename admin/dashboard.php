<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: login.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Vehicle Management</title>
</head>
<body>
    <div class="admin-dashboard">
        <h2>Manage Vehicles</h2>
        
        <!-- Add New Vehicle Form -->
        <form id="addVehicleForm" action="save_vehicle.php" method="POST" enctype="multipart/form-data">
            <input type="text" name="title" placeholder="Vehicle Title">
            <input type="text" name="category" placeholder="Category">
            <input type="file" name="vehicle_image">
            <textarea name="specs" placeholder="Vehicle Specifications"></textarea>
            <button type="submit">Add Vehicle</button>
        </form>

        <!-- Vehicle List -->
        <div class="vehicle-list">
            <!-- PHP code to display existing vehicles -->
            <?php include 'load_vehicles.php'; ?>
        </div>
    </div>
</body>
</html>
