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

    /*----------------- Search Database ----------------------------- */
    $bookingReferenceNumber = $_GET["booking"];
    
?>