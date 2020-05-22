<?php
    include_once('database/story.php');
    include_once('database/connection.php');
    include_once('includes/session.php');
    var_dump($_SESSION["id_user"]);
    insertStory($_SESSION["id_story"] + 1, $_SESSION["id_user"], date('Y-m-d H:i:s'), $_POST["title"], $_POST["intro"], $_POST['text']);

    header ("location: {$_SESSION["redirect"]}");

?>