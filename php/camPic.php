<?php
	header('content-type: image/png');
	$picture = imagecreatefrompng('/dev/shm/cam.png');
	imagepng($picture);
	imagedestroy($picture);
?>