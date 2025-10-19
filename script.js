document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const delTaskBtn = document.getElementById("delTaskBtn");
  const taskList = document.getElementById("taskList");

  tasks = JSON.parse(localStorage.getItem("task")) || [];
  tasks.forEach((task) => renderTask(task));

  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText == "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);

    saveTask();
    renderTask(newTask);
    taskInput.value = ""; //clears input
    console.log(tasks);
  });

  delTaskBtn.addEventListener("click", () => {
    taskList.remove(li);
    saveTask();
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
  <span>${task.text}</span>
  <button>Delete</button>`;
    console.log(task.text);

    li.addEventListener("click", (e) => {
      if (e.target.tagName == "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTask();
    });

    li.querySelector("button").addEventListener("click", (e) =>{
        e.stopPropagation()

        tasks = tasks.filter((t) => {t.id !== task.id})
        li.remove()
        saveTask()
    })

    taskList.appendChild(li);
  }

  function saveTask() {
    localStorage.setItem("task", JSON.stringify(tasks));
  }
});
