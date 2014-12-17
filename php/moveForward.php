<?php
	error_reporting(E_ALL);
	ini_set('display_errors', '1');
	include "PhpSerial.php";
	
	$serial = new phpSerial;
	$serial->deviceSet("/dev/ttyACM0");
	$serial->confBaudRate(115200);
	$serial->confParity("none");
	$serial->confCharacterLength(8);
	$serial->confStopBits(0);
	$serial->deviceOpen();
	$serial->sendMessage("PlaySound 1");	
	$serial->deviceClose();
?>