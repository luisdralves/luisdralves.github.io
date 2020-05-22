<?php
    function isLoginCorrect($username, $password) {
        global $dbh;
        $stmt = $dbh->prepare("SELECT * 
                               FROM users 
                               WHERE username = ?
                               ORDER BY id_user");
        $stmt->execute(array($username));
        $userData = $stmt->fetch();
        var_dump($userData);
        if ($userData !== false){
            if(password_verify($password, $userData['password'])){
                return true;
            }
        }
        return false;
    }

    function isUserAlreadyInDB($username) {
        global $dbh;
        $stmt = $dbh->prepare("SELECT *
                               FROM users WHERE username = ?");
        $stmt->execute();
        return $stmt->fetch() !== false;
    }

    function addNewUser($username, $password) {
        global $dbh;

        $hashed_password = makeHash($password);
        $sql = 'INSERT INTO users(username, password) '
                . 'VALUES(:username, :password)';
 
        $stmt = $dbh->prepare($sql);
        
        
        if ($stmt->execute([
            ':username' => $username,
            ':password' => $hashed_password,
        ]) === FALSE){
            return false;
        }else {
            return true;
        }
    }

    function changeUsername($username, $oldUsername) {
        global $dbh;
        $stmt = $dbh->prepare("UPDATE users 
                               SET username = :username
                               WHERE username = :oldUsername");

        if ($stmt->execute([
            ':username' => $username,
            ':oldUsername' => $oldUsername,
        ]) === FALSE){
            return false;
        }else {
            return true;
        }
    }

    function changePassword($username, $password) {
        global $dbh;
        $hashed_password = makeHash($password);

        $stmt = $dbh->prepare("UPDATE users 
                               SET password = :password
                               WHERE username = :username");
        if ($stmt->execute([
            ':username' => $username,
            ':password' => $hashed_password,
        ]) === FALSE){
            return false;
        }else {
            return true;
        }
    }

    function makeHash($password) {
        return password_hash($password, PASSWORD_DEFAULT);
    }

    function getIDUser($username) {
        global $dbh;
        $stmt = $dbh->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->execute(array($username));
        return $stmt->fetch()["id_user"];
    }

    function getUsername($id) {
        global $dbh;
        $stmt = $dbh->prepare("SELECT * FROM users WHERE id_user = ?");
        $stmt->execute(array($id));
        return $stmt->fetch()["username"];
    }

    function getUsers() {
        global $dbh;
        $stmt = $dbh->prepare("SELECT * FROM users");
        $stmt->execute();
        return $stmt->fetchAll();
    }

?>