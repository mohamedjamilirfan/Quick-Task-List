//============================ Typing Animination ============================//

document.addEventListener('DOMContentLoaded', function () {
  const text =
    'Welcome to Quick Task List! Our easy-to-use tool helps you stay on top of your to-do items effortlessly. Add tasks, set reminders, and manage everything in one place to keep your day running smoothly.';
  const h2Element = document.querySelector('.todo-intro h2');

  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      h2Element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50); // Adjust typing speed here
    }
  }

  h2Element.innerHTML = ''; // Clear the h2 content
  h2Element.classList.add('typing');
  typeWriter();
});

//==================== Scrolldown Button On Window Screen ====================//

function scrollToNextSection() {
  const nextSection = document.querySelector('.todo-search');
  nextSection.scrollIntoView({ behavior: 'smooth' });
}

window.addEventListener('scroll', function () {
  const introSection = document.querySelector('.todo-intro');
  const button = document.querySelector('.scroll-button');
  const introSectionBottom = introSection.getBoundingClientRect().bottom;

  if (introSectionBottom > window.innerHeight) {
    button.style.display = 'block';
  } else {
    button.style.display = 'none';
  }
});

//===================== Create New List Item, Save Tasks =====================//

document.addEventListener('DOMContentLoaded', function () {
  const taskModal = document.getElementById('taskModal');
  const addTaskButton = document.querySelector('.task-btn');
  const closeModalBtn = document.querySelector('.close-btn');
  const taskList = document.querySelector('.task-list');
  const taskForm = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');
  let deletedTask = null;
  let undoTimeout;

  // Load tasks from local storage
  loadTasks();

  // Show the modal when Add Task button is clicked
  addTaskButton.addEventListener('click', function (event) {
    event.preventDefault();
    taskModal.style.display = 'block';
  });

  // Show the modal when Enter key is pressed in the task input field
  taskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      taskModal.style.display = 'block';
    }
  });

  // Close the modal when the Close button is clicked
  closeModalBtn.addEventListener('click', function () {
    taskModal.style.display = 'none';
  });

  // Close the modal if the user clicks outside the modal
  window.addEventListener('click', function (event) {
    if (event.target == taskModal) {
      taskModal.style.display = 'none';
    }
  });

  // Function to format date as "30 August 24"
  function formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: '2-digit' };
    return new Date(date).toLocaleDateString('en-GB', options);
  }

  // Function to format time as "12:00 AM/PM"
  function formatTime(time) {
    const [hour, minute] = time.split(':');
    const isPM = hour >= 12;
    const formattedHour = hour % 12 || 12;
    const ampm = isPM ? 'PM' : 'AM';
    return `${formattedHour}:${minute} ${ampm}`;
  }

  // Function to save tasks to local storage
  function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('.list-item').forEach((item) => {
      const checkbox = item.querySelector('input[type="checkbox"]');
      const taskTextElement = item.querySelector('.list-itemText').textContent;
      const dateElement = item.querySelector('.task-date')
        ? item.querySelector('.task-date').textContent
        : '';

      if (taskTextElement) {
        tasks.push({
          text: taskTextElement,
          completed: checkbox.checked,
          date: dateElement || new Date().toISOString(), // Store the task creation date
        });
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Function to load tasks from local storage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = '';

    tasks.forEach((task) => {
      if (task && task.text) {
        const newListItem = document.createElement('li');
        newListItem.classList.add('list-item');
        newListItem.innerHTML = `
    <div class="checkbox-wrapper-44">
      <label class="toggleButton">
        <input type="checkbox" ${task.completed ? 'checked' : ''} />
        <div>
          <svg viewBox="0 0 44 44">
            <path d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758" transform="translate(-2.000000, -2.000000)"></path>
          </svg>
        </div>
      </label>
    </div>
    <p class="list-itemText">${task.text}</p>
    <div class="list-buttons">
      <button class="edit-btn"><img src="Images/edit.png" alt="Edit" /></button>
      <button class="delete-btn"><img src="Images/delete.png" alt="Delete" /></button>
    </div>
  `;

        taskList.appendChild(newListItem);
      }
    });
  }

  // Handle task submission
  taskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get task details
    const taskName = taskInput.value;
    const taskDate = document.getElementById('taskDate').value;
    const taskTime = document.getElementById('taskTime').value;

    if (taskName.trim() === '') return; // Do not allow empty task names

    // Format date and time
    const formattedDate = formatDate(taskDate);
    const formattedTime = formatTime(taskTime);

    // Create a new list item
    const newListItem = document.createElement('li');
    newListItem.classList.add('list-item');

    // Add the task to the list
    newListItem.innerHTML = `
  <div class="checkbox-wrapper-44">
    <label class="toggleButton">
      <input type="checkbox" />
      <div>
        <svg viewBox="0 0 44 44">
          <path d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758" transform="translate(-2.000000, -2.000000)"></path>
        </svg>
      </div>
    </label>
  </div>
  <p class="list-itemText">${taskName} - ${formattedDate} at ${formattedTime}</p>
  <div class="list-buttons">
    <button class="edit-btn"><img src="Images/edit.png" alt="Edit" /></button>
    <button class="delete-btn"><img src="Images/delete.png" alt="Delete" /></button>
  </div>
`;

    taskList.appendChild(newListItem);

    // Save tasks to local storage
    saveTasks();

    // Clear the task input field after adding the task
    taskInput.value = ''; // Clear task input field

    // Close the modal
    taskModal.style.display = 'none';

    // Clear the form fields
    taskForm.reset();
  });

  // Delete functionality with Undo option
  taskList.addEventListener('click', function (event) {
    if (event.target.closest('.delete-btn')) {
      const listItem = event.target.closest('.list-item');
      deletedTask = listItem.cloneNode(true); // Clone the task item to restore if needed
      listItem.remove(); // Remove the task item

      // Save tasks to local storage
      saveTasks();

      // Show the Undo popup
      showUndoPopup();
    }
  });

  // Show Undo popup
  function showUndoPopup() {
    const undoPopup = document.getElementById('undoPopup');
    undoPopup.style.display = 'inline-flex'; // Show the popup

    // Set a timeout to hide the popup after 5 seconds
    undoTimeout = setTimeout(function () {
      undoPopup.style.display = 'none';
      deletedTask = null; // Clear the deleted task if not undone
    }, 5000);
  }

  // Undo functionality
  const undoButton = document.getElementById('undoButton');
  undoButton.addEventListener('click', function () {
    clearTimeout(undoTimeout); // Clear the timeout to prevent the popup from hiding
    if (deletedTask) {
      taskList.appendChild(deletedTask); // Restore the deleted task item
      deletedTask = null; // Clear the stored task

      // Save tasks to local storage
      saveTasks();
    }
    const undoPopup = document.getElementById('undoPopup');
    undoPopup.style.display = 'none'; // Hide the popup
  });

  // Handle task checkbox change
  taskList.addEventListener('change', function (event) {
    if (event.target.type === 'checkbox') {
      saveTasks(); // Update the checkbox state in local storage
      if (event.target.checked) {
        showTaskPopup();
      }
    }
  });

  function showTaskPopup() {
    const popup = document.getElementById('taskPopup');
    popup.style.display = 'inline-flex';
    setTimeout(function () {
      popup.style.display = 'none';
    }, 5000);
  }

  // Edit functionality
  taskList.addEventListener('click', function (event) {
    if (event.target.closest('.edit-btn')) {
      const listItem = event.target.closest('.list-item');
      const taskTextElement = listItem.querySelector('.list-itemText');
      const [taskText, taskDateTime] = taskTextElement.textContent.split(' - ');
      const [formattedDate, formattedTime] = taskDateTime.split(' at ');

      // Replace the task text with input fields for editing task name, date, and time
      taskTextElement.innerHTML = `
  <input type="text" value="${taskText}" class="edit-input" /><br />
  <input type="date" value="${formatDateInput(
    formattedDate
  )}" class="edit-date-input" /><br />
  <input type="time" value="${formatTimeInput(
    formattedTime
  )}" class="edit-time-input" /><br />
  <button class="save-btn">Update</button>
  <button class="cancel-btn">Cancel</button>
`;

      const editInput = listItem.querySelector('.edit-input');
      const editDateInput = listItem.querySelector('.edit-date-input');
      const editTimeInput = listItem.querySelector('.edit-time-input');
      const saveBtn = listItem.querySelector('.save-btn');
      const cancelBtn = listItem.querySelector('.cancel-btn');

      // Focus on the input field
      editInput.focus();

      // Attach event listener for save button
      saveBtn.addEventListener('click', function () {
        const newTaskText = editInput.value;
        const newTaskDate = formatDate(editDateInput.value);
        const newTaskTime = formatTime(editTimeInput.value);
        taskTextElement.textContent = `${newTaskText} - ${newTaskDate} at ${newTaskTime}`;

        // Save tasks to local storage
        saveTasks();
      });

      // Attach event listener for cancel button
      cancelBtn.addEventListener('click', function () {
        taskTextElement.textContent = `${taskText} - ${formattedDate} at ${formattedTime}`;
      });
    }
  });

  // Helper function to convert formatted date to input date value
  function formatDateInput(date) {
    const [day, month, year] = date.split(' ');
    const months = {
      January: '01',
      February: '02',
      March: '03',
      April: '04',
      May: '05',
      June: '06',
      July: '07',
      August: '08',
      September: '09',
      October: '10',
      November: '11',
      December: '12',
    };
    return `20${year}-${months[month]}-${day.padStart(2, '0')}`;
  }

  // Helper function to convert formatted time to input time value
  function formatTimeInput(time) {
    const [hourMinute, ampm] = time.split(' ');
    let [hour, minute] = hourMinute.split(':');
    if (ampm === 'PM' && hour !== '12')
      hour = (parseInt(hour) + 12).toString().padStart(2, '0');
    if (ampm === 'AM' && hour === '12') hour = '00';
    return `${hour}:${minute}`;
  }
});

