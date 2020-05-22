<?php
    include_once('includes/init.php');

    include_once('database/story.php');
    include_once('database/comment.php');
    $_SESSION["redirect"] = "index.php";
    echo '<div id = "logo"> <a href="index.php"><img src="style/logo.png" width="55"></a> </div>';
    if ($_SESSION["logged_in"]) {
        ?>
        <div class = "username"><a href="user_page.php?id_user=<?= getIDUser($_SESSION['username']) ?>"><?= $_SESSION['username'] ?></a></div>
        <?php
        echo '<a href="action_logout.php"> Log Out</a>';
        echo '<a href="edit.php">Edit account</a>';
    } else { 
        echo '<a href="login.php"> Log In </a>';
        echo '<a href="register.php">Sign up</a>';
    }
?>