<?php
  session_start();
 ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <?php
      include_once 'header.php';
    ?>
    <form class="" action="session.php" method="post">
      <label for="name">Имя</label>
      <input type="text" name="name" value="">
      <br>
      <label for="email">E-mail</label>
      <input type="text" name="email" value="">
      <br>
      <label for="text">Сообщение</label>
      <textarea name="text" rows="8" cols="80"></textarea>
      <br>
      <button type="submit" name="button">Отправка</button>
    </form>

    <?php
      $name = $_SESSION['name'];
      $email = $_SESSION['email'];
      if ($name != "" && $email != "") {
        echo 'СЕССИЯ Имя :'.$name.'<br>';
        echo 'СЕССИЯ E-mail :'.$email.'<br>';
      } else {
        echo "Введите данные";
      }
      echo file_get_contents('data.txt');
    ?>

    <?php
      include_once 'footer.php';
    ?>
  </body>
</html>
