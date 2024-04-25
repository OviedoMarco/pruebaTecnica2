// Obtener elementos del DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');


// Función para crear una nueva tarea
function createTask(taskContent) {
    // Crear elemento de tarea
    const task = document.createElement('div');
    task.classList.add('task');

    // Crear elemento de texto para la tarea
    const taskText = document.createElement('span');
    taskText.textContent = taskContent;
    task.appendChild(taskText);
    
    // Marcar tarea como completada al hacer clic en ella
    task.addEventListener('click', () => {
        task.classList.toggle('completed');
        saveTasks();
    });
    
    // Crear botón de eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.addEventListener('click', () => {
        task.remove();
        saveTasks();
    });
    task.appendChild(deleteBtn);
    
    // Añadir tarea a la lista
    taskList.appendChild(task);
    saveTasks();
}


// Función para añadir una tarea al hacer clic en el botón o al presionar Enter
function addTask() {
    const taskContent = taskInput.value.trim();
    if (taskContent !== '') {
        createTask(taskContent);
        taskInput.value = '';
    } else {
        alert('Por favor, ingresa una tarea válida.');
    }
}

// Función para guardar las tareas en localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('.task').forEach(task => {
        tasks.push({
            content: task.querySelector('span').textContent,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Función para cargar las tareas desde localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTask(task.content);
        const taskElement = taskList.lastChild;
        if (task.completed) {
            taskElement.classList.add('completed');
        }
    });
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Cargar tareas al cargar la página
loadTasks();


