const titleTextBox = document.getElementById('title-textbox');
const contentTextBox = document.getElementById('content-textbox');
const errorParagraph = document.getElementById('error-txt');
const todoListDiv = document.getElementById('todo-list');

let todoItems = [];

window.onload = function () {
    // Check if there are todos stored in localstorage then add them to `todoItems` abd update the DOM.
    if(localStorage.length > 0) {
        let todos = localStorage.getItem('todos');
        todoItems = JSON.parse(todos);
        updateTodoListDOMElements();
    } else {
        console.log('No todos stored locally');
    }
};

/**
 * Takes user input and adds it to local storage then updates the DOM
 * via `updateTodoListDOMElements()`.
 */
function addNewTodo() {
    if (titleTextBox.value !== '' && contentTextBox.value !== '') {
        errorParagraph.innerHTML = '';
        todoItems.push(
            { title: titleTextBox.value, description: contentTextBox.value, isComplete: false }
        );
        // sort the todos first so that the completed ones are always last.
        todoItems.sort(sortByIsComplete);

        updateLocalStorage();

        updateTodoListDOMElements();
        titleTextBox.value = '';
        contentTextBox.value = '';
    } else {
        errorParagraph.innerHTML = 'Title and description cannot be empty.';
    }
}

/**
 * Iterates over `todoItems` array and adds them to the DOM.
 * The DOM is cleared first before adding the updated list.
 */
function updateTodoListDOMElements() {
    if(todoItems.length > 0) {
        // clear the DOM since we will just reappend the whole list.
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

/**
 * Removes todo from the DOM based on the given index.
 *
 * @param {*} index refers to the index of the item being deleted.
 */
function deleteTodo(index) {
    let todo = document.getElementById('todo-' + index);
    todo.remove();
    // Remove todo from our list and local storage.
    todoItems.splice(index, 1);
    updateLocalStorage();
}

/**
 * Sets the `isComplete` value of a todo object to `true`. The index is
 * used to specify which todo item is affected.
 * After updating the todo item `todoItems` gets sorted so that
 * completed todos appear last.
 * @param {*} index refers to the index of the todo item to be completed.
 */
function completeTodo(index) {
    let todoObject = todoItems[index];
    todoObject.isComplete = true;
    todoItems.sort(sortByIsComplete);
    updateLocalStorage();
    updateTodoListDOMElements();
}

/**
 * Removes the specified todo from `todoItems` and then puts its values
 * back into the user inputs at the top of the page.
 * @param {*} index refers to the index of the todo item to be edited.
 */
function editTodo(index) {
    let title = document.getElementById('title-' + index);
    let description = document.getElementById('content-' + index);

    titleTextBox.value = title.innerHTML;
    contentTextBox.value = description.innerHTML;

    deleteTodo(index);
}

/**
 * Clears local storage then repopulates it with the updated
 * `todoItems` array.
 */
function updateLocalStorage() {
    localStorage.clear();
    localStorage.setItem('todos', JSON.stringify(todoItems));
}

/**
 * Sorts todo items based on the `isComplete` value. Todo items
 * that are marked as completed get pushed to the bottom of the
 * array.
 * @param {*} a refers to the first item being compared
 * @param {*} b refers to the second item being compared
 * @returns 1 if the second item's `isComplete` is false, -1 if the first item is false and 0 if both are true.
 */
function sortByIsComplete(a, b) {
    if(a.isComplete && !b.isComplete) {
        return 1;
    }
    if(!a.isComplete && b.isComplete) {
        return -1;
    }
    return 0;
}