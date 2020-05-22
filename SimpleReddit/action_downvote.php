<?php
    include_once('database/comment.php');
    include_once('database/connection.php');
    include_once('includes/session.php');
    //var_dump($_SESSION["id_user"]); echo('<br>');
    //var_dump($_SESSION["comment"]["id_comment"]); echo('<br>');
    //var_dump($_SESSION["comment"]["id_story"]); echo('<br>');
    //var_dump($_SESSION["comment"]["plus"]); echo('<br>');
    downvote($_SESSION["id_user"], $_GET["id_comment"], $_GET["id_story"], $_GET["plus"]);

    header ("location: {$_SESSION["redirect"]}");

?>