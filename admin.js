function createRequest() {
  var xhr = false;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xhr;
}

function searchBookings(targetDiv, bookingReferenceNumber) {
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

function updateStatus(bookingReferenceNumber, newStatus) {
  var xhr = createRequest();
  

}
