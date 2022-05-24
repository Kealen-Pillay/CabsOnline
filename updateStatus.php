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
    
     /*----------------- Update Assignment Status ----------------------------- */
     $bookingReferenceNumber = $_POST["bookingReferenceNumber"];
     $newStatus = $_POST["assignmentStatus"];

     $updateQuery = "UPDATE $sql_table SET assignmentStatus='$newStatus' WHERE bookingNo='$bookingReferenceNumber'";
     $result = @mysqli_query($conn, $updateQuery)
        or die("<p>Unable to make query</p>"
        . "<p>Error code " . mysqli_errno($conn)
        . ": " . mysqli_error($conn));

    if(!$result) {
        echo "<p>Something went wrong with ", $updateQuery, "</p>";
    } else {
        echo "<h3 style='color:white;'>Congratulations! Booking request " . $bookingReferenceNumber . "has been assigned!</h3>";
    }
?>