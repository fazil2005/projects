let selectedtask = null;

function openPopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "flex"; // Show the popup
  setTimeout(() => {
    document.getElementById("title").focus(); // Focus on the title input field in the popup
  }, 0);
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function openDeletePopup(item) {
  selectedtask = item.id;
  document.getElementById("deleteConfirmation").style.display = "flex";
}

function closeDeletePopup() {
  document.getElementById("deleteConfirmation").style.display = "none";
  selectedtask = null; // Reset selected task ID
}

function confirmDelete() {
  deleteTask(selectedtask);
  closeDeletePopup();
}

function cancelDelete() {
  closeDeletePopup();
}

function openClearConfirmationPopup() {
  document.getElementById('clearConfirmation').style.display = 'block';
}

function closeClearConfirmationPopup() {
  document.getElementById('clearConfirmation').style.display = 'none';
}

function saveData() {
  // Get values from the form fields
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const priority = document.getElementById("priority").value;

  // Check if the required fields are filled out
  if (!title || !date || !priority) {
    alert("Please fill out all fields.");
    return;
  }

  // Create a new task item
  const listItem = document.createElement("li");
  const priortystyles = getPriorityColor(priority);
  listItem.style.backgroundColor = priortystyles.backgroundColor;
  listItem.style.color = priortystyles.color;

  const leftspan = document.createElement("span");
  leftspan.classList.add("title");
  leftspan.textContent = title;

  const rightspan = document.createElement("span");
  rightspan.classList.add("date");
  rightspan.textContent = date;

  const editinput = document.createElement("input");
  editinput.type = "text";
  editinput.value = `${title} - ${date}`;
  editinput.classList.add("edit-input", "title-edit");
  editinput.style.display = "none";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");
  checkbox.style.marginLeft = "10px";

  const editbutton = document.createElement("i");
  editbutton.className = "fa-solid fa-pen-to-square edit-btn";
  editbutton.onclick = function () {
    document.getElementById("title").value = leftspan.textContent.trim();
    document.getElementById("date").value = rightspan.textContent.trim();
    document.getElementById("priority").value = priority;
    listItem.remove();
    openPopup();
  };

  const deleteButton = document.createElement("i");
  deleteButton.className = "fa-solid fa-trash delete-btn";
  deleteButton.onclick = function () {
    openDeletePopup(listItem);
  };

  listItem.id = `task-${Date.now()}`;
  listItem.appendChild(leftspan);
  listItem.appendChild(rightspan);
  listItem.appendChild(editinput);
  listItem.appendChild(checkbox);
  listItem.appendChild(editbutton);
  listItem.appendChild(deleteButton);

  const tasklist = document.getElementById("task-list");
  insertTaskByPriority(tasklist, listItem, priority);

  closePopup();
  resetInputFields();

  if (tasklist.children.length >= 2) {
    document.getElementById("clearbutton").style.display = "block";
  } else {
    document.getElementById("clearbutton").style.display = "none";
  }
}

function deleteTask(id) {
  if (id) {
    let taskToRemove = document.getElementById(id);
    taskToRemove.remove();
    closeDeletePopup();
  }
}

function confirmClear() {
  const tasklist = document.getElementById('task-list');
  while (tasklist.firstChild) {
    tasklist.removeChild(tasklist.firstChild);
  }
  closeClearConfirmationPopup();

  // Update Clearall button visibility
  if (tasklist.children.length >= 2) {
    document.getElementById("clearbutton").style.display = "block";
  } else {
    document.getElementById("clearbutton").style.display = "none";
  }
}

function insertTaskByPriority(tasklist, newTask, priority) {
  switch (priority) {
    case "High":
      tasklist.prepend(newTask);
      break;
    case "Normal":
      const midIndex = Math.ceil(tasklist.children.length / 2);
      if (midIndex === tasklist.children.length) {
        tasklist.appendChild(newTask);
      } else {
        tasklist.insertBefore(newTask, tasklist.children[midIndex]);
      }
      break;
    case "Low":
      tasklist.appendChild(newTask);
      break;
    default:
      tasklist.appendChild(newTask);
  }
}

function resetInputFields() {
  document.getElementById("title").value = "";
  document.getElementById("date").value = "";
  document.getElementById("priority").value = "";
  document.getElementById("inputval").value = "";
}

function getPriorityColor(priority) {
  switch (priority) {
    case "High":
      return {
        backgroundColor: "lightgreen",
        color: "black"
      };
    case "Normal":
      return {
        backgroundColor: "lightgrey",
        color: "black"
      };
    case "Low":
      return {
        backgroundColor: "rgb(182, 23, 23)",
        color: "#fff"
      };
    default:
      return {
        backgroundColor: "white",
        color: "black"
      };
  }
}

// Handle form submission in the popup
document.getElementById("popup-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission
  saveData(); // Call your custom saveData function
});

// Handle Enter key press for the main input
document.getElementById("inputval").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    openPopup(); // Open popup when Enter key is pressed
  }
});
