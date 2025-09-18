<?php
$host = "localhost:8889";
$user = "root";
$pass = "root";
$db   = "pendidikan";
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

$sql = "SELECT * FROM mahasiswa";
$result = $conn->query($sql);

$mahasiswa = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $mahasiswa[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($mahasiswa);

$conn->close();
?>
