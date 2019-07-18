 <?php
    include_once 'connectToDB.php';

   $name = trim(filter_var($_POST['name'], FILTER_SANITIZE_STRING));
   $surname = trim(filter_var($_POST['surname'], FILTER_SANITIZE_STRING));
   $login = trim(filter_var($_POST['login'], FILTER_SANITIZE_STRING));
   $pass = trim(filter_var($_POST['password'], FILTER_SANITIZE_STRING));
   $email = trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL));

   $error = 'OK';
   if (strlen($login) < 3 || $login == 'Логин') {
     $error = 'INVALID_LOGIN';
   } else if (strlen($pass) <= 4 || $pass == 'Пароль') {
     $error = 'INVALID_PASSWORD';
   } else if (strlen($email) < 3 || $email == 'E-mail') {
     $error = 'INVALID_EMAIL';
   } else if (strlen($name) < 3 || $name == 'Имя') {
     $error = 'INVALID_NAME';
   } else if (strlen($surname) < 3 || $surname == 'Фамилия') {
     $error = 'INVALID_SURNAME';
   }

   if ($error != 'OK') {
     echo $error;
     exit();
   } else {
     $hash = "onfgboibsaodbciyqvo12ube21oenp125npi12nb";
     $pass = md5($pass.$hash);

     $sql = 'INSERT INTO users(name, surname, login, password, email) VALUES(?,?,?,?,?)';
     $query = $pdo->prepare($sql);
     $query->execute([
       $name,
       $surname,
       $login,
       $pass,
       $email
     ]);

     setcookie('log', $login, time() + 3600 * 24 * 7, "/");
     echo $error;
     exit();
   }
  ?>
