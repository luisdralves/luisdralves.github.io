<?php
    include_once('database/comment.php');
    include_once('database/connection.php');
    include_once('includes/session.php');
    var_dump($_SESSION["id_user"]);
    insertComment($_SESSION["id_comment"] + 1, $_POST['id'], $_SESSION["id_user"], date('Y-m-d H:i:s'), $_POST['text']);

    header ("location: {$_SESSION["redirect"]}");

?>