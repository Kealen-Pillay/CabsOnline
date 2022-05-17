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
    
    $tableCreationQuery = "CREATE TABLE IF NOT EXISTS requests (bookingNo INT(10), customerName VARCHAR(255), phone INTEGER(12), unitNumber INT(10), streetNumber INTEGER(2), streetName VARCHAR(255), suburb VARCHAR(255), destinationSuburb VARCHAR(255), pickupDate DATE, pickupTime TIME, assignmentStatus VARCHAR(255))";
    $result = @mysqli_query($conn, $tableCreationQuery)
            or die("<p>Unable to make query</p>"
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

    // $numRowsQuery = "SELECT COUNT(*)";
    // $result = @mysqli_query($conn, $numRowsQuery)
    // or die("<p>Unable to make query</p>"
    // . "<p>Error code " . mysqli_errno($conn)
    // . ": " . mysqli_error($conn));

    echo "<h3>Thankyou for your booking!</h3>" .
        "<p>Booking Reference Number: ". ($result + 1)."</p>" .
         "<p>Pickup Time: " . $time . "</p>" . 
         "Pickup Date: " . $date . "</p>";
?>