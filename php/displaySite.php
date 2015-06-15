<?php

	include "connection.php"; //Connect to Database


	// Get the id of the page
	$id = $_GET['id'];

	$data = [];

	// Put site details together based on $id
	$data['site'] = [];
	$query = mysqli_query($conn,
	"SELECT `name`,
	`id`,
	`latitude`,
	`longitude`,
	`location`,
	`tic_mwp`,
	`dnc_mw`,
	`homes_powered`,
	`carbon_saved_tones`,
	`epc`
	FROM `top_table`
	WHERE `id` = '$id';"
	);
	WHILE($r = mysqli_fetch_assoc($query)) {
		$data['site'][] = $r;
	};

	// Get the epc info.
	$data['epc'] = [];
	$query = mysqli_query($conn, "SELECT top_table.id,
		epc.epcName
		from top_table
		left join epc
		on top_table.epc=epc.epcIndex
		where id = $id;"
		);
	WHILE($r = mysqli_fetch_assoc($query)) {
		$data['epc'][] = $r;
	};

	// Get the admin info.
	$data['admin'] = [];
	$query = mysqli_query($conn, "SELECT id,
		dno,
		mpan_export
		from top_table
		where id = $id;"
		);
	WHILE($r = mysqli_fetch_assoc($query)) {
		$data['admin'][] = $r;
	};

	// Get number of inverters for side $id
	$query = mysqli_query($conn,
		"SELECT COUNT(DISTINCT(`inverter_number`)) AS `number`
		FROM `inverter_site_generation_$id`;"
	);
	WHILE($r = mysqli_fetch_assoc($query)) {
		$numberOfInverter = $r['number'];
	};

	// Get site generation based on $id
	$i = 1;
	while ($i<5) {
		$data['generation']['generation_'.$i] = [];
		// $data['generation']['generation_'.$i]['id'] = $i;
		$query = mysqli_query($conn,
		"SELECT
		UNIX_TIMESTAMP(cast(`date` AS datetime) + cast(`time` as time))*1000 as `timeU`,
		`generation`
		from `inverter_site_generation_$id`
		where `inverter_number` = $i ;"
		);
		WHILE($r = mysqli_fetch_row($query)) {
			$data['generation']['generation_'.$i]['data'][] = $r;
		};
		$i++;
	};

	// Get the export generation info.
	$data['export'] = [];
	$query = mysqli_query($conn, "SELECT
		UNIX_TIMESTAMP(cast(`date` as datetime) + cast(`time` as time))*1000 as `timeU`,
		`generation`
		from  `export_$id`;"
		);
		WHILE($r = mysqli_fetch_row($query)) {
			$data['export']['export']['data'][] = $r;
	};

	// Get last day, last 7 days, last 30 days, all generation.
	$data['summaryGeneration1'] = [];
	$query = mysqli_query($conn, "SELECT sum(generation)/1000 as 1_day_generation
	FROM `export_$id`
	WHERE date >= DATE(NOW()) - INTERVAL 1 DAY ");
	WHILE($r = mysqli_fetch_row($query)) {
		$data['summaryGeneration1'] = $r;
	};

	$data['summaryGeneration7'] = [];
	$query = mysqli_query($conn, "SELECT sum(generation)/1000 as 1_day_generation
	FROM `export_$id`
	WHERE date >= DATE(NOW()) - INTERVAL 7 DAY ");
	WHILE($r = mysqli_fetch_row($query)) {
		$data['summaryGeneration7'] = $r;
	};

	$data['summaryGeneration30'] = [];
	$query = mysqli_query($conn, "SELECT sum(generation)/1000 as 1_day_generation
	FROM `export_$id`
	WHERE date >= DATE(NOW()) - INTERVAL 30 DAY ");
	WHILE($r = mysqli_fetch_row($query)) {
		$data['summaryGeneration30'] = $r;
	};

	$data['summaryGenerationAll'] = [];
	$query = mysqli_query($conn, "SELECT sum(generation)/1000 as 1_day_generation
	FROM `export_$id`");
	WHILE($r = mysqli_fetch_row($query)) {
		$data['summaryGenerationAll'] = $r;
	};


	//
	// $query = mysqli_query($conn,"select
	// 	UNIX_TIMESTAMP(cast(`date` as datetime) + cast(`time` as time))*1000 as `timeU`,
	// 	`generation`, inverter_number
	// 	from `inverter_site_generation_1`
	// 	where `inverter_number` < 480
  //   order by inverter_number, timeU;");
	//
	// WHILE($r = mysqli_fetch_row($query)) {
	// 	// print_r($r);
	// 	$data['generation']['generation_'.$r[2]]['data'][] = array($r[0],$r[1]);
	// };


	print json_encode($data, JSON_NUMERIC_CHECK);
?>
