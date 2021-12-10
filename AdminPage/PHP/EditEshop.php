<?php
    include 'login.php';
    include 'RestrictedPage.php';

    if($_GET)
    {
        if(isset($_GET['Add']))
        {
            $sql = "INSERT INTO `produkty` (`Name`, `Price`, `Image`, `Description`, `ID`) VALUES ('Product Name', '999', '', 'Product discription', NULL);";
            $result = mysqli_query($conn,  $sql);
            echo '<script type="text/javascript">
                                    window.location = "EditEShop.php"
                                    </script>';
        }
        if(isSet($_GET['Remove']))
        {
            $sql = "DELETE FROM `produkty` WHERE `produkty`.`ID` = '".$_GET["Remove"]."'";
            $result = mysqli_query($conn,  $sql);
            echo '<script type="text/javascript">
                                    window.location = "EditEShop.php"
                                    </script>';
        }
        if(isSet($_GET['Save']))
        {
            $sql = "UPDATE `produkty` SET  `Name` = '".$_GET['Name']."', `Price` = '".$_GET['Price']."', `Description` = '".$_GET['Description']."' WHERE ID = ". $_GET['Save'].";";
            $result = mysqli_query($conn,  $sql);
            echo '<script type="text/javascript">
                                    window.location = "EditEShop.php"
                                    </script>';
        }
    }
    
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/AdminPage/CSS/EditEshop.css">
</head>
<body>
    <form action="EditEShop.php" method="GET">
        <button type="submit" name="Add" value="Add" class="AddButton"><h3 class="PlusText">+</h3></button>
    </form>
    <div id="Menu">
        <?php
            $sql = "SELECT * FROM `produkty`";
            $result = mysqli_query($conn,  $sql);
            $products = mysqli_fetch_all($result, MYSQLI_ASSOC);
            if(isset($products))
            {
               foreach($products as $product)
               {
                    echo '<div class="Item">
                            
                            <form action="EditEShop.php" method="GET">
                            
                            <input id="nazev"class="Name" type="text" name="Name" value="'.$product['Name'].'">
                            <input id="popis"class="Name" type="text" name="Description" value="'.$product['Description'].'">
                            <input id="cena"class="Name" type="text" name="Price" value="'.$product['Price'].'">
                            <div class= "Controls"> 
                                <button class="bt" type="submit" name="Save" value="'. $product['ID'].'">Save</button>
                                <button class="bt remove" type="submit" name="Remove" value="'. $product['ID'] .'">Remove</button>
                            </div>
                            </form>
                        </div>
                        ';
               }

                
            }
            ?>
    </div>
</body>
</html>