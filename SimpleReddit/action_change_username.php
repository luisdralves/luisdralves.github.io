<?php
include_once('includes/init.php');
include_once('database/user.php');
$message = "";

if (!isUserAlreadyInDB($_POST['username'])){
    if(changeUsername($_POST['username'], $_SESSION["username"])) {
        $_SESSION["username"] = $_POST['username'];
    }
}
else {
}

header ("location: {$_SESSION["redirect"]}");
?>