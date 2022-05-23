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
    // $bookingPattern = "/^BRN[0-9]+$/";

    // if(preg_match($bookingPattern,$bookingReferenceNumber)) {
        if(isset($bookingReferenceNumber)) {
            $searchQuery = "SELECT * FROM $sql_table WHERE bookingNo='$bookingReferenceNumber'";
        } else {
            $searchQuery = "SELECT * FROM $sql_table WHERE assignmentStatus='Unassigned' AND pickupTime>'' AND pickupTime<''";
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
                    echo "<tr>";
                    echo "<td style='color:white;'>",$row["bookingNo"],"</td>";
                    echo "<td style='color:white;'>",$row["customerName"],"</td>";
                    echo "<td style='color:white;'>",$row["phone"],"</td>";
                    echo "<td style='color:white;'>",$row["suburb"],"</td>";
                    echo "<td style='color:white;'>",$row["destinationSuburb"],"</td>";
                    echo "<td style='color:white;'>",$row["pickupDate"] . " " . $row["pickupTime"],"</td>";
                    echo "<td style='color:white;'>",$row["assignmentStatus"],"</td>";
                    echo "<td style='color:white;'> Assign Button</td>";
                    echo "</tr>";
                }
                echo "</table>";
            } else {
                echo "<h2 style='color:white;'>Booking Record Does Not Exist!</h2>";
            }
        }
    // }

    
    
?>