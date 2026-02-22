const USERNAME_REGEX = /^[a-zA-Z0-9_]{4,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;

const registerForm = document.querySelector("#registration-form");

registerForm.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  let fieldsValid = []
  const inputGroups = this.querySelectorAll(".form-group");

  inputGroups.forEach((inputGroup) => {
    const inputField = inputGroup.querySelector("input");
    const messageField = inputGroup.querySelector("small");

    // Clear previous error state
    inputGroup.classList.remove("error");
    messageField.textContent = "";

    if (!inputField.value.trim()) {
      showValidationMessage(inputGroup, messageField, fieldsValid, "Please fill up this field");
      return;
    }


    if (inputField.id === "username" && !inputField.value.match(USERNAME_REGEX)) {
      showValidationMessage(inputGroup, messageField, fieldsValid, "Username must be at least 4 characters long.");
      return;
    }

    if (inputField.id === "email" && !inputField.value.match(EMAIL_REGEX)) {
      showValidationMessage(inputGroup, messageField, fieldsValid, "Please enter valid email.");
      return;
    }

    if ((inputField.id === "password" || inputField.id === "confirmPassword") && !inputField.value.match(PASSWORD_REGEX)) {
      showValidationMessage(inputGroup, messageField, fieldsValid, "Password must be at least 6 characters long and include at least one uppercase letter, one number, and one special character.");
      return;
    }


    if (inputField.id === "confirmPassword") {
      const passwordField = registerForm.querySelector("#password");
      if (inputField.value !== passwordField.value) {
        showValidationMessage(inputGroup, messageField, fieldsValid, "Password not match.");
        return;
      }
      fieldsValid.push(true);
      return;
    }

    fieldsValid.push(true);
  })

  if (fieldsValid.length === inputGroups.length && fieldsValid.every(val => val === true)) {
    const formData = {};
    inputGroups.forEach((inputGroup) => {
      const inputField = inputGroup.querySelector("input");
      formData[inputField.id] = inputField.value;
    });
    console.log("Form submitted successfully:", formData);
    this.reset();
  }
}

function showValidationMessage(inputGroup, messageField, fieldsValid, message) {
  inputGroup.classList.add("error");
  messageField.textContent = message;
  fieldsValid.push(false);
}
