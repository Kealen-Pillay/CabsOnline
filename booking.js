function setDateTime() {
  var date = new Date();
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, "0");
  var day = String(date.getDate()).padStart(2, "0");
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var timePattern = hours + ":" + minutes;
  var datePattern = year + "-" + month + "-" + day;
  document.getElementById("date").value = datePattern;
  document.getElementById("time").value = timePattern;
}

function addHandler() {
  document.getElementById("submit").addEventListener("click", false);
}

function validateFields() {
  var customerName = document.getElementById("cname").value;
  var phoneNumber = document.getElementById("phone").value;
  var streetNumber = document.getElementById("snumber").value;
  var streetName = document.getElementById("stname").value;
  var pickupDate = document.getElementById("date").value;
  var pickupTime = document.getElementById("time").value;
  var notNull = false;

  if (customerName === "") {
    alert("Please provide the customer name!");
  } else if (phoneNumber === "") {
    alert("Please provide the phone number!");
  } else if (streetNumber === "") {
    alert("please provide the street number!");
  } else if (streetName === "") {
    alert("please provide the street name!");
  } else if (pickupDate == null) {
    alert("Please provide a pickup date!");
  } else if (pickupTime === "") {
    alert("Please provide a pickup time!");
  } else {
    notNull = true;
  }

  if (notNull) {
    if (phoneNumber.length < 10 || phoneNumber.length > 12) {
      alert("Phone Number Must Be Between 10 - 12 Characters Long!");
    }
  }
}
