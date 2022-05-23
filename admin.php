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
    // $bookingPattern = "/^BRN[0-9]+$/";

    // if(preg_match($bookingPattern,$bookingReferenceNumber)) {
        $searchQuery = "SELECT * FROM $sql_table WHERE bookingNo='$bookingReferenceNumber'";
        $result = @mysqli_query($conn, $searchQuery)
        or die("<p>Unable to make query</p>"
        . "<p>Error code " . mysqli_errno($conn)
        . ": " . mysqli_error($conn));

        if(!$result) {
            echo "<p>Something went wrong with ", $searchQuery, "</p>";
        } else {
            
            if(@mysqli_num_rows($result) > 0) {
                echo "<table border=\"1\">";
                echo "<tr>\n"
                ."<th scope=\"col\">Booking Reference Number</th>\n"
                ."<th scope=\"col\">Customer Name</th>\n"
                ."<th scope=\"col\">Phone</th>\n"
                ."<th scope=\"col\">Pickup Suburb</th>\n"
                ."<th scope=\"col\">Destination Suburb</th>\n"
                ."<th scope=\"col\">Pickup Date & Time</th>\n"
                ."<th scope=\"col\">Status</th>\n"
                ."<th scope=\"col\">Assign</th>\n"
                ."</tr>\n";
                while($row = mysqli_fetch_assoc($result)) {
                    echo "<tr>";
                    echo "<td>",$row["bookingNo"],"</td>";
                    echo "<td>",$row["customerName"],"</td>";
                    echo "<td>",$row["phone"],"</td>";
                    echo "<td>",$row["suburb"],"</td>";
                    echo "<td>",$row["destinationSuburb"],"</td>";
                    echo "<td>",$row["pickupDate"] . " " . $row["pickupTime"],"</td>";
                    echo "<td>",$row["assignmentStatus"],"</td>";
                    echo "<td> Assign Button</td>";
                    echo "</tr>";
                }
                echo "</table>";
            } else {
                //print doesnt exist message
            }
        }

    // }

    
    
?>