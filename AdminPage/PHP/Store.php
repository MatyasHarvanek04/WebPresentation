<?php
    include '../../AdminPage/PHP/database.php';
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/Main/Css/Shop.css">
</head>
<body>
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
                    <div> </div>
                    <h1 id="nazev"class="Name">'.$product['Name'].' </h1>
                    <h1 id="popis"class="Name">'.$product['Description'].'</h1>
                    <h1 id="cena"class="Name">'.$product['Price'].'Kč </h1>
                    
                    </form>
                </div>
                ';
       }
    }
    ?>
    </div>
</body>
</html>