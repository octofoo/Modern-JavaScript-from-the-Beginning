////// UI VARIABLES
const taskAddForm = document.querySelector('#task-add-form');
const taskInput = document.querySelector('#task-name-input');
const taskFilterInput = document.querySelector('#task-filter-input');
const taskList = document.querySelector('.collection');
const clearAllButton = document.querySelector('.clear-all');

////// EVENTS
loadEventListeners();

// Load event listeners
function loadEventListeners() {
  // get tasks from storage
  document.addEventListener('DOMContentLoaded', displayTasks);
  // add task
  taskAddForm.addEventListener('submit', addTask);
  // remove task
  taskList.addEventListener('click', removeTask);
  // clear task list
  clearAllButton.addEventListener('click', clearTaskList);
  // filter tasks
  taskFilterInput.addEventListener('keyup', filterTaskList);
}

////// TOOLS

// Get Tasks from storage
function getTasks() {
  // initialize empty variable
  let tasksArray;
  // check if storage isn't empty
  if(localStorage.getItem('task-list') !== null) {
    // get 'task-list' from storage and put it in the 'tasksArray'
    tasksArray = JSON.parse(localStorage.getItem('task-list'));
  } else {
    // set empty array
    tasksArray = [];
  }
  // return
  return tasksArray;
}

// Create item
function createItem(name) {
  // create item as li
  const item = document.createElement('li');
  // style item
  item.className = 'collection-item';
  // get name from input, put it in text node, append to item
  item.appendChild(document.createTextNode(name));
  // create remove button as anchor element
  const removeButton = document.createElement('a');
  // style remove button
  removeButton.className = 'delete-item secondary-content';
  // insert icon code
  removeButton.innerHTML = '<i class="fa fa-remove"></i>';
  // append remove button to item
  item.appendChild(removeButton);
  // append item to task list
  taskList.appendChild(item);
}
 
// Store Task
function storeTask(task) {
  // get tasks from storage
  tasksArray = getTasks();
  // add task into array
  tasksArray.push(task);
  // set 'tasksArray' in storage as 'task-list'
  localStorage.setItem('task-list', JSON.stringify(tasksArray));
}

// Remove Task from storage, aka 'destore'
function destoreTask(taskItem) {
  // get tasks from storage
  tasksArray = getTasks();
  // loop through array
  tasksArray.forEach(function(task, index) {
      // if li textNode equals looped task
      if(taskItem.textContent === task) {
        // remove task from array by index
        tasksArray.splice(index, 1);
      }
    }
  );
  // set 'tasksArray' in storage as 'task-list'
  localStorage.setItem('task-list', JSON.stringify(tasksArray));
}

////// FUNCTIONS

// Display Tasks
function displayTasks() {
  // get tasks from storage
  tasksArray = getTasks();
  // loop through array
  tasksArray.forEach(function(task) {
    createItem(task);
  });
}

// Add Task
function addTask(eventObject) {
  // check if not empty
  if(taskInput.value !== '') {
    // call 'createItem' with input passed to name
    createItem(taskInput.value);
    // store in storage
    storeTask(taskInput.value);
    // clear name input
    taskInput.value = '';
  } else {
    alert('Please add task');
  }
  // prevent default behaviour of form submit button
  eventObject.preventDefault();
}

// Remove task
function removeTask(eventObject) {
  // if parent of target (clicked element within 'taskList') contains class 'delete-item'
  if(eventObject.target.parentElement.classList.contains('delete-item')) {
    // display dialogue window with OK/Cancel buttons
    if(confirm('Are you sure?')) {
      // remove parent of parent, target: <i>, parent: <a>, parent of parent: <li>
      eventObject.target.parentElement.parentElement.remove();
      // Remove from storage
      destoreTask(eventObject.target.parentElement.parentElement);
    }
  }
}

// Clear Task list
function clearTaskList() {
  // while task list has a first child
  while(taskList.firstChild) {
    // remove it
    taskList.removeChild(taskList.firstChild);
  }
}

// Filter Task list
function filterTaskList(eventObject) {
  // put value of input in 'phrase', convert to lower case
  const phrase = eventObject.target.value.toLowerCase();
  // gather all tasks into node list
  document.querySelectorAll('.collection-item').forEach(
    // each task
    function(task) {
      // put task name into 'name'
      const name = task.firstChild.textContent;
      // convert name into lower case, then search for phrase
      // AND minimum length must be 3 or more,
      // OR if the field is empty display all tasks
      if(name.toLowerCase().indexOf(phrase) != -1 && phrase.length >= 3 || eventObject.target.value === '') {
        // if present, set 'display: block'
        task.style.display = 'block';
      } else {
        // if not, set 'display: none'
        task.style.display = 'none';
      }
    }
  );
}