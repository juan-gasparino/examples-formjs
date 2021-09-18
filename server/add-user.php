<?php
    include('database.php');

    $name = $_POST['name'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $dni = $_POST['dni'];
    $phone = $_POST['phone'];

    if(!empty($name) && !empty($lastName) && !empty($email) && !empty($dni) && !empty($phone))
    {
        $query = "INSERT INTO users (Name,Lastname,Email,DNI,Phone) VALUES ('$name','$lastName','$email','$dni','$phone')";
        $result = mysqli_query($connection,$query);
        if(!$result)
        {
            die('Query Error'. mysqli_error($connection));
        }
        echo "Usuario agregado correctamente";
    }
?>