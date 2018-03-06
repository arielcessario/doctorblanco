<?php
$folder = $_SERVER['DOCUMENT_ROOT'];


//$image_path = '../../images/';
$image_path = '';
$path_6 = '../../../../../../images/';
$path_5 = '../../../../../images/';
$path_4 = '../../../../images/';
$path_3 = '../../../images/';
$path_2 = '../../images/';
$path_1 = '../images/';

if (file_exists($path_6)) {
    $image_path = $path_6;
    debug_to_console($path_6);
}
elseif (file_exists($path_5)) {
    $image_path = $path_5;
    debug_to_console($path_5);
}
elseif (file_exists($path_4)) {
    $image_path = $path_4;
    debug_to_console($path_4);
}
elseif (file_exists($path_3)) {
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


function debug_to_console($data) {
    if(is_array($data) || is_object($data))
    {
        echo("<script>console.log('PHP: ".json_encode($data)."');</script>");
    } else {
        echo("<script>console.log('PHP: ".$data."');</script>");
    }
}



if (isset($_FILES["folder"])) {
    $output_dir = $image_path . $_FILES["folder"];
    echo($output_dir);
} else {
    $output_dir = $image_path;
    echo($output_dir);
}

if (isset($_FILES["images"])) {
    $ret = array();
    global $compression_level;

    $error = $_FILES["images"]["error"];
    //You need to handle  both cases
    //If Any browser does not support serializing of multiple files using FormData()
    if (!is_array($_FILES["images"]["name"])) //single file
    {
        $fileName = $_FILES["images"]["name"];
        move_uploaded_file($_FILES["images"]["tmp_name"], $output_dir . $fileName);
        $ret[] = $fileName;

        $partes = explode('.', $_FILES["images"]["name"]);
        $ext = $partes[count($partes) - 1];

        $comp_name = str_replace("." . $ext, "_thumb." . $ext, $_FILES["images"]["name"]);

        compressImage($image_path . $_FILES["images"]["name"], $image_path . $comp_name, $compression_level);
    } else  //Multiple files, file[]
    {
        $fileCount = count($_FILES["images"]["name"]);
        for ($i = 0; $i < $fileCount; $i++) {
            $fileName = $_FILES["images"]["name"][$i];
            move_uploaded_file($_FILES["images"]["tmp_name"][$i], $output_dir . $fileName);
            $ret[] = $fileName;
        }

    }
    echo json_encode($ret);
}


function compressImage($source_url, $destination_url, $quality)
{
    $info = getimagesize($source_url);

    if ($info['mime'] == 'image/jpeg') $image = imagecreatefromjpeg($source_url);
    elseif ($info['mime'] == 'image/gif') $image = imagecreatefromgif($source_url);
    elseif ($info['mime'] == 'image/png') $image = imagecreatefrompng($source_url);

    //save file
    imagejpeg($image, $destination_url, $quality);

    //return destination file
    return $destination_url;
}