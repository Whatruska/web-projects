<?php
  session_start();
  $_SESSION['name'] = $_POST['name'];
  $_SESSION['email'] = $_POST['email'];
  $mess = $_POST['text']."\n";
  $file = fopen('data.txt', a);
  fwrite($file, $mess);
  fclose($file);
  header('Refresh: 1; url=http://localhost:8000/index.php');
 ?>
