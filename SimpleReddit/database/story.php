<?php
    function getAllStories() {
        global $dbh;
        $stmt = $dbh->prepare("SELECT * FROM stories ORDER BY published");
        $stmt->execute();
        return $stmt->fetchAll();
    }
    function getStoryById($id_story){
        global $dbh;
        $stmt = $dbh->prepare("SELECT * 
                               FROM stories 
                               JOIN users USING (id_user)
                               WHERE id_story = ?
                               ORDER BY published");
        $stmt->execute(array($id));
        return $stmt->fetch();
    }

    function insertStory($id_story, $id_user, $date, $title, $intro, $text) {
        global $dbh;
        $stmt = $dbh->prepare("INSERT INTO stories VALUES (?,?,?,?,?,?,?);");
        $stmt->execute(array($id_story, $id_user, $date, $title, $intro, $text, 0));
        upvoteStory($id_user, $id_story, 0);
    }

    function hasUpvotedStory($id_user, $id_story) {
        global $dbh;
        $stmt = $dbh->prepare("SELECT * FROM story_upvotes WHERE id_story = $id_story AND id_user = $id_user");
        $stmt->execute();
        return $stmt->fetch() !== false;
    }

    function upvoteStory($id_user, $id_story, $plus) {
        global $dbh;
        if(hasUpvotedStory($id_user, $id_story)){
            $stmt = $dbh->prepare("DELETE FROM story_upvotes WHERE id_story = $id_story AND id_user = $id_user");
            $stmt->execute();
            $stmt = $dbh->prepare("UPDATE stories SET plus = $plus - 1 WHERE id_story = $id_story");
            $stmt->execute();
        } else {
            $stmt = $dbh->prepare("INSERT INTO story_upvotes VALUES ($id_story, $id_user)");
            $stmt->execute();
            $stmt = $dbh->prepare("UPDATE stories SET plus = $plus + 1 WHERE id_story = $id_story");
            $stmt->execute();
        }

        if(hasDownvotedStory($id_user, $id_story)){
            $stmt = $dbh->prepare("DELETE FROM story_downvotes WHERE id_story = $id_story AND id_user = $id_user");
            $stmt->execute();
            $stmt = $dbh->prepare("UPDATE stories SET plus = $plus + 2 WHERE id_story = $id_story");
            $stmt->execute();
        }
    }

    function hasDownvotedStory($id_user, $id_story) {
        global $dbh;
        $stmt = $dbh->prepare("SELECT * FROM story_downvotes WHERE id_story = $id_story AND id_user = $id_user");
        $stmt->execute();
        return $stmt->fetch() !== false;
    }

    function downvoteStory($id_user, $id_story, $plus) {
        global $dbh;
        if(hasDownvotedStory($id_user, $id_story)){
            $stmt = $dbh->prepare("DELETE FROM story_downvotes WHERE id_story = $id_story AND id_user = $id_user");
            $stmt->execute();
            $stmt = $dbh->prepare("UPDATE stories SET plus = $plus + 1 WHERE id_story = $id_story");
            $stmt->execute();
        } else {
            $stmt = $dbh->prepare("INSERT INTO story_downvotes VALUES ($id_story, $id_user)");
            $stmt->execute();
            $stmt = $dbh->prepare("UPDATE stories SET plus = $plus - 1 WHERE id_story = $id_story");
            $stmt->execute();
        }

        if(hasUpvotedStory($id_user, $id_story)){
            $stmt = $dbh->prepare("DELETE FROM story_upvotes WHERE id_story = $id_story AND id_user = $id_user");
            $stmt->execute();
            $stmt = $dbh->prepare("UPDATE stories SET plus = $plus - 2 WHERE id_story = $id_story");
            $stmt->execute();
        }
    }
?>