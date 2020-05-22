<?php
    include_once('includes/init.php');

    include_once('database/story.php');
    include_once('database/comment.php');

    $stories = getAllStories();
    $comments = getAllComments();

    //include_once('login.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" media="screen" href="style/layout.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="style/main.css" />

    <title>Simple Reddit</title>
</head>
<body>
<div class="wrapper">
<div class="box header">

<?php include_once('includes/header.php');?>

</div>
<div class="box content">
<section id="list">
    <?php 
        foreach( $stories as $story) {
            $id =  $story['id_story'];
            echo '<h3>' . "<a href=\"story_item.php?id_story=".$id."\">" .  $story['title'] . ', by ' . getUsername($story["id_user"]) . '</a>' . '</h1>';
            echo '<p>' .  $story['brief_intro'] . '</p>';
            $_SESSION["id_story"] = $id;
        } 
        ?>

</div>
<form action="add_story.php" method="post">
            <h2>Add a post</h2>
            <?php 
                $_SESSION["redirect"] = basename($_SERVER['REQUEST_URI']);
                if ($_SESSION["logged_in"]) {?>
            <label>Username: 
                <?php echo $_SESSION["username"]; ?>
            </label>
            <input type="hidden" name="username" value="<?=$_SESSION["username"]?>">
            <label>Title
                <textarea name="title"></textarea>
            </label>
            <label>Intro
                <textarea name="intro"></textarea>
            </label>
            <label>Content
                <textarea name="text"></textarea>
            </label>
            <input type="submit" value="Submit">
            <?php } else {
                ?>
                <div id = "links">
                <?php
                echo '<a href="login.php">Log In</a>';
                echo '<a href="register.php">Register</a>';
                ?>
                </div>
                <?php
            }?>
        </form>
    </section>
    </div>
  <div class="box footer">
<?php include_once('includes/footer.php'); ?>
        </div>
</div>
</body>
</html>

