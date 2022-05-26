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
