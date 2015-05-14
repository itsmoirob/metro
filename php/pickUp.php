<?php
$servername = "localhost";
$username = "root";
$password = "";
// Create connection
$conn = new mysqli($servername, $username, $password, 'dev');
// Check connection
if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}
	
$data = [];
$query = mysqli_query($conn, "select id, name, tic_mwp from top_table;");
WHILE($r = mysqli_fetch_assoc($query)) {
	$data[] = $r;
};
print json_encode($data, JSON_NUMERIC_CHECK);
?>
