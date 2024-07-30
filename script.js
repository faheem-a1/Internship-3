const inputtdl = document.querySelector('.textarea');
const prioritytdl = document.querySelector('.priority');
const duedatetdl = document.querySelector('.due-date');
const categorytdl = document.querySelector('.category');
const buttontdl = document.querySelector('.buttoninput');
const listtdl = document.querySelector('.todolist');

let editingTask = null;

function clickButton(e) {
    e.preventDefault();
    if (editingTask) {
        updateTodo();
    } else {
        addTodo();
    }
    saveTodos();
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        createTodoElement(todo.text, todo.priority, todo.dueDate, todo.category, todo.completed);
    });
}

function saveTodos() {
    const todos = [];
    document.querySelectorAll('.itemall').forEach(item => {
        todos.push({
            text: item.querySelector('.item').innerText,
            priority: item.querySelector('.priority-display').innerText,
            dueDate: item.querySelector('.due-date-display').innerText,
            category: item.querySelector('.category-display').innerText,
            completed: item.classList.contains('checklist')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function createTodoElement(text, priority = 'Low', dueDate = '', category = 'Work', completed = false) {
    const itemall = document.createElement('div');
    itemall.classList.add('itemall');
    if (completed) {
        itemall.classList.add('checklist');
    }

    const item = document.createElement('p');
    item.classList.add('item');
    item.innerText = text;
    itemall.appendChild(item);

    const priorityDisplay = document.createElement('p');
    priorityDisplay.classList.add('priority-display');
    priorityDisplay.innerText = priority;
    itemall.appendChild(priorityDisplay);

    const dueDateDisplay = document.createElement('p');
    dueDateDisplay.classList.add('due-date-display');
    dueDateDisplay.innerText = dueDate;
    itemall.appendChild(dueDateDisplay);

    const categoryDisplay = document.createElement('p');
    categoryDisplay.classList.add('category-display');
    categoryDisplay.innerText = category;
    itemall.appendChild(categoryDisplay);

    const checkbutton = document.createElement('button');
    checkbutton.innerHTML = '<i class="fa-solid fa-check"></i>';
    checkbutton.classList.add('check-button');
    itemall.appendChild(checkbutton);

    const editbutton = document.createElement('button');
    editbutton.innerHTML = '<i class="fa-solid fa-edit"></i>';
    editbutton.classList.add('edit-button');
    itemall.appendChild(editbutton);

    const trashbutton = document.createElement('button');
    trashbutton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashbutton.classList.add('trash-button');
    itemall.appendChild(trashbutton);

    listtdl.appendChild(itemall);
}

function addTodo() {
    if (inputtdl.value === '') return;
    createTodoElement(inputtdl.value, prioritytdl.value, duedatetdl.value, categorytdl.value);
    inputtdl.value = '';
    prioritytdl.value = 'Low';
    duedatetdl.value = '';
    categorytdl.value = 'Work';
}

function updateTodo() {
    const item = editingTask.querySelector('.item');
    item.innerText = inputtdl.value;

    const priorityDisplay = editingTask.querySelector('.priority-display');
    priorityDisplay.innerText = prioritytdl.value;

    const dueDateDisplay = editingTask.querySelector('.due-date-display');
    dueDateDisplay.innerText = duedatetdl.value;

    const categoryDisplay = editingTask.querySelector('.category-display');
    categoryDisplay.innerText = categorytdl.value;

    editingTask = null;
    inputtdl.value = '';
    prioritytdl.value = 'Low';
    duedatetdl.value = '';
    categorytdl.value = 'Work';
}

function okdel(e) {
    const item = e.target;

    if (item.classList.contains('check-button')) {
        const todolist = item.parentElement;
        todolist.classList.toggle('checklist');
    }

    if (item.classList.contains('trash-button')) {
        const todolist = item.parentElement;
        todolist.remove();
    }

    if (item.classList.contains('edit-button')) {
        const todolist = item.parentElement;
        const text = todolist.querySelector('.item').innerText;
        const priority = todolist.querySelector('.priority-display').innerText;
        const dueDate = todolist.querySelector('.due-date-display').innerText;
        const category = todolist.querySelector('.category-display').innerText;

        inputtdl.value = text;
        prioritytdl.value = priority;
        duedatetdl.value = dueDate;
        categorytdl.value = category;

        editingTask = todolist;
    }

    saveTodos();
}

buttontdl.addEventListener('click', clickButton);
listtdl.addEventListener('click', okdel);
document.addEventListener('DOMContentLoaded', loadTodos);
