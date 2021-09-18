<?php
    include('database.php');

    $email = $_POST['email'];

    if(!empty($email))
    {
        $query = "SELECT * FROM users WHERE Email like '%$email%'";
        $result = mysqli_query($connection,$query);
        if(!$result)
        {
            die('Query Error'. mysqli_error($connection));
        }
        $json = array();
        while($row = mysqli_fetch_array($result))
        {
            $json[] = array(
                'Name' => $row['Name'],
                'Lastname' => $row['Lastname'],
                'Email' => $row['Email'],
                'DNI' => $row['DNI'],
                'Phone' => $row['Phone'],
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
?>