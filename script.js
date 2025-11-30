document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const emptyState = document.getElementById('empty-state');

    // Load tasks from localStorage when the page loads
    loadTasks();

    // Add task when the "Add Task" button is clicked
    addButton.addEventListener('click', addTask);

    // Add task when Enter key is pressed in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    /**
     * Function to add a new task
     * @param {string} taskText - The text of the task to add
     * @param {boolean} save - Whether to save to localStorage (default: true)
     */
    function addTask(taskText, save = true) {
        // If taskText is provided as parameter, use it; otherwise get from input
        const text = taskText || taskInput.value.trim();
        
        // Check if the input is empty
        if (text === '') {
            alert('Please enter a task!');
            return;
        }

        // Create new list item
        const listItem = document.createElement('li');
        
        // Create task text element
        const taskTextElement = document.createElement('span');
        taskTextElement.className = 'task-text';
        taskTextElement.textContent = text;
        
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.className = 'remove-btn';
        removeButton.textContent = 'Remove';
        
        // Add event listener to remove button
        removeButton.addEventListener('click', () => {
            removeTask(listItem, text);
        });
        
        // Append elements to list item
        listItem.appendChild(taskTextElement);
        listItem.appendChild(removeButton);
        
        // Append list item to task list
        taskList.appendChild(listItem);
        
        // Clear input field if we're adding from the input
        if (!taskText) {
            taskInput.value = '';
        }
        
        // Save to localStorage if needed
        if (save) {
            saveTask(text);
        }
        
        // Update empty state visibility
        updateEmptyState();
    }

    /**
     * Function to remove a task
     * @param {HTMLElement} listItem - The list item element to remove
     * @param {string} taskText - The text of the task to remove
     */
    function removeTask(listItem, taskText) {
        // Remove from DOM
        listItem.remove();
        
        // Remove from localStorage
        removeTaskFromStorage(taskText);
        
        // Update empty state visibility
        updateEmptyState();
    }

    /**
     * Function to save a task to localStorage
     * @param {string} taskText - The text of the task to save
     */
    function saveTask(taskText) {
        // Get existing tasks from localStorage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // Add new task
        storedTasks.push(taskText);
        
        // Save back to localStorage
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    /**
     * Function to remove a task from localStorage
     * @param {string} taskText - The text of the task to remove
     */
    function removeTaskFromStorage(taskText) {
        // Get existing tasks from localStorage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // Filter out the task to remove
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        
        // Save back to localStorage
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    /**
     * Function to load tasks from localStorage
     */
    function loadTasks() {
        // Get tasks from localStorage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // Add each task to the DOM without saving to localStorage again
        storedTasks.forEach(task => {
            addTask(task, false);
        });
        
        // Update empty state visibility
        updateEmptyState();
    }

    /**
     * Function to update the visibility of the empty state message
     */
    function updateEmptyState() {
        if (taskList.children.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }
    }
});