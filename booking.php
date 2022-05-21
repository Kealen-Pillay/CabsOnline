<?php
    /*----------------- Database Code ----------------------------- */
    require_once("../../conf/sqlinfo2.inc.php");
            
    $conn = @mysqli_connect($sql_host, $sql_user, $sql_pass)
        or die("Failed to connect to server"
        . "<p>Error code " . mysqli_errno($conn)
        . ": " . mysqli_error($conn));
    
    @mysqli_select_db($conn,$sql_db) 
        or die("Database not available"
        . "<p>Error code " . mysqli_errno($conn)
        . ": " . mysqli_error($conn));
    
    $tableCreationQuery = "CREATE TABLE IF NOT EXISTS requests (bookingNo INT(10) AUTO_INCREMENT PRIMARY KEY, customerName VARCHAR(255), phone INTEGER(12), unitNumber INT(10), streetNumber INTEGER(2), streetName VARCHAR(255), suburb VARCHAR(255), destinationSuburb VARCHAR(255), pickupDate DATE, pickupTime TIME, assignmentStatus VARCHAR(255))";
    $result = @mysqli_query($conn, $tableCreationQuery)
            or die("<p>Unable to create table</p>"
            . "<p>Error code " . mysqli_errno($conn)
            . ": " . mysqli_error($conn));

    /*----------------- Server Handling Code ----------------------------- */
    $cname = $_POST["cname"];
    $phone = $_POST["phone"];
    $unumber = $_POST["unumber"];
    $snumber = $_POST["snumber"];
    $stname = $_POST["stname"];
    $sbname = $_POST["sbname"];
    $dsbname = $_POST["dsbname"];
    $date = $_POST["date"];
    $time = $_POST["time"];
    $assignmentStatus = "unassigned";

    $numRowsQuery = "SELECT bookingNo FROM $sql_table";
    $result = @mysqli_query($conn, $numRowsQuery)
    or die("<p>Unable to retrieve rows</p>"
    . "<p>Error code " . mysqli_errno($conn)
    . ": " . mysqli_error($conn));

    if(!$result) {
        $bookingRef = 0;
    } else {
        $bookingRef = mysqli_num_rows($result);
    }

    $newBookingRef = $bookingRef + 1;

    $insertBookingQuery = "INSERT INTO $sql_table (customerName, phone, unitNumber, streetNumber, streetName, suburb, destinationSuburb, pickupDate, pickupTime, assignmentStatus) VALUES ('$cname', '$phone', '$unumber', '$snumber', '$stname', '$sbname', '$dsbname', '$date', '$time', '$assignmentStatus')";
    $result = @mysqli_query($conn, $insertBookingQuery)
    or die("<p>Unable to insert data</p>"
    . "<p>Error code " . mysqli_errno($conn)
    . ": " . mysqli_error($conn));

    echo "<h3>Thankyou for your booking!</h3>" .
        "<p>Booking Reference Number: ". ($newBookingRef)."</p>" .
         "<p>Pickup Time: " . $time . "</p>" . 
         "Pickup Date: " . $date . "</p>";
?>