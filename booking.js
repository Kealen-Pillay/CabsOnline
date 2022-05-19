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
  document.getElementById("time").value = timePattern;
}

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
  if (phone.length < 10 || phone.length > 12) {
    alert("Phone Number Must Be Between 10 - 12 Characters Long!");
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
  }
}

function createRequest() {
  var xhr = false;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xhr;
}

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
