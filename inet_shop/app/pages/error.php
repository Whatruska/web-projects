<!DOCTYPE html>
<html lang="en" dir="ltr">
  <?php
    $title = 'Ошибка 404';
    require_once 'blocks/head.php';
   ?>
  <body>
  <?php
    require_once 'blocks/header.php';
   ?>
   <link rel="stylesheet" href="../css/error.css">
   <div class="container content">
     <h1>Опаньки...</h1>
     <p>Что-то пошло не так, <a href="index.php" class="content-link">может, вернетесь на главную?</a></p>
   </div>
   <?php
    require_once 'blocks/footer.php';
    ?>
  </body>
</html>
