<?php
/**
 * Send debug code to the Javascript console
 */
$image_path = '';
$path_3 = '../../../images/';
$path_2 = '../../images/';
$path_1 = '../images/';

if (file_exists($path_3)) {
    $image_path = $path_3;
    debug_to_console($path_3);
}
elseif (file_exists($path_2)) {
    $image_path = $path_2;
    debug_to_console($path_2);
}
elseif (file_exists($path_1)) {
    $image_path = $path_1;
    debug_to_console($path_1);
}
else {
    debug_to_console("Path not found");
}


//debug_to_console("test consola");

function debug_to_console($data) {
    if(is_array($data) || is_object($data))
    {
        echo("<script>console.log('PHP: ".json_encode($data)."');</script>");
    } else {
        echo("<script>console.log('PHP: ".$data."');</script>");
    }
}
?>