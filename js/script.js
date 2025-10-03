console.log("Hello World");

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoDate = document.getElementById('todo-date');
    if (validateInput(todoInput.value, todoDate.value)) {
        let todo = { task: todoInput.value, date: todoDate.value };
        todos.push(todo);
        console.log(todos);
    }
}

function deleteAllTodo() {}

function filterTodo() {}

function validateInput(todo, date) {
    if (todo === '' || date === '') {
        alert("Please fill in all fields");
        return false;
    }
    return true;
}

