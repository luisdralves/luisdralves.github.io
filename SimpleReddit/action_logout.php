<?php
    include_once('includes/init.php');
    include_once('database/user.php');

    $_SESSION["logged_in"] = false;
    $_SESSION["username"] = "";
    $_SESSION["id_user"] = "LOGGEDOUT";
    header ("location: {$_SERVER['HTTP_REFERER']}");
?>