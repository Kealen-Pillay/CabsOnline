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
  var customerName = document.getElementById("cname");
  var phoneNumber = document.getElementById("phone");
  var streetNumber = document.getElementById("stnumnber");
  var streetName = document.getElementById("sname");
  var pickupDate = document.getElementById("date");
  var pickupTime = document.getElementById("time");

  if (
    customerName == null ||
    phoneNumber == null ||
    streetNumber == null ||
    streetName == null ||
    pickupDate == null ||
    pickupTime == null
  ) {
  }
}
