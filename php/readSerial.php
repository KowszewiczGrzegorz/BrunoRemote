<?php
	error_reporting(E_ALL);
	ini_set('display_errors', '1');

	$received = system('cat /dev/ttyACM0 && (sleep 3 ; kill -TERM $!; sleep 1; kill -9 $!');
	system('echo "' . $_GET["cmd"] .'\n"> /dev/ttyACM0');
	echo $received;
?>