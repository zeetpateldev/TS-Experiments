const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");

const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");

const generateBtn = document.getElementById("generate-btn");
const copyBtn = document.getElementById("copy-btn");

const strengthBar = document.querySelector(".strength-bar");
const strengthLabel = document.getElementById("strength-label");

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()-_=+[]{}|;:,.<>?/";


lengthDisplay.textContent = lengthSlider.value;
generatePassword();

lengthSlider.addEventListener("input", () => {
  lengthDisplay.textContent = lengthSlider.value;
  generatePassword();
});

uppercaseCheckbox.addEventListener("change", generatePassword);
lowercaseCheckbox.addEventListener("change", generatePassword);
numbersCheckbox.addEventListener("change", generatePassword);
symbolsCheckbox.addEventListener("change", generatePassword);

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {
  if (!passwordInput.value) return;
  navigator.clipboard.writeText(passwordInput.value);
});


function generatePassword() {
  const length = Number(lengthSlider.value);

  let charPool = "";

  if (uppercaseCheckbox.checked) charPool += upperChars;
  if (lowercaseCheckbox.checked) charPool += lowerChars;
  if (numbersCheckbox.checked) charPool += numberChars;
  if (symbolsCheckbox.checked) charPool += symbolChars;

  // If nothing selected
  if (charPool === "") {
    passwordInput.value = "";
    strengthBar.style.width = "0%";
    strengthLabel.textContent = "";
    generateBtn.disabled = true;
    return;
  }

  generateBtn.disabled = false;

  let password = "";

  do {
    password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      password += charPool[randomIndex];
    }
  } while (!isValid(password));

  passwordInput.value = password;
  updateStrength(password);
}

// ===============================
// REGEX VALIDATION
// ===============================
function isValid(password) {
  if (uppercaseCheckbox.checked && !/[A-Z]/.test(password)) return false;
  if (lowercaseCheckbox.checked && !/[a-z]/.test(password)) return false;
  if (numbersCheckbox.checked && !/[0-9]/.test(password)) return false;
  if (symbolsCheckbox.checked && !/[!@#$%^&*()\-\_=+\[\]{}|;:,.<>?/]/.test(password)) return false;

  return true;
}

// ===============================
// STRENGTH METER
// ===============================
function updateStrength(password) {
  let score = 0;

  if (password.length >= 8) score += 25;
  if (password.length >= 12) score += 25;

  if (/[A-Z]/.test(password)) score += 15;
  if (/[a-z]/.test(password)) score += 15;
  if (/[0-9]/.test(password)) score += 10;
  if (/[!@#$%^&*()\-\_=+\[\]{}|;:,.<>?/]/.test(password)) score += 10;

  strengthBar.style.width = score + "%";

  if (score < 40) {
    strengthLabel.textContent = "Weak";
  } else if (score < 70) {
    strengthLabel.textContent = "Medium";
  } else {
    strengthLabel.textContent = "Strong";
  }
}
