<?php
	error_reporting(E_ALL);
	ini_set('display_errors', '1');
	usleep(300000);
	system('echo "' . $_GET["cmd"] .'\n"> /dev/ttyACM0');
	usleep(300000);
	$received = system('cat /dev/ttyACM0 & usleep(300000) ; kill $!');	
	echo "Received: " . $received;
?>