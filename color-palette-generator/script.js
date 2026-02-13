// Element Target
const generateBtn = document.querySelector("#generate-btn");
const colorBoxes = document.querySelectorAll(".color-box");


generateBtn.addEventListener("click", generatePalette)

function generatePalette() {
  let colors = [];
  for (let i = 0; i < 5; i++) {
    colors.push(generateRandomColor())
  }

  displayPaletteUI(colors)
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

    colorBox.style.background = color;
    hexValue.textContent = color

  })
}

generatePalette()
