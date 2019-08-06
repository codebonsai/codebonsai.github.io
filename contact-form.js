window.onload = () => {
  const form = document.querySelector("#contact-us form");
  form.onsubmit = formSubmit;
};

function formSubmit(e) {
  e.preventDefault();
  resetNotifications();

  const form = e.target;
  const name = form.elements["contact-us-name"];
  const email = form.elements["contact-us-email"];
  const message = form.elements["contact-us-message"];

  if (fieldsValid([name, email, message])) {
    sendContactMessage(name.value, email.value, message.value);
  }
}

function fieldsValid(fields) {
  for (let f in fields) {
    if (fields[f].value == "") {
      showValidationError(fields[f]);
      return false;
    }
  }

  return true;
}

function showValidationError(field) {
  field.parentElement.querySelector("span").classList.remove("hidden");
}

function sendContactMessage(name, email, message) {
  const form = document.querySelector("#contact-us form");
  const data = {name, email, message};

  disableSubmit();

  fetch(form.action, {
    method: form.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(status)
  .then(showSubmitSuccess)
  .catch(showSubmitError)
  .finally(enableSubmit)
}

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function disableSubmit() {
  const submit = document.querySelector("#contact-us form button");
  submit.disabled = true;
  submit.classList.add("disabled");
}

function enableSubmit() {
  const submit = document.querySelector("#contact-us form button");
  submit.disabled = false;
  submit.classList.remove("disabled");
}

function showSubmitSuccess() {
  document.querySelector("#contact-us .submit .success").classList.remove("hidden");
}

function showSubmitError() {
  document.querySelector("#contact-us .submit .error").classList.remove("hidden");
}

function resetNotifications() {
  document.querySelectorAll("#contact-us .error, #contact-us .success").forEach(element => element.classList.add("hidden"));
}