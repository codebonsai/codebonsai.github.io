window.onload = function() {
  var form = document.getElementById("contact-us").getElementsByTagName("form")[0];
  form.onsubmit = formSubmit;
};

function formSubmit(e) {
  e.preventDefault();

  var form = e.target;
  var name = form.elements["contact-us-name"].value;
  var email = form.elements["contact-us-email"].value;
  var message = form.elements["contact-us-message"].value;

  sendMessage(name, email, message);
}

function sendMessage(name, email, message) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://codebonsai.io?name=" + name + "&email=" + email + "&message=" + message);
  xhr.addEventListener("load", function() {
    console.log(xhr.responseText);
  });
  xhr.addEventListener("error", function() {
    console.log("An error occurred while submitting the contact message.");
  });
  
  xhr.send();
}