<?php
$sqlservername = "127.0.0.1";
$sqlusername = "Admin";
$sqlpassword = "Admin";

$res = 's';

$conn = new mysqli($sqlservername, $sqlusername, $sqlpassword, 'dafrakura');

if (!$conn) {
  die("Connection failed: " . $conn->connect_error);
}
?>