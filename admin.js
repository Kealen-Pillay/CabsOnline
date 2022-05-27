/*
 * Student Name: Kealen Pillay
 * Student ID: 19076745
 * Description of file: A javascript file that handles the client side for the administration page. This file is called by admin.html when the search button is clicked.
 */

/**
 * The createRequest() function creates an XHR (XMLHTTPRequest) object that will be used to send the input data received from the admin.html page.
 * @returns an initalized XHR object
 */
function createRequest() {
  var xhr = false;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xhr;
}

/**
 * The searchBookings() function is responsible for receiving the data input from the admin.html page and storing it in the request body of the XHR object.
 * The connection between the client-side and server-side is opened and the XHR object is sent to the server using the GET method to query the database.
 * The HTML page - admin.html will be updated with the response of the request.
 * @param {*} targetDiv represents the id of the HTML div element that will display the returned result.
 * @param {*} bookingReferenceNumber represents the booking reference number that has been searched by the administrator on the admin.html page. This will either contain a valid booking reference number or will contain an empty string.
 */
function searchBookings(targetDiv, bookingReferenceNumber) {
  var regexPattern = new RegExp(/^$|^BRN[0-9]{5}$/);
  if (!bookingReferenceNumber.match(regexPattern)) {
    alert(
      "A booking request search must either be an empty string or match the format: eg:BRN00001"
    );
  } else {
    document.getElementById("confirmationMessage").innerHTML = "";
    var date = new Date();
    var hours = date.getHours();
    var minutes = String(date.getMinutes()).padStart(2, "0");
    var timePattern = hours + ":" + minutes;
    var place = document.getElementById(targetDiv);
    var xhr = createRequest();
    if (xhr) {
      var requestBody =
        "admin.php?bookingNumber=" +
        bookingReferenceNumber +
        "&time=" +
        timePattern;
      xhr.open("GET", requestBody, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          place.innerHTML = xhr.responseText;
        }
      };
      xhr.send(null);
    }
  }
}

/**
 * The updateStatus() function is responsible for providing the XHR object with the booking reference number of the booking request record that will assigned. The XHR object will then be sent to the server so that the server can query the database and update the assignment status of the booking request.
 * This function opens the connection between the client-side and server-side so that the information can be sent via the XHR object using the POST method to the server to process and update the booking request status.
 * The HTML page - admin.html will then be updated with the response of the request.
 * @param {*} bookingReferenceNumber represents the booking request number of the booking request that has been assigned.
 * @param {*} statusMessage represents the id of the status message cell HTML element in the table that is returned by the server.
 * @param {*} assignButton represents the id of the 'assign' button returned in the cell of the table returned from the server.
 */
function updateStatus(bookingReferenceNumber, statusMessage, assignButton) {
  place = document.getElementById("confirmationMessage");
  var xhr = createRequest();
  if (xhr) {
    var requestBody = "bookingReferenceNumber=" + bookingReferenceNumber;
    xhr.open("POST", "updateStatus.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        place.innerHTML = xhr.responseText;
        document.getElementById(assignButton).disabled = true;
        document.getElementById(statusMessage).innerHTML = "Assigned";
      }
    };
  }
  xhr.send(requestBody);
}
