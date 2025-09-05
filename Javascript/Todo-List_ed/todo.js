//selector
const todoinput = document.querySelector(".todo-input");
const todobutton = document.querySelector(".todo-button");
const todolist = document.querySelector(".todo-list");
const filteroption = document.querySelector(".filter-todo");


//event listner
todobutton.addEventListener("click", addtodo);
todolist.addEventListener("click", deleteitem);
filteroption.addEventListener("click", filtertodo);
document.addEventListener('DOMContentLoaded',gettodos);

//function
function addtodo(e) {
    //prevent from reloading
    e.preventDefault();

    //todo-div
    const tododiv = document.createElement("div");
    tododiv.classList.add("todo");
    //create li
    const todoitem = document.createElement('li');
    todoitem.innerText = todoinput.value;
    todoitem.classList.add("todo-item")
    tododiv.appendChild(todoitem);
    //add todo to local storage
    savelocaltodos(todoinput.value);
    //check mark button
    const completebutton = document.createElement('button');
    completebutton.innerHTML = '<i class="fas fa-check"></i>';
    completebutton.classList.add("complete-button");
    tododiv.appendChild(completebutton);
    //check trash  button
    const trashbutton = document.createElement('button');
    trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
    trashbutton.classList.add("trash-button");
    tododiv.appendChild(trashbutton);
    //append to list 
    todolist.appendChild(tododiv);
    //text feild clear krne k liye
    todoinput.value = "";
}
function deleteitem(e) {
    const item = e.target;
    //delete to do
    if (item.classList[0] === 'trash-button') {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removelocal(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })

    }
    //check mark
    if (item.classList[0] === 'complete-button') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}
function filtertodo(e) {
    const todo = todolist.childNodes;
    todo.forEach(function (todos) {
        switch (e.target.value) {
            case "all":
                todos.style.display = 'flex';
                break;
            case "completed":
                if (todos.classList.contains('completed')) {
                    todos.style.display = 'flex';
                }
                else {
                    todos.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todos.classList.contains('completed')) {
                    todos.style.display = 'flex';
                }
                else {
                    todos.style.display = 'none';
                }
                break;

        }
    })

}
function savelocaltodos(todo) {
    //check already is thre or not
    let todos;
    if (localStorage.getItem('todos') == null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function gettodos() {
    let todos;
    if (localStorage.getItem('todos') == null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        //todo-div
        const tododiv = document.createElement("div");
        tododiv.classList.add("todo");
        //create li
        const todoitem = document.createElement('li');
        todoitem.innerText = todo;
        todoitem.classList.add("todo-item")
        tododiv.appendChild(todoitem);
        //check mark button
        const completebutton = document.createElement('button');
        completebutton.innerHTML = '<i class="fas fa-check"></i>';
        completebutton.classList.add("complete-button");
        tododiv.appendChild(completebutton);
        //check trash  button
        const trashbutton = document.createElement('button');
        trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
        trashbutton.classList.add("trash-button");
        tododiv.appendChild(trashbutton);
        //append to list 
        todolist.appendChild(tododiv);
    })

}
function removelocal(todo)
{
    let todos;
    if (localStorage.getItem('todos') == null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const index = todo.children[0].innerText;
    todos.splice(todos.indexOf(index),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}