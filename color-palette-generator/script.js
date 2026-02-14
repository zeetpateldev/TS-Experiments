// Element Target
const generateBtn = document.querySelector("#generate-btn");
const colorBoxes = document.querySelectorAll(".color-box");
const copyAllBtn = document.querySelector("#copy-all-btn");

generateBtn.addEventListener("click", generatePalette);

copyAllBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(localStorage.getItem("all-colors"));
  copyAllBtn.querySelector(":scope > span").textContent = "Copied!"
  setTimeout(() => {
    copyAllBtn.querySelector(":scope > span").textContent = "Copy All Colors"
  }, 1000)
})


function generatePalette() {

  let colors = [];

  for (let i = 0; i < 5; i++) {
    colors.push(generateRandomColor())
  }

  displayPaletteUI(colors)
  localStorage.setItem("all-colors", colors.join(" "));

}

function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}


function displayPaletteUI(colors) {
  colorBoxes.forEach((box, index) => {
    const color = colors[index];
    const colorBox = box.querySelector(".color")
    const hexValue = box.querySelector(".hex-value");
    box.addEventListener("click", (e) => {
      copyHexCode(e.currentTarget, color)
    })

    colorBox.style.background = color;
    hexValue.textContent = color
  })
}

function copyHexCode(currentTarget, color) {
  const hexCode = currentTarget.querySelector(".hex-value");
  const copyIcon = currentTarget.querySelector(".copy-btn");
  navigator.clipboard.writeText(hexCode.textContent.trim()).then(() => console.log("Copy to clipboard!")).catch((err) => console.log("Fail to copy " + err));

  hexCode.textContent = "Copied!"
  copyIcon.classList.remove("far", "fa-copy");
  copyIcon.classList.add('fas', 'fa-check');

  setTimeout(() => {
    copyIcon.classList.add("far", "fa-copy");
    copyIcon.classList.remove('fas', 'fa-check');
    hexCode.textContent = color;
  }, 1000)
}

generatePalette()
