<?php
    include 'AdminPage/PHP/database.php';
    include 'AdminPage/PHP/login.php';
    
    if(isset($_POST['logout']))
    {
        setcookie('Login', null, -1);
        echo '<script type="text/javascript">
                                    window.location = "Admin.php"
                                    </script>';
    }
    

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
    if(isset($logins))
        {
            if(isset($password) && isset($logins[0]))
            {
                if($password == $logins[0]['password'])
                {
                    if(isset($logins[0]))
                    {
                        if($logins[0]['hash'] == "0")
                        {
                            $passHash = password_hash($password . $username, PASSWORD_DEFAULT);
                            $sqlHash = "UPDATE `adminlogins`  SET hash='".$passHash."' WHERE username = '".$username."'";
                            setcookie("LoginToken", $passHash, time() + 3600 * 168);
                            echo '<script type="text/javascript">
                                    window.location = "AdminPage/PHP/AdminEditing.php/"
                                    </script>';
                        }
                        else
                        {
                            setcookie("Login", $logins[0]['hash'], time() + 3600 * 168);
                            echo '<script type="text/javascript">
                                    window.location = "AdminPage/PHP/AdminEditing.php/"
                                    </script>';
                            die();
                        }
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
    <link rel="stylesheet" href="AdminPage/CSS/AdminStyle.css">
    <link rel="stylesheet" href="Main/Css/style.css">
    <title>Admin Login</title>
</head>
<body>
    <div id="navigation">
        <a href="index.html" class="logo"><img src="/Main/Sprites/icom23.png"><a>
            
    </div>

        
        <form action="Admin.php" method="POST">
        

        
        <?php
            if($logined)
            {
                echo "<H1>Loged in</H1>
                <input class='bt' type='submit' name='logout' value='Log Out'>
                <button style='top: 50px; font-size: 10px; width=75px; height: 20px;' class='bt' onclick='window.location.href='/AdminPage/PHP/AdminEditing.php';'>
                Go back
                </button>
                ";
                
            }
            else
            {
                echo "
                    <H1>Admin login</H1>
                    <label for='fname'>UserName:</label>
                    <input type='UserName' id='fname' name='username'><br><br>
                    <label for='lname'>Password:</label>
                    <input type='password' id='Password' name='password'><br><br>
                    <input class='bt' type='submit' name='submit' value='Log in'>";
            }
        ?>
        
        </form>
</body>
</html>