<?php
    include 'database.php';
    include 'login.php';

    if(!$logined)
    {
        if(isset($_POST['submit']))
        {
            if(!isset($_POST['password']) || !isset($_POST['username']))
            {
                die();
            }
            else
            {
                $password = $_POST['password'];
                $username = $_POST['username'];
                $sql = "SELECT `password`, `hash`  FROM `adminlogins` WHERE username = '".$username."'";
                if($sql)
                {
                    $result = mysqli_query($conn, $sql);
                    $logins = mysqli_fetch_all($result, MYSQLI_ASSOC);
                }
                
            }
        }
    }
    
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Testing</title>
</head>
<body>
    <form action="index.php" method="POST">
    <label for="fname">UserName:</label>
    <input type="UserName" id="fname" name="username"><br><br>
    <label for="lname">Password:</label>
    <input type="password" id="Password" name="password"><br><br>
    <input type="submit" name="submit" value="Submit">
    </form>
    <?php
        if(isset($logins))
        {
            if(isset($password))
            {
                if($password == $logins[0]['password'])
                {
                    echo "Password is correct";
                    if(isset($logins[0]))
                    {
                        if($logins[0]['hash'] == "0")
                        {
                            echo "hash has not been set";
                            $passHash = password_hash($password . $username, PASSWORD_DEFAULT);
                            $sqlHash = "UPDATE `adminlogins`  SET hash='".$passHash."' WHERE username = '".$username."'";
                            setcookie("LoginToken", $passHash, time() + 3600 * 168);
                            echo '<script type="text/javascript">
                                    window.location = "localhost/login.php/"
                                    </script>';
                            
                        }
                        else
                        {
                            setcookie("Login", $logins[0]['hash'], time() + 3600 * 168);
                            echo '<script type="text/javascript">
                                    window.location = "/login.php/"
                                    </script>';
                            die();
                        }
                    }
                }
            }
        }

        //echo password_hash($password . $username, PASSWORD_DEFAULT);

    ?>
</body>
</html>