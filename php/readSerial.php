<?php
	error_reporting(E_ALL);
	ini_set('display_errors', '1');

	$received = system('cat /dev/ttyACM0 & sleep 2 ; kill $!');
	system('echo "' . $_GET["cmd"] .'\n"> /dev/ttyACM0');
	echo "Received: " . $received;
?>