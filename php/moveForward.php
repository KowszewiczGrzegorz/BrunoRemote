<?php
	include "php_serial.class.php";
	
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