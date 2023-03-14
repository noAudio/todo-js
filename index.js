const titleTextBox = document.getElementById('title-textbox');
const contentTextBox = document.getElementById('content-textbox');
const errorParagraph = document.getElementById('error-txt');
const todoListDiv = document.getElementById('todo-list');

let todoItems = [];

window.onload = function () {
    if(localStorage.length > 0) {
        let todos = localStorage.getItem('todos');
        todoItems = JSON.parse(todos);
        updateTodoListDOMElements();
    } else {
        console.log('No todos stored locally');
    }
};

function addNewTodo() {
    if (titleTextBox.value !== '' && contentTextBox.value !== '') {
        errorParagraph.innerHTML = '';
        todoItems.push(
            { title: titleTextBox.value, description: contentTextBox.value, isComplete: false }
        );
        todoItems.sort(sortByIsComplete);

        updateLocalStorage();

        updateTodoListDOMElements();
        titleTextBox.value = '';
        contentTextBox.value = '';
    } else {
        errorParagraph.innerHTML = 'Title and description cannot be empty.';
    }
}


function updateTodoListDOMElements() {
    if(todoItems.length > 0) {
        todoListDiv.innerHTML = '';
        for (let index = 0; index < todoItems.length; index++) {
            let item = todoItems[index];
            let title = item.title;
            let isComplete = item.isComplete;
            let description = item.description;
            let itemID = 'todo-' + index;
            let todoContainer = document.createElement('div');
            todoContainer.className = 'todo-item column';
            todoContainer.id = itemID;

            let todoTitle = document.createElement('h4');
            todoTitle.className = isComplete ? 'title txt-strike' : 'title';
            todoTitle.id = 'title-' + index;
            todoTitle.innerText = title;

            let todoDescription = document.createElement('p');
            todoDescription.className = isComplete ? 'content txt-strike' : 'content';
            todoDescription.id = 'content-' + index;
            todoDescription.innerText = description;

            let row = document.createElement('div');
            row.className = 'row';

            let completeButton = document.createElement('button');
            completeButton.className = 'btn';
            completeButton.textContent = 'Complete';
            completeButton.onclick = function(){ completeTodo(index); };
            let editButton = document.createElement('button');
            editButton.className = 'btn';
            editButton.textContent = 'Edit';
            editButton.onclick = function() { editTodo(index); };
            let deleteButton = document.createElement('button');
            deleteButton.className = 'btn';
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() { deleteTodo(index); };

            row.appendChild(completeButton);
            row.appendChild(editButton);
            row.appendChild(deleteButton);
            todoContainer.appendChild(todoTitle);
            todoContainer.appendChild(todoDescription);
            todoContainer.appendChild(row);
            todoListDiv.appendChild(todoContainer);
        }
    }
}

function deleteTodo(index) {
    let todo = document.getElementById('todo-' + index);
    todo.remove();
    // Remove todo from our list and local storage.
    todoItems.splice(index, 1);
    updateLocalStorage();
}

function completeTodo(index) {
    let todoObject = todoItems[index];
    todoObject.isComplete = true;
    deleteTodo(index);
    todoItems.push(todoObject);
    todoItems.sort(sortByIsComplete);
    updateLocalStorage();
    updateTodoListDOMElements();
}

function editTodo(index) {
    let title = document.getElementById('title-' + index);
    let description = document.getElementById('content-' + index);

    titleTextBox.value = title.innerHTML;
    contentTextBox.value = description.innerHTML;

    deleteTodo(index);
}

function updateLocalStorage() {
    localStorage.clear();
    localStorage.setItem('todos', JSON.stringify(todoItems));
}

function sortByIsComplete(a, b) {
    if(a.isComplete && !b.isComplete) {
        return 1;
    }
    if(!a.isComplete && b.isComplete) {
        return -1;
    }
    return 0;
}