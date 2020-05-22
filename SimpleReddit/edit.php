<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Edit</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="style/main.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="style/layout.css" />

    <!--<script src="main.js"></script>-->
</head>
<body>

  <h2>Change username</h2>
    <form action="action_change_username.php" method="post">
      <label for="username">new username:</label><br>
      <input type="text" placeholder="username" name="username">
      <div>
        <input type="submit" value="Change">
      </div>
    </form>

    <h2>Change password</h2>
    <form action="action_change_password.php" method="post">
      <label for="username">Old password</label><br>
      <input type="password" placeholder="password" name="oldPassword">
      <label for="password">New password</label><br>
      <input type="password" placeholder="password" name="password">
      <div>
        <input type="submit" value="Change">
      </div>
      <script type="text/javascript" src="validation.js"></script>

    </form>

    <a href="index.php">Go back</a>

</body>
</html>