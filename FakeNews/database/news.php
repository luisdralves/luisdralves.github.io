<?php
  function getAllNews() {
    global $db;

    $stmt = $db->prepare('SELECT news.*, users.*, COUNT(comments.id) AS comments
                        FROM news JOIN
                            users USING (username) LEFT JOIN
                            comments ON comments.news_id = news.id
                        GROUP BY news.id, users.username
                        ORDER BY published DESC');
    $stmt->execute();
    return $stmt->fetchAll();
  }

  function fetchAuthorName($username) {
    global $db;

    $stmt = $db->prepare('SELECT name FROM users WHERE username = "'.$username.'"');
    $stmt->execute();
    return $stmt->fetchAll()[0][0];
  }

  function getNews($article_id) {
    global $db;

    $stmt = $db->prepare('SELECT * FROM news JOIN users USING (username) WHERE id = ?');
    $stmt->execute(array($article_id));
    return $stmt->fetch();
  }

  function getComments($article_id) {
    global $db;

    $stmt = $db->prepare('SELECT * FROM comments JOIN users USING (username) WHERE news_id = ?');
    $stmt->execute(array($article_id));
    return $stmt->fetch();
  }
?>