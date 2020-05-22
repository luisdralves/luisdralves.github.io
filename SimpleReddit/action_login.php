<?php
include_once('includes/init.php');
include_once('database/user.php');

  if (isLoginCorrect($_POST['username'], $_POST['password'])) {
    //setCurrentUser($_POST['username']);
    //$_SESSION['success_messages'][] = "Login Successful!";

    $_SESSION["logged_in"] = true;
    $_SESSION["username"] = $_POST['username'];
    $_SESSION["id_user"] = getIDUser($_POST['username']);

  } else {
    //$_SESSION['error_messages'][] = "Login Failed!";
  }
  //var_dump(password_hash($_POST['password'], PASSWORD_DEFAULT));

  //header('Location: ' . $_SERVER['HTTP_REFERER']);
  header ("location: {$_SESSION["redirect"]}");
?>