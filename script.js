const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

let filter = "all"; // 新增篩選狀態

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter;
    renderTodos();
  });
});

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    if (
      (filter === "active" && todo.done) ||
      (filter === "completed" && !todo.done)
    )
      return; // 篩掉不符的

    const li = document.createElement("li");
    li.className = "todo-item" + (todo.done ? " completed" : "");
    li.innerHTML = `
      <span>${todo.text}</span>
      <div class="todo-actions">
        <button onclick="toggleTodo(${index})">✔️</button>
        <button onclick="deleteTodo(${index})">❌</button>
      </div>
    `;
    todoList.appendChild(li);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
  const text = input.value.trim();
  if (text === "") return;
  todos.push({ text, done: false });
  input.value = "";
  renderTodos();
}

function toggleTodo(index) {
  todos[index].done = !todos[index].done;
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

renderTodos();

// 顯示時間
function updateClock() {
  const clock = document.getElementById("clock");
  const now = new Date();
  clock.textContent = now.toLocaleTimeString("zh-TW", { hour12: false });
}
setInterval(updateClock, 1000);
updateClock();

// 主題切換
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
