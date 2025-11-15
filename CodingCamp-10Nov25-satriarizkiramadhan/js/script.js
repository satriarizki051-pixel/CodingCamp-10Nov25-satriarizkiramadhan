let todos = [];

function addTodo() {
    const todoinput = document.getElementById("todo-input");
    const tododate = document.getElementById("todo-date");

    /// validation
    if (todoinput.value === '' || tododate.value === '') {
        alert("please fill in both fields.");
    } else {
        /// add todo item to the list
        todos.push({ text: todoinput.value, date: tododate.value, });
        todoinput.value = '';
        tododate.value = '';

        randerTodos();
    }

}
function randerTodos() {
    const todoList = document.getElementById('todo-list');


    todoList.innerHTML = '';

    todos.forEach((todo,) => {
        todoList.innerHTML += `
        <li>
            <p class="text-2xl">${todo.text} <span class="text-sm text-grey-500">(${todo.date})</span></p>
            <hr />
         </li>`;
    });

}


function cleartodos() {
    todos = [];
    randerTodos();
}

function filtertodos() { }