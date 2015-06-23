<?php

	include "connection.php"; //Connect to Database

	$data = [];
	$query = mysqli_query($conn, "select id, name, tic_mwp from top_table;");
	WHILE($r = mysqli_fetch_assoc($query)) {
		$data[] = $r;
	};
	print json_encode($data, JSON_NUMERIC_CHECK);
?>
