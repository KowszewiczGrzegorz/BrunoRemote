<?php
        header('Content-type: image/jpeg');
        $picture = ImageCreateFromJPEG('/dev/shm/cam.png');
        imagejpeg($picture);
        system('sudo sh /home/pi/raspiFastCamD/do_caputure.sh');
?>
