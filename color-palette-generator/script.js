// Element Target
const generateBtn = document.querySelector("#generate-btn");

generateBtn.addEventListener("click", generatePalette)

function generatePalette() {
  console.log(generateRandomColor(), "👌");
  const colors = [];

  for (let i = 0; i < 5; i++) {
    colors.push(generateRandomColor)
  }
}

function generateRandomColor() {
  const letters = "0123456789ABCDEF";

  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
    console.log(color)
  }

  return color;

}



generatePalette()
