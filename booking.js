/*
 * Student Name: Kealen Pillay
 * Student ID: 19076745
 * Description of file: A javascript file that handles the client side for the booking page. This file is called by the booking.html page to handle the transfer of data from the client-side to the server side when the 'Create Booking' button is clicked, using an XMLHTTPRequest Object.
 */

/**
 * The setDateTime() function is used to set the values of the date and time picker that is displayed in the form on the booking.html page. 
 * This is achieved with the Date() object, which is manipulated to form two form a date variable and time variable that is then assigned to the date and time inputs on the booking.html page.
 * This function is called on load of the booking.html page and after successful submission of the form to reset form input values.
 */
function setDateTime() {
  var date = new Date();
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, "0");
  var day = String(date.getDate()).padStart(2, "0");
  var hours = date.getHours();
  var minutes = String(date.getMinutes()).padStart(2, "0");
  var timePattern = hours + ":" + minutes;
  var datePattern = year + "-" + month + "-" + day;
  document.getElementById("date").value = datePattern;
  document.getElementById("date").setAttribute("min", datePattern);
  document.getElementById("time").value = timePattern;
}

/**
 * The validateFields() function is used to assess if the input entered into the form by the user from the booking.html page, is valid before sending it for processing. 
 * This function calls a helper function 'isNotNull()' to check if the various fields are null values. 
 * This function also checks if the phone number provided by the user is numerical and is between 10-12 characters long.
 * This functions also validates the date and time are valid.
 * Upon successful validation, this function will send the validated fields to the 'postData' function to be sent to the server.
 * @param {*} dataSource represents the destination that the XHR object will send the data to.
 * @param {*} targetDiv represents the id of the HTML element that will display the booking confirmation message.
 * @param {*} cname represents the customer's name.
 * @param {*} phone represents the customer's phone number.
 * @param {*} unumber represents the customer's unit number.
 * @param {*} snumber represents the customer's street number.
 * @param {*} stname  represents the customer's street name.
 * @param {*} sbname represents the customer's suburb.
 * @param {*} dsbname represents the customer's destination suburb.
 * @param {*} date represents the customer's pickup date.
 * @param {*} time represents the customer's pickup time.
 */
function validateFields(
  dataSource,
  targetDiv,
  cname,
  phone,
  unumber,
  snumber,
  stname,
  sbname,
  dsbname,
  date,
  time
) {
  if (isNotNull(cname, phone, snumber, stname, date, time)) {
    var dateObj = new Date();
    var year = dateObj.getFullYear();
    var month = String(dateObj.getMonth() + 1).padStart(2, "0");
    var day = String(dateObj.getDate()).padStart(2, "0");
    var hours = dateObj.getHours();
    var minutes = String(dateObj.getMinutes()).padStart(2, "0");
    var timePattern = hours + ":" + minutes;
    var datePattern = year + "-" + month + "-" + day;
    if (isNaN(phone)) {
      alert("Phone number must consist of numerical characters only!");
    } else {
      if (phone.length < 10 || phone.length > 12) {
        alert("Phone number must be between 10 - 12 characters long!");
      } else if (date < datePattern) {
        alert("Invalid Date! You cannot enter a previous date!");
      } else if (time < timePattern) {
        alert("Invalid Time! You cannot enter a previous time!");
      } else {
        postData(
          dataSource,
          targetDiv,
          cname,
          phone,
          unumber,
          snumber,
          stname,
          sbname,
          dsbname,
          date,
          time
        );
        document.getElementById("cname").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("unumber").value = "";
        document.getElementById("snumber").value = "";
        document.getElementById("stname").value = "";
        document.getElementById("sbname").value = "";
        document.getElementById("dsbname").value = "";
        setDateTime();
      }
    }
  }
}

/**
 * The isNotNull() function is responsible for assessing whether the value of the fields received from the booking.html page are not null values.
 * @param {*} cname represents the customer's name.
 * @param {*} phone represents the customer's phone number.
 * @param {*} snumber represents the customer's street number.
 * @param {*} stname represents the customer's street name.
 * @param {*} date represents the customer's pick up date.
 * @param {*} time represents the customer's pick up time.
 * @returns a boolean value that returns true if all the fields are not-null, otherwise will return false if a field is null and will display the corresponding alert to the user.
 */
function isNotNull(cname, phone, snumber, stname, date, time) {
  if (cname.length == 0) {
    alert("You must provide a customer name!");
    return false;
  } else if (phone.length == 0) {
    alert("You must provide a phone number!");
    return false;
  } else if (snumber.length == 0) {
    alert("You must provide a street number!");
    return false;
  } else if (stname.length == 0) {
    alert("You must provide a street name!");
    return false;
  } else if (date.length == 0) {
    alert("You must provide a pickup date!");
    return false;
  } else if (time.length == 0) {
    alert("You must provide a pickup time!");
    return false;
  } else {
    return true;
  }
}

/**
 * The createRequest() function is responsible for creating the XHR object that will carry the data input by the user and send it to the server.
 * @returns an XHR object.
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
 * The postData() function is responsible for giving the XHR object a request body containing the booking request data provided by the user, and sending it to the server to be inserted into the database.
 * @param {*} dataSource represents the PHP file that will handle the server side processing and database insertion.
 * @param {*} targetDiv represents the id of the HTML div element that will display the booking confirmation message.
 * @param {*} cname represents the customer's name.
 * @param {*} phone represents the customer's phone number.
 * @param {*} unumber represents the customer's unit number.
 * @param {*} snumber represents the customer's street number.
 * @param {*} stname represents the customer's street name.
 * @param {*} sbname represents the customer's suburb.
 * @param {*} dsbname represents the customer's destination suburb.
 * @param {*} date represents the customer's pick up date.
 * @param {*} time represents the customer's pick up time.
 */
function postData(
  dataSource,
  targetDiv,
  cname,
  phone,
  unumber,
  snumber,
  stname,
  sbname,
  dsbname,
  date,
  time
) {
  var xhr = createRequest();
  if (xhr) {
    var place = document.getElementById(targetDiv);
    var requestBody =
      "cname=" +
      encodeURIComponent(cname) +
      "&phone=" +
      encodeURIComponent(phone) +
      "&unumber=" +
      encodeURIComponent(unumber) +
      "&snumber=" +
      encodeURIComponent(snumber) +
      "&stname=" +
      encodeURIComponent(stname) +
      "&sbname=" +
      encodeURIComponent(sbname) +
      "&dsbname=" +
      encodeURIComponent(dsbname) +
      "&date=" +
      encodeURIComponent(date) +
      "&time=" +
      encodeURIComponent(time);
    xhr.open("POST", dataSource, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        place.innerHTML = xhr.responseText;
      }
    };
    xhr.send(requestBody);
  }
}
