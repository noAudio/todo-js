const titleTextBox = document.getElementById('title-textbox');
const contentTextBox = document.getElementById('content-textbox');
const errorParagraph = document.getElementById('error-txt');
const todoListDiv = document.getElementById('todo-list');

let todoItems = [];

class TodoItem {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.isComplete = false;
    }
}

function addNewTodo() {
    if (titleTextBox.value !== '' && contentTextBox.value !== '') {
        errorParagraph.innerHTML = '';
        todoItems.push(
            new TodoItem(titleTextBox.value, contentTextBox.value)
        );
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
        console.log(todoItems.length);
        for (let index = 0; index < todoItems.length; index++) {
            let item = todoItems[index];
            let itemID = 'todo-' + index;
            let todoContainer = document.createElement('div');
            todoContainer.className = 'todo-item column';
            todoContainer.id = itemID;

            let todoTitle = document.createElement('h4');
            todoTitle.className = 'title';
            todoTitle.innerText = item.title;

            let todoDescription = document.createElement('p');
            todoDescription.className = 'content';
            todoDescription.innerText = item.description;

            let row = document.createElement('div');
            row.className = 'row';

            let completeButton = document.createElement('button');
            completeButton.className = 'btn';
            completeButton.textContent = 'Complete';
            let editButton = document.createElement('button');
            editButton.className = 'btn';
            editButton.textContent = 'Edit';
            let deleteButton = document.createElement('button');
            deleteButton.className = 'btn';
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() {deleteTodo(index);};

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
    // Remove todo from our list too.
    todoItems.splice(index, 1);
}