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

function validateFields(
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
  var notNull = false;

  if (cname === "") {
    alert("Please provide the customer name!");
  } else if (phone === "") {
    alert("Please provide the phone number!");
  } else if (snumber === "") {
    alert("please provide the street number!");
  } else if (stname === "") {
    alert("please provide the street name!");
  } else if (date == null) {
    alert("Please provide a pickup date!");
  } else if (time === "") {
    alert("Please provide a pickup time!");
  } else {
    notNull = true;
  }

  if (notNull) {
    if (phoneNumber.length < 10 || phoneNumber.length > 12) {
      alert("Phone Number Must Be Between 10 - 12 Characters Long!");
    } else {
      getData(
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

function getData(
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
    var place = document.getElementById(divID);
    var vars =
      "?cname=" +
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
    xhr.open("POST", "booking.php", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        place.innerHTML = xhr.responseText;
      }
    };
    xhr.send(vars);
  }
}
