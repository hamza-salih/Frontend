<?php

header('Content-Type: application/json');

$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "mysql";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(array("error" => "Connection failed: " . $conn->connect_error)));
}

$type = isset($_GET['type']) ? $_GET['type'] : '';
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($type == "country") {
    $sql = "SELECT id, name FROM Country";
    $stmt = $conn->prepare($sql);
} elseif ($type == "state" && $id > 0) {
    $sql = "SELECT id, name FROM State WHERE country_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
} elseif ($type == "city" && $id > 0) {
    $sql = "SELECT id, name FROM City WHERE state_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
} else {
    echo json_encode(array("error" => "Invalid request"));
    exit;
}

$stmt->execute();
$result = $stmt->get_result();

$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    $data[] = array("id" => 0, "name" => "No results");
}

$stmt->close();
$conn->close();

echo json_encode($data);
?>
