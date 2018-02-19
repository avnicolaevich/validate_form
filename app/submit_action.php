<?php

    $name = $_POST['userName'];
    $data = array();

    if ($name === ""){
        $data['status'] = 'error';
        $data['text'] = "Username is required!";
    }else{
        $data['status'] = 'Ok';
        $data['text'] = "200 OK";
    }

    header("Content-Type: application/json");
    echo json_encode($data);
    exit;

?>