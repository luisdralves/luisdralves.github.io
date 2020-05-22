<!DOCTYPE html>
<html lang="en">
<?php 
        include_once('database/story.php');
        include_once('database/comment.php');
        include_once('database/connection.php');
        include_once('includes/session.php');
        $_SESSION["redirect"] = basename($_SERVER['REQUEST_URI']);

        $id_story = $_GET['id_story'];
        
        $db = new PDO('sqlite:database/stories_db.db');
        $stmt = $db->prepare("SELECT * 
                               FROM stories 
                               WHERE id_story = ?
                               ORDER BY published");
        $stmt->execute(array($id_story));
        $story =  $stmt->fetch();
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" media="screen" href="style/layout.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="style/main.css" />

    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?=$story["title"]?></title>
</head>
<body>
<div class="wrapper">
<div class="box header">
    <section id="story">
        <?php
        include_once('includes/header.php');
        
        /*
        echo'<h1>'. $id_story .'</h1>'; 
        */

        $stmt = $db->prepare("SELECT *
                               FROM comments 
                               WHERE id_story = $id_story");
        $stmt->execute();
        $comments = $stmt->fetchAll();
        ?>
        </div>
        <div class = "box content">
        <?php
        echo '<div class="votes">';

        $_SESSION["story"] = $story;
		if($_SESSION["logged_in"]) {
			if(hasUpvotedStory($_SESSION["id_user"], $id_story))
				echo '<a href="action_upvote_story.php">⬆</a>';
			else
				echo '<a href="action_upvote_story.php">⇧</a>';
			echo $story['plus'];
			if(hasDownvotedStory($_SESSION["id_user"], $id_story))
				echo '<a href="action_downvote_story.php">⬇</a>';
			else
				echo '<a href="action_downvote_story.php">⇩</a>';
		} else {
			echo '<a href="login.php">⇧</a>';
			echo $story['plus'];
			echo '<a href="login.php">⇩</a>';
		}

        echo '</div>';

         echo '<h1>' . $story['title']  . ', by <a href="user_page.php?id_user=' . $story["id_user"] . '">' . getUsername($story["id_user"]) . '</a></h1>';
        
         echo '<p>' . $story['brief_intro'] . '</p>';
         echo '<p>'. $story['storie_text'] .'</p>';
         echo '<section id="comments">';
         ?>
         </div>
         <div class = "box footer">
         <?php
         foreach($comments as $comment){
            ?>
            <div id = "comment">
            <?php
           echo '<article class="comment">';
             echo '<span><a href="user_page.php?id_user=' . $comment['id_user'] . '">' . getUsername($comment['id_user']) . '</a></span>';
             echo '<span>' . $comment['published'] . '</span>';
			 
			 if($_SESSION["logged_in"]) {

				echo '<div class="votes"><a href="action_upvote.php';
				echo '?id_comment=' . $comment['id_comment'];
				echo '&id_story=' . $comment['id_story'];
				echo '&plus=' . $comment['plus'];
				
				if (hasUpvoted($_SESSION["id_user"], $comment['id_comment'], $comment['id_story']))
					echo '">⬆</a>';
				else
					echo '">⇧</a>';
	
				echo $comment['plus'];
	
				echo '<a href="action_downvote.php';
				echo '?id_comment=' . $comment['id_comment'];
				echo '&id_story=' . $comment['id_story'];
				echo '&plus=' . $comment['plus'];
	
				if (hasDownvoted($_SESSION["id_user"], $comment['id_comment'], $comment['id_story']))
					echo '">⬇</a></div>';
				else
					echo '">⇩</a></div>';
			 } else {
				echo '<div class="votes"><a href="login.php';
				echo '">⇧</a>';
				echo $comment['plus'];
				echo '<a href="login.php';
				echo '">⇩</a></div>';
			 }

             echo '<p>' . $comment['comment_text'] . '</p>';
           echo '</article>';
           $_SESSION["id_comment"] = $comment['id_comment'];
           ?>
           </div>
           <?php
         }?>
         
         </div>
         
         <form action="add_comment.php" method="post">
            <h2>Add a comment</h2>
            <?php 
                $_SESSION["redirect"] = basename($_SERVER['REQUEST_URI']);
                if ($_SESSION["logged_in"]) {?>
            <label>Username: 
                <?php echo $_SESSION["username"]; ?>
            </label>
            <input type="hidden" name="username" value="<?=$_SESSION["username"]?>">
            <label>Comment
                <textarea name="text"></textarea>
            </label>
            <input type="hidden" name="id" value="<?=$id_story?>">
            <input type="submit" value="Reply">
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
        
        <?php echo '</section>';
     ?>

    </section>
    </div>
    
<?php include_once('includes/footer.php'); ?>
</body>
</html>