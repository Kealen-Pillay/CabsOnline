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

function addHandler() {
  document.getElementById("submit").addEventListener("click", false);
}

function validateFields(
  dataSource,
  cname,
  phone,
  unumber,
  snumber,
  stname,
  sbname,
  dsbname,
  date,
  time,
  targetDiv
) {
  if (phone.length < 10 || phone.length > 12) {
    alert("Phone Number Must Be Between 10 - 12 Characters Long!");
  } else {
    postData(
      dataSource,
      cname,
      phone,
      unumber,
      snumber,
      stname,
      sbname,
      dsbname,
      date,
      time,
      targetDiv
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
  cname,
  phone,
  unumber,
  snumber,
  stname,
  sbname,
  dsbname,
  date,
  time,
  targetDiv
) {
  var xhr = createRequest();
  if (xhr) {
    var place = document.getElementById(targetDiv);
    var vars =
      "cname=" +
      cname +
      "&phone=" +
      phone +
      "&unumber=" +
      unumber +
      "&snumber=" +
      snumber +
      "&stname=" +
      stname +
      "&sbname=" +
      sbname +
      "&dsbname=" +
      dsbname +
      "&date=" +
      date +
      "&time=" +
      time;
    xhr.open("POST", dataSource, true); //opens connection between client and server side
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        place.innerHTML = xhr.responseText;
      }
    };
    xhr.send(vars);
  }
}
