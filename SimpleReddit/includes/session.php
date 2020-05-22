<?php
    session_start();
    if(!isset($_SESSION["logged_in"])) {
        $_SESSION["logged_in"] = false;
        $_SESSION["username"] = "";
        $SESSION["id_user"] = "";
    }
?>