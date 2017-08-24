var r = new XMLHttpRequest();
var clockInURL = "https://"
r.open("POST", "/faq/ajax", true);
r.onreadystatechange = function () {
  if (r.readyState != 4 || r.status != 200) return;
  console.log("Success: " + JSON.parse(r.responseText));
  var a = JSON.parse(r.responseText);
  console.log(a.name); //also tried a['name']...
};
r.send("search=banana");