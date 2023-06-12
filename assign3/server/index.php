<?php
    
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");


    include('db.php');


    $user = json_decode( file_get_contents('php://input'), true);

    $name = $user['name'];
    $email = $user['email'];
    $address = $user['address'];
    $DOB = $user['DOB'];
    $phone = $user['phone'];


    $sql = "INSERT INTO user(name, email, address, DOB, phone) VALUES ('$name', '$email', '$address', '$DOB', '$phone')";
    

    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
      } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
      }



?>