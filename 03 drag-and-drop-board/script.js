const boardCards = document.querySelectorAll(".board__card");
const boardLists = document.querySelectorAll(".board__list");
const boardColumns = document.querySelectorAll(".board__column");

let draggedElement = null;

function initializeDragEvents() {
  boardCards.forEach((card) => {
    card.addEventListener("dragstart", handleDragStart);
    card.addEventListener("dragend", handleDragEnd);
  });
}

function handleDragStart(e) {
  draggedElement = e.target;
  e.target.classList.add("dragging");
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", e.target.innerHTML);
}

function handleDragEnd(e) {
  e.target.classList.remove("dragging");

  boardLists.forEach(list => {
    list.classList.remove("over");
  });

  draggedElement = null;
}

boardLists.forEach((list) => {
  list.addEventListener("dragover", handleDragOver);
  list.addEventListener("dragenter", handleDragEnter);
  list.addEventListener("dragleave", handleDragLeave);
  list.addEventListener("drop", handleDrop);
});

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";

  const afterElement = getDragAfterElement(e.currentTarget, e.clientY);
  const draggingCard = document.querySelector(".dragging");

  if (afterElement == null) {
    e.currentTarget.appendChild(draggingCard);
  } else {
    e.currentTarget.insertBefore(draggingCard, afterElement);
  }
}

function handleDragEnter(e) {
  e.preventDefault();
  if (e.target.classList.contains("board__list")) {
    e.target.classList.add("over");
  }
}

function handleDragLeave(e) {
  if (e.target.classList.contains("board__list")) {
    const rect = e.target.getBoundingClientRect();
    if (
      e.clientX <= rect.left ||
      e.clientX >= rect.right ||
      e.clientY <= rect.top ||
      e.clientY >= rect.bottom
    ) {
      e.target.classList.remove("over");
    }
  }
}

function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();

  const list = e.currentTarget;
  list.classList.remove("over");

  if (draggedElement) {
    const afterElement = getDragAfterElement(list, e.clientY);

    if (afterElement == null) {
      list.appendChild(draggedElement);
    } else {
      list.insertBefore(draggedElement, afterElement);
    }
  }
}

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".board__card:not(.dragging)")
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

boardColumns.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    const list = column.querySelector(".board__list");
    if (list && list.children.length === 0) {
      e.preventDefault();
    }
  });
});

initializeDragEvents();
