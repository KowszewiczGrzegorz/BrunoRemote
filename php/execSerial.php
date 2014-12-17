<?php
	system('echo "' . $_GET["cmd"] .'\n"> /dev/ttyACM0');
	echo $_GET["cmd"];
?>