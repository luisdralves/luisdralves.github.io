<?php
include_once('includes/init.php');
include_once('database/user.php');

if(isLoginCorrect($_SESSION["username"], $_POST['oldPassword'])){
    if(changePassword($_SESSION["username"], $_POST['password'])){
    }
}

header ("location: {$_SESSION["redirect"]}");
?>