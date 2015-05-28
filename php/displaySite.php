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

// Get the id of the page
$id = $_GET['id'];

$data = [];

// Put site details together based on $id
$data['site'] = [];
$query = mysqli_query($conn,
"SELECT `name`,`latitude`,`longitude`,`location`,`tic_mwp`,`dnc_mw` FROM `top_table` WHERE `id` = '$id';"
);
WHILE($r = mysqli_fetch_assoc($query)) {
	$data['site'][] = $r;
};

// Get site generation based on $id
$data['generation'] = [];
$query = mysqli_query($conn,
// "SELECT `date`,
// `time`,
// sum(`generation`) as `generation_total`
// FROM `inverter_site_generation_$id`
// group by `time`,
// `date`
// order by `date`,
// `time`"
"select `date`, `time`, `generation`, UNIX_TIMESTAMP(cast(`date` as datetime) + cast(`time` as time))*1000 as `timeU` from `inverter_site_generation_1` where `inverter_number` = 1 ;"
);
WHILE($r = mysqli_fetch_assoc($query)) {
	$data['generation'][] = $r;
};




print json_encode($data, JSON_NUMERIC_CHECK);
?>
