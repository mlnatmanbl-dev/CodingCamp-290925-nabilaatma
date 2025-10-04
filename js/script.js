// initialize an empty array to hold todo items
let todos = [];
const TODO_STORAGE_KEY = 'beellaaTodos'; // Kunci untuk localStorage

// --- PERSISTENCE FUNCTIONS (CRITICAL ADDITION: Inst. 1 Implication) ---

function saveTodo() {
    // Save the current todos array to localStorage
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}

function loadTodo() {
    // Load todos from localStorage when the app starts
    const storedTodos = localStorage.getItem(TODO_STORAGE_KEY);
    if (storedTodos) {
        // Parse the stored string back into a JavaScript object (array)
        todos = JSON.parse(storedTodos);
    }
    // Render the loaded todos
    renderTodo();
}

// --- INITIALIZATION AND FORM HANDLING ---

// Load data dan pasang event listener saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    // 1. Load existing tasks on page load
    loadTodo();

    // 2. Attach the addTodo function to the form submit event
    const todoForm = document.getElementById('todo-form');
    todoForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission (page reload)
        addTodo();
    });
});

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoDate = document.getElementById('todo-date');
    const task = todoInput.value.trim();
    const date = todoDate.value;

    // Validate input (Inst. 2)
    if (validateInput(task, date)) {
        // Add new todo item, termasuk properti 'status' yang wajib untuk Filter/Aksi
        let todo = { 
            task: task, 
            date: date, 
            status: 'pending' // Default status untuk tugas baru
        };
        todos.push(todo);

        // Save the updated list to localStorage
        saveTodo();

        // Clear the form inputs
        todoInput.value = '';
        todoDate.value = '';

        // Render the updated todo list
        renderTodo();
    }
}

// --- RENDERING FUNCTION (MODIFIED FOR TABLE STRUCTURE) ---

function renderTodo() {
    const todoListBody = document.getElementById('todo-list');
    const filterStatus = document.getElementById('filter-status').value;
    
    // Terapkan filtering
    let filteredTodos = todos;
    if (filterStatus!== 'all') {
        filteredTodos = todos.filter(todo => todo.status === filterStatus);
    }

    // Clear existing list body
    todoListBody.innerHTML = '';

    // Handle "No task found" message
    const noTaskMessage = document.getElementById('no-task-message');
    if (filteredTodos.length === 0) {
        noTaskMessage.classList.remove('hidden');
        return;
    } else {
        noTaskMessage.classList.add('hidden');
    }

    // Render each todo item as a table row (<tr>)
    filteredTodos.forEach((todo) => {
        // Gunakan *original* index untuk aksi (delete/toggle), bukan index dari array yang sudah difilter
        const originalIndex = todos.findIndex(item => item === todo);

        // Styling dan teks berdasarkan status
        const statusClass = todo.status === 'completed'? 'status-completed' : 'status-pending';
        const statusText = todo.status === 'completed'? 'Completed' : 'Pending';
        const toggleButtonText = todo.status === 'completed'? 'Mark Pending' : 'Mark Complete';

        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50 transition duration-150';

        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${todo.task}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${todo.date}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="${statusClass}">${statusText}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                <button 
                    class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs transition duration-150" 
                    onclick="toggleStatus(${originalIndex})">
                    ${toggleButtonText}
                </button>
                <button 
                    class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition duration-150" 
                    onclick="deleteTodo(${originalIndex})">
                    Delete
                </button>
            </td>
        `;
        todoListBody.appendChild(row);
    });
}


// --- ACTION FUNCTIONS (DELETE, TOGGLE STATUS, FILTER) ---

function deleteTodo(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        // Remove the item at the specific index
        todos.splice(index, 1);

        // Save and re-render
        saveTodo();
        renderTodo();
    }
}

function deleteAllTodo() {
    if (confirm('Are you sure you want to delete ALL tasks?')) {
        // Clear the todos array
        todos =;
    
        // Clear localStorage (CRITICAL ADDITION: Inst. 1 Implication)
        saveTodo();
    
        // Render the empty todo list
        renderTodo();
    }
}

function toggleStatus(index) {
    // Toggle the status property
    const currentStatus = todos[index].status;
    todos[index].status = currentStatus === 'pending'? 'completed' : 'pending';

    // Save and re-render
    saveTodo();
    renderTodo();
}

// Implement filter functionality (Inst. 1 Requirement)
function filterTodo() {
    // Memanggil renderTodo akan secara otomatis menerapkan filter dari dropdown
    renderTodo(); 
}

// --- VALIDATION FUNCTION ---

// Validate input fields (Inst. 2 Requirement)
function validateInput(todo, date) {
    // Check if inputs are empty
    if (todo === '' |

| date === '') {
        // show an alert if validation fails (Minimum requirement met)
        alert("Please fill in all fields (Task and Due Date)");
        return false;
    }
    return true;
}