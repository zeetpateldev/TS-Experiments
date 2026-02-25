const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const todosList = document.getElementById("todos-list");
const itemsLeft = document.getElementById("items-left");
const clearCompletedBtn = document.getElementById("clear-completed");
const emptyState = document.querySelector(".empty-state");
const dateElement = document.getElementById("date");
const filters = document.querySelectorAll(".filter");


let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentIndex = "all";

addTaskBtn.addEventListener("click", AddTodo);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") AddTodo()
})


function AddTodo() {
  if (!taskInput.value.trim()) return null;

  const todoItem = {
    key: date.now,
    task: taskInput.value,
    completed: false
  }

  todos.push(todoItem);

  saveTodos(todos)
  displayTodos(todos)
  updateItemsCount(todos);

  taskInput.value = "";
}

function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function displayTodos(todos) {

  if (todos.length <= 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  };

  todosList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = `
      <label class="checkbox-container">
        <input type="checkbox" class="todo-checkbox" />
        <span class="checkmark"></span>
      </label>
      <span class="todo-item-text">${todo.task || 'Draft'}</span>
      <button class="delete-btn"><i class="fas fa-times"></i></button>
    `;
    todosList.append(li);
  })
}

function updateItemsCount(todos) {
  const unCompleteTodos = todos.filter((todo) => !todo.completed);
  itemsLeft.textContent = `${unCompleteTodos.length || 0} Items Left`

}

displayTodos(todos)
