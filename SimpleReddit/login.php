<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="style/main.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="style/layout.css" />
    
    <!--<script src="main.js"></script>-->
</head>
<body>

    <form action="action_login.php" method="post">
      <label for="username">Username</label><br>
      <input type="text"  name="username">
      <label for="password">Password</label><br>
      <input type="password"  name="password">
      <div>
        <input type="submit" value="Login">
      </div>
      <a href="register.php">Sign up</a>
      <p>
      <a href="index.php">Go back</a>
    </form>
    <!--<script type="text/javascript" src="validation.js"></script>-->
</body>
</html>