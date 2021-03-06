<!---
    * Student Name: Kealen Pillay
    * Student ID: 19076745
    * Description of file: A PHP file that handles the server side of the booking functionality. This file is reponsible for inserting new booking request records into the database.
    * There are no functions defined in this file.
 --->
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
    
    $tableCreationQuery = "CREATE TABLE IF NOT EXISTS requests (bookingNo VARCHAR(255) NOT NULL, customerName VARCHAR(255) NOT NULL, phone VARCHAR(12) NOT NULL, unitNumber VARCHAR(10), streetNumber INTEGER(2) NOT NULL, streetName VARCHAR(255) NOT NULL, suburb VARCHAR(255), destinationSuburb VARCHAR(255), pickupDate DATE NOT NULL, pickupTime TIME NOT NULL, assignmentStatus VARCHAR(255) NOT NULL)";
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
    $assignmentStatus = "Unassigned";

    /*----------------- Computes Booking Reference Number ----------------------------- */
    $numRowsQuery = "SELECT bookingNo FROM $sql_table";
    $result = @mysqli_query($conn, $numRowsQuery)
    or die("<p>Unable to retrieve rows</p>"
    . "<p>Error code " . mysqli_errno($conn)
    . ": " . mysqli_error($conn));

    $numRows = mysqli_num_rows($result);
    $newBookingRefNum = $numRows + 1;

    if($newBookingRefNum < 10) {
        $bookingRefNum = "BRN0000" . $newBookingRefNum;
    } else if($newBookingRefNum >= 10 || $newBookingRefNum < 100) {
        $bookingRefNum = "BRN000" . $newBookingRefNum;
    } else if($newBookingRefNum >= 100 || $newBookingRefNum < 1000) {
        $bookingRefNum = "BRN00" . $newBookingRefNum;
    } else if($newBookingRefNum >= 1000 || $newBookingRefNum < 10000) {
        $bookingRefNum = "BRN0" . $newBookingRefNum;
    } else {
        $bookingRefNum = "BRN" . $newBookingRefNum;
    }

    /*----------------- Inserts New Booking Into The Database ----------------------------- */
    $insertBookingQuery = "INSERT INTO $sql_table (bookingNo, customerName, phone, unitNumber, streetNumber, streetName, suburb, destinationSuburb, pickupDate, pickupTime, assignmentStatus) VALUES ('$bookingRefNum', '$cname', '$phone', '$unumber', '$snumber', '$stname', '$sbname', '$dsbname', '$date', '$time', '$assignmentStatus')";
    $result = @mysqli_query($conn, $insertBookingQuery)
    or die("<p>Unable to insert data</p>"
    . "<p>Error code " . mysqli_errno($conn)
    . ": " . mysqli_error($conn));

    /*----------------- Format Pickup Date Retrieved From The Database ----------------------------- */
    $retrieveDateQuery = "SELECT DATE_FORMAT(pickupDate, '%d/%m/%Y') AS date FROM $sql_table WHERE bookingNo='$bookingRefNum'";
    $result = @mysqli_query($conn, $retrieveDateQuery)
    or die("<p>Unable to retrieve date</p>"
    . "<p>Error code " . mysqli_errno($conn)
    . ": " . mysqli_error($conn));

    $row = @mysqli_fetch_assoc($result);

    /*----------------- Booking Confirmation Message ----------------------------- */
    echo "<h3 style='color:white;'>Thankyou for your booking!</h3>" .
        "<p style='color:white;'>Booking Reference Number: ". ($bookingRefNum)."</p>" .
        "<p style='color:white;'>Pickup Time: " . $time . "</p>" . 
        "<p style='color:white;'>Pickup Date: " . $row["date"] . "</p>";
?>