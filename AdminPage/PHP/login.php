<?php
    $logined = false;
    include 'database.php';
    if(isset($_COOKIE['Login']))
    {
        $sql = "SELECT `username`, `hash`  FROM `adminlogins` WHERE hash = '".$_COOKIE['Login']."'";
        $result = mysqli_query($conn, $sql);
        $logins = mysqli_fetch_all($result, MYSQLI_ASSOC);
        
        if($logins)
        {
            $logined = true;
        }
        
    }
    
?>