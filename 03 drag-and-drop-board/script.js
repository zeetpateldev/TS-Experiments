const boardCard = document.querySelectorAll(".board__card");
const boardColumn = document.querySelectorAll(".board__column");

boardCard.forEach((card) => {
  card.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  })
})

boardColumn.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault()
    column.classList.add("over");
  })

  column.addEventListener("dragleave", (e) => {
    e.preventDefault()
    column.classList.remove("over")
  })


  column.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const el = document.getElementById(id);
    column.classList.remove("over")
    if (!el) return;

    column.appendChild(el);
  });

})
