// Ambil elemen-elemen dari DOM
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const filterBtn = document.getElementById("filterBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const taskTableBody = document.getElementById("taskTableBody");

let tasks = [];
let filterActive = false;

// Fungsi untuk menampilkan task pada tabel
function renderTasks() {
  taskTableBody.innerHTML = "";
  
  // Filter jika tombol filter aktif
  let displayedTasks = filterActive ? tasks.filter(t => t.status === "Completed") : tasks;

  if (displayedTasks.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 4;
    cell.className = "no-task";
    cell.textContent = "No task found";
    row.appendChild(cell);
    taskTableBody.appendChild(row);
    return;
  }

  displayedTasks.forEach((task, index) => {
    const row = document.createElement("tr");

    // Task Name
    const taskCell = document.createElement("td");
    taskCell.textContent = task.name;
    row.appendChild(taskCell);

    // Due Date
    const dueDateCell = document.createElement("td");
    dueDateCell.textContent = task.dueDate;
    row.appendChild(dueDateCell);

    // Status
    const statusCell = document.createElement("td");
    statusCell.textContent = task.status;
    if (task.status === "Completed") {
      statusCell.classList.add("status-completed");
    }
    row.appendChild(statusCell);

    // Actions
    const actionCell = document.createElement("td");

    if(task.status !== "Completed"){
      const completeBtn = document.createElement("button");
      completeBtn.textContent = "Complete";
      completeBtn.className = "action-btn";
      completeBtn.addEventListener("click", () => {
        tasks[index].status = "Completed";
        renderTasks();
      });
      actionCell.appendChild(completeBtn);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "action-btn delete";
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks();
    });
    actionCell.appendChild(deleteBtn);

    row.appendChild(actionCell);

    taskTableBody.appendChild(row);
  });
}

// Tambah task baru
addBtn.addEventListener("click", () => {
  const name = taskInput.value.trim();
  const dueDate = dateInput.value;

  if (name === "") {
    alert("Please enter a task.");
    return;
  }
  
  if (dueDate === "") {
    alert("Please select a due date.");
    return;
  }

  tasks.push({ name, dueDate, status: "Pending" });
  taskInput.value = "";
  dateInput.value = "";
  renderTasks();
});

// Filter tombol toggle
filterBtn.addEventListener("click", () => {
  filterActive = !filterActive;
  filterBtn.style.backgroundColor = filterActive ? "#6d8bf6" : "#7b7de7";
  renderTasks();
});

// Hapus semua task
deleteAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    renderTasks();
  }
});

// Tampilkan task awal (kosong)
renderTasks();