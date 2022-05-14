function setDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = String(date.getMonth()+1).padStart(2,'0');
  var day = String(date.getDate()).padStart(2, "0");
  var datePattern = year + '-' + month + '-' + day;
  document.getElementById("date").value = datePattern;
}

