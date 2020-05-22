<!DOCTYPE html>
<html lang="en">
<?php 
        include_once('database/story.php');
        include_once('database/comment.php');
        include_once('database/connection.php');
        include_once('includes/session.php');
        $_SESSION["redirect"] = basename($_SERVER['REQUEST_URI']);

        $id_user = $_GET['id_user'];
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" media="screen" href="style/layout.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="style/main.css" />

    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?=getUsername($id_user)?></title>
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
        $db = new PDO('sqlite:database/stories_db.db');
        $stmt = $db->prepare("SELECT * 
                               FROM users 
                               WHERE id_user = ?");
        $stmt->execute(array($id_user));
        $story =  $stmt->fetch();

        $stmt = $db->prepare("SELECT *
                               FROM comments 
                               WHERE id_user = $id_user");
        $stmt->execute();
        $comments = $stmt->fetchAll();

        $stmt = $db->prepare("SELECT *
                               FROM stories 
                               WHERE id_user = $id_user");
        $stmt->execute();
        $stories = $stmt->fetchAll();
        ?>
         </div>
         <div class = "box content">
         <?php
        echo '<div class="votes">';

         echo '<h1>' . getUsername($id_user)  . '</h1>';
         
         echo '<section id="comments">';
         ?>
         </div>
         <div class = "box footer">
         <?php
         $karma = 0;
         foreach($comments as $comment){
            ?>
            <div id = "comment">
            <?php
            $karma += $comment["plus"];
           echo '<article class="comment">';
             echo '<span>' . getUsername($comment['id_user']) . '</span>';
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
         }
         foreach( $stories as $story) {
            echo '<div id="comment">';

            $id_story =  $story['id_story'];
            
            echo '<h3>' . "<a href=\"story_item.php?id_story=".$id_story."\">" .  $story['title'] . ', by ' . getUsername($story["id_user"]) . '</a>' . '</h1>';
            echo '<p>' .  $story['brief_intro'] . '</p>';
            $_SESSION["id_story"] = $id_story;
            echo '<div class="votes">';
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
            $karma += $story["plus"];
            echo '</div>';
            echo '</div>';
        } 
         ?>
         
         </div>
        
        <?php echo '</section>';
        
        echo '<p>Total points: ' . $karma . '</p>';
     ?>

    </section>
    </div>
    <?php include_once('includes/footer.php');?>
</body>

</html>