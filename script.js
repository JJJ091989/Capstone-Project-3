// Select DOM elements
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

// Function to add a new task
function addTask() {
    const task = inputBox.value.trim();

    // Validate input
    if (!task) {
        alert("Please write down a task");
        return;
    }

    // Create the list item
    const li = document.createElement("li");

    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span>${task}</span>
        </label>
        <span class="edit-btn">Edit</span>
        <span class="delete-btn">Delete</span>
    `;

    // Add event listeners for the new task
    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-btn");
    const taskSpan = li.querySelector("span");
    const deleteBtn = li.querySelector(".delete-btn");

    // Toggle completion
    checkbox.addEventListener("click", function () {
        li.classList.toggle("completed", checkbox.checked);
        updateCounters();
    });

    // Edit task
    editBtn.addEventListener("click", function () {
        const update = prompt("Edit task:", taskSpan.textContent);
        if (update !== null) {
            taskSpan.textContent = update;
            li.classList.remove("completed");
            checkbox.checked = false;
            updateCounters();
        }
    });

    // Delete task
    deleteBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this task?")) {
            li.remove();
            updateCounters();
        }
    });

    // Append the task to the list
    listContainer.appendChild(li);

    // Clear the input box
    inputBox.value = "";

    // Update counters after adding a new task
    updateCounters();
}

// Function to update the completed and uncompleted task counters
function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;

    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
}

// Add task when the "Add" button is clicked
document.getElementById("input-button").addEventListener("click", addTask);

// Add task when "Enter" key is pressed
inputBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
