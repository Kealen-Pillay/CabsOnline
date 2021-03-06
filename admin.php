<!---
    * Student Name: Kealen Pillay
    * Student ID: 19076745
    * Description of file: A PHP file that handles the server side of the administration functionality. This file is responsible for retrieving booking request records from the database.
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

    /*----------------- Search Database ----------------------------- */
    $bookingReferenceNumber = $_GET["bookingNumber"];

        if($bookingReferenceNumber != "") {
            $searchQuery = "SELECT bookingNo, customerName, phone, suburb, destinationSuburb, DATE_FORMAT(pickupDate, '%d/%m/%Y') AS date, DATE_FORMAT(pickupTime, '%k:%i') as time, assignmentStatus FROM $sql_table WHERE bookingNo='$bookingReferenceNumber'";
        } else {
            $searchQuery = "SELECT bookingNo, customerName, phone, suburb, destinationSuburb, DATE_FORMAT(pickupDate, '%d/%m/%Y') AS date, DATE_FORMAT(pickupTime, '%k:%i') as time, assignmentStatus FROM $sql_table WHERE assignmentStatus='Unassigned' AND CONCAT(pickupDate, ' ' ,pickupTime) <= DATE_ADD(NOW(), INTERVAL 2 HOUR) AND CONCAT(pickupDate, ' ' ,pickupTime) > NOW()";
        }

        $result = @mysqli_query($conn, $searchQuery)
        or die("<p>Unable to make query</p>"
        . "<p>Error code " . mysqli_errno($conn)
        . ": " . mysqli_error($conn));

        if(!$result) {
            echo "<p>Something went wrong with ", $searchQuery, "</p>";
        } else {
            if(@mysqli_num_rows($result) > 0) {
                echo "<table border=\"1\" style='border-color:#f00a0a;'>";
                echo "<tr>\n"
                ."<th style='color:white;' scope=\"col\">Booking Reference Number</th>\n"
                ."<th style='color:white;' scope=\"col\">Customer Name</th>\n"
                ."<th style='color:white;' scope=\"col\">Phone</th>\n"
                ."<th style='color:white;' scope=\"col\">Pickup Suburb</th>\n"
                ."<th style='color:white;' scope=\"col\">Destination Suburb</th>\n"
                ."<th style='color:white;' scope=\"col\">Pickup Date & Time</th>\n"
                ."<th style='color:white;' scope=\"col\">Status</th>\n"
                ."<th style='color:white;' scope=\"col\">Assign</th>\n"
                ."</tr>\n";
                while($row = mysqli_fetch_assoc($result)) {
                    $bookingNum = $row["bookingNo"];
                    $assignStatus = $bookingNum . "status";
                    $assignButton = $bookingNum . "button";
                    echo "<tr>";
                    echo "<td style='color:white;'>",$row["bookingNo"],"</td>";
                    echo "<td style='color:white;'>",$row["customerName"],"</td>";
                    echo "<td style='color:white;'>",$row["phone"],"</td>";
                    echo "<td style='color:white;'>",$row["suburb"],"</td>";
                    echo "<td style='color:white;'>",$row["destinationSuburb"],"</td>";
                    echo "<td style='color:white;'>",$row["date"] . " " . $row["time"],"</td>";
                    echo "<td style='color:white;' id='$assignStatus'>",$row["assignmentStatus"],"</td>";
                    if($row["assignmentStatus"] == "Assigned") {
                        echo "<td style='color:white;'>
                        <input
                        id='$assignButton'
                        type='button'
                        name='assignButton'
                        value='Assign' 
                        disabled  
                        onClick='updateStatus(\"$bookingNum\", \"$assignStatus\",\"$assignButton\")'
                        />
                        </td>";
                        echo "</tr>";
                    } else {
                        echo "<td style='color:white;'>
                        <input
                        id='$assignButton'
                        type='button'
                        name='assignButton'
                        value='Assign'   
                        onClick='updateStatus(\"$bookingNum\", \"$assignStatus\",\"$assignButton\")'
                        />
                        </td>";
                        echo "</tr>";
                    }
                }
                echo "</table>";
            } else {
                if($bookingReferenceNumber == "") {
                    echo "<h2 style='color:white;'>There are currently no unassigned booking requests within 2 hours of current date and time!</h2>";
                } else {
                    echo "<h2 style='color:white;'>Booking Record Does Not Exist!</h2>";
                }
            }
        }
?>