<?php
    include_once('database/user.php');
    function getAllComments() {
        global $dbh;
        $stmt = $dbh->prepare("SELECT *
                               FROM comments JOIN
                                    stories USING (id_story)
                               ORDER BY id_comment DESC");
        $stmt->execute();
        return $stmt->fetchAll();
    }
    
    function getAllCommentsByIdStory($id_story) {
        global $dbh;
        $stmt = $dbh->prepare("SELECT *
                               FROM comments 
                               WHERE id_story = ?");
        $stmt->execute();
        return $stmt->fetchAll();
    }

    function getCommentById($id_story, $id_comment) {
        global $dbh;
        $stmt = $dbh->prepare("SELECT *
                               FROM comments JOIN
                                    stories USING (id_story)
                               WHERE id_story = $id_story
                               AND id_comment = $id_comment");
        $stmt->execute(array($id));
        return $stmt->fetch();
    }

    function insertComment($id_comment, $id_story, $id_user, $date, $text) {
        global $dbh;
        $stmt = $dbh->prepare("INSERT INTO comments VALUES (?,?,?,?,?,?);");
        $stmt->execute(array($id_comment, $id_story, $id_user, $date, $text, 0));
        upvote($id_user, $id_comment, $id_story, 0);
    }

    function hasUpvoted($id_user, $id_comment, $id_story) {
        global $dbh;
        $stmt = $dbh->prepare("SELECT * FROM comment_upvotes WHERE id_comment = $id_comment AND id_story = $id_story AND id_user = $id_user");
        $stmt->execute();
        return $stmt->fetch() !== false;
    }

    function upvote($id_user, $id_comment, $id_story, $plus) {
        global $dbh;
        if(hasUpvoted($id_user, $id_comment, $id_story)){
            $stmt = $dbh->prepare("DELETE FROM comment_upvotes WHERE id_comment = $id_comment AND id_story = $id_story AND id_user = $id_user");
            $stmt->execute();
            $stmt = $dbh->prepare("UPDATE comments SET plus = $plus - 1 WHERE id_comment = $id_comment AND id_story = $id_story");
            $stmt->execute();
        } else {
            $stmt = $dbh->prepare("INSERT INTO comment_upvotes VALUES ($id_comment, $id_story, $id_user)");
            $stmt->execute();
            $stmt = $dbh->prepare("UPDATE comments SET plus = $plus + 1 WHERE id_comment = $id_comment AND id_story = $id_story");
            $stmt->execute();
        }

        if(hasDownvoted($id_user, $id_comment, $id_story)){
            $stmt = $dbh->prepare("DELETE FROM comment_downvotes WHERE id_comment = $id_comment AND id_story = $id_story AND id_user = $id_user");
            $stmt->execute();
            $stmt = $dbh->prepare("UPDATE comments SET plus = $plus + 2 WHERE id_comment = $id_comment AND id_story = $id_story");
            $stmt->execute();
        }
    }

    function hasDownvoted($id_user, $id_comment, $id_story) {
        global $dbh;
        $stmt = $dbh->prepare("SELECT * FROM comment_downvotes WHERE id_comment = $id_comment AND id_story = $id_story AND id_user = $id_user");
        $stmt->execute();
        return $stmt->fetch() !== false;
    }

    function downvote($id_user, $id_comment, $id_story, $plus) {
        global $dbh;
        if(hasDownvoted($id_user, $id_comment, $id_story)){
            $stmt = $dbh->prepare("DELETE FROM comment_downvotes WHERE id_comment = $id_comment AND id_story = $id_story AND id_user = $id_user");
            $stmt->execute();
            $stmt = $dbh->prepare("UPDATE comments SET plus = $plus + 1 WHERE id_comment = $id_comment AND id_story = $id_story");
            $stmt->execute();
        } else {
            $stmt = $dbh->prepare("INSERT INTO comment_downvotes VALUES ($id_comment, $id_story, $id_user)");
            $stmt->execute();
            $stmt = $dbh->prepare("UPDATE comments SET plus = $plus - 1 WHERE id_comment = $id_comment AND id_story = $id_story");
            $stmt->execute();
        }

        if(hasUpvoted($id_user, $id_comment, $id_story)){
            $stmt = $dbh->prepare("DELETE FROM comment_upvotes WHERE id_comment = $id_comment AND id_story = $id_story AND id_user = $id_user");
            $stmt->execute();
            $stmt = $dbh->prepare("UPDATE comments SET plus = $plus - 2 WHERE id_comment = $id_comment AND id_story = $id_story");
            $stmt->execute();
        }
    }

?>