<?php
    include_once('includes/init.php');
    include_once('database/user.php');

    if (addNewUser($_POST['username'], $_POST['password'])) {
        $_SESSION["logged_in"] = true;
        $_SESSION["username"] = $_POST['username'];
        $_SESSION["id_user"] = getIDUser($_POST['username']);
    } else {
    }
    
    header ("location: {$_SESSION["redirect"]}");
?>