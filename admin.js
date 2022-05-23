function createRequest() {
  var xhr = false;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xhr;
}

function searchBooking(targetDiv, bookingReferenceNumber) {
  var place = document.getElementById(targetDiv);
  xhr = createRequest();
  if (xhr) {
    var requestBody = "admin.php?bookingNumber=" + bookingReferenceNumber;
    xhr.open("GET", requestBody, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        place.innerHTML = xhr.responseText;
      }
    };
    xhr.send(null);
  }
}