//=========================== Open Task Model Popup ==========================//

document.addEventListener('DOMContentLoaded', function () {
  const taskModal = document.getElementById('taskModal');
  const errorPopup = document.getElementById('errorPopup');
  const addTaskButton = document.querySelector('.task-btn');
  const taskInput = document.getElementById('taskInput');

  // Show the modal when Add Task button is clicked
  addTaskButton.addEventListener('click', function (event) {
    event.preventDefault();

    // Check task length before showing modal
    const taskName = taskInput.value.trim();
    if (taskName.length < 5) {
      // Show error popup if the task is less than 5 characters
      showErrorPopup();
      taskModal.style.display = 'none';
    } else {
      taskModal.style.display = 'block';
    }
  });

  // Show the modal when Enter key is pressed in the task input field
  taskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      const taskName = taskInput.value.trim();
      if (taskName.length < 5) {
        // Show error popup if the task is less than 5 characters
        showErrorPopup();
      } else {
        taskModal.style.display = 'block';
      }
    }
  });

  // Function to show error popup
  function showErrorPopup() {
    errorPopup.classList.add('show');
    setTimeout(() => {
      errorPopup.classList.remove('show');
    }, 3000); // Popup disappears after 3 seconds
  }
});

//================== No Result Found Text On Window Screen ===================//

document.addEventListener('DOMContentLoaded', function () {
  const search = document.getElementById('search');
  const taskList = document.getElementById('task-list');
  const noResultsMessage = document.getElementById('no-results-message');

  function performSearch() {
    const enteredValue = search.value.toUpperCase();
    const taskItems = taskList.querySelectorAll('li.list-item');

    let hasResults = false;

    taskItems.forEach((item) => {
      const taskTextElement = item.querySelector('.list-itemText');
      const taskText = taskTextElement.textContent.toUpperCase();
      if (taskText.includes(enteredValue)) {
        item.style.display = 'flex';
        hasResults = true;
      } else {
        item.style.display = 'none';
      }
    });

    // Show or hide the "result not found" message
    noResultsMessage.style.display = hasResults ? 'none' : 'block';
  }

  search.addEventListener('keyup', performSearch);

  search.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default form submission
    }
  });
});
