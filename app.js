// theme switch
const themeSwitch = document.querySelector('.theme-switch');
const indicator = document.querySelector('.indicator');
const body = document.body;

themeSwitch.addEventListener('click', ()=>{
   themeSwitch.classList.toggle('active');
   indicator.classList.toggle('active');
    body.classList.toggle('dark');
})


// todo
const input = document.querySelector('#input-text')
const addBtn = document.querySelector('#add')
document.addEventListener('DOMContentLoaded', getTodos);


addBtn.addEventListener('click', ()=>{
    let inputVal = input.value;
    let error = document.querySelector('.error')

    if(inputVal.trim()=== ""){
        
        error.innerText = "Please fill in the input field."
    } else{
        error.innerText="";
        // main
    let container = document.querySelector('.container');

    let tasks = document.createElement('div');
    tasks.className = "tasks";
    let taskContentEl = document.createElement('div');
    taskContentEl.className = "task-content";

    let inputEl = document.createElement('input');
    inputEl.type = 'text'
    inputEl.className = 'task'
    inputEl.setAttribute('readonly', 'readonly');
    inputEl.value = inputVal;

    taskContentEl.appendChild(inputEl);
    tasks.appendChild(taskContentEl);

    // Add todo to local storage
    saveLocalTodos(inputVal);

    // actions
    let actions = document.createElement('div');
    actions.className = 'actions';
    // edit button
    let editBtn = document.createElement('button');
    editBtn.className = 'edit';
    let iEditEl = document.createElement('i');
    iEditEl.className = "fa-solid fa-square-pen";

    editBtn.appendChild(iEditEl);
    actions.appendChild(editBtn);

     // delete button
     let delBtn = document.createElement('button');
     delBtn.className = 'delete';
     let iDelEl = document.createElement('i');
     iDelEl.className = "fa-solid fa-trash";
 
     delBtn.appendChild(iDelEl);
     actions.appendChild(delBtn);

     tasks.appendChild(actions);
     
     container.appendChild(tasks);

    //  edit button on click
    editBtn.addEventListener('click', (e)=>{
        const item = e.target;
        const tasks = item.parentElement.parentElement;
        if(editBtn.classList.contains('edit')){
            inputEl.removeAttribute('readonly');
            inputEl.focus();
            editBtn.className = 'save';
            iEditEl.className = "fa-solid fa-clipboard-check";
        } else{
            inputEl.setAttribute('readonly', 'readonly');
            editBtn.className = 'edit';
            iEditEl.className = "fa-solid fa-square-pen";
            updateLocalTodos(tasks);
        }    
        
    })

    // delete button click
    delBtn.addEventListener('click', deleteTask)

    // reset input Value;
    input.value = "";
    }
    
})


function deleteTask(e){
    const item = e.target;
    const tasks = item.parentElement.parentElement;
    const container = tasks.parentElement;
    removeLocalTodos(tasks);
    tasks.classList.add('deleted');
        //remove todo fromlocal storage
        
        setTimeout(()=>{
        tasks.remove();
        },500)

}

// save todo in local storage

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){


        let container = document.querySelector('.container');
    let tasks = document.createElement('div');
    tasks.className = "tasks";
    let taskContentEl = document.createElement('div');
    taskContentEl.className = "task-content";

    let inputEl = document.createElement('input');
    inputEl.type = 'text'
    inputEl.className = 'task'
    inputEl.setAttribute('readonly', 'readonly');
    inputEl.value = todo;

    taskContentEl.appendChild(inputEl);
    tasks.appendChild(taskContentEl);

    // actions
    let actions = document.createElement('div');
    actions.className = 'actions';
    // edit button
    let editBtn = document.createElement('button');
    editBtn.className = 'edit';
    let iEditEl = document.createElement('i');
    iEditEl.className = "fa-solid fa-square-pen";

    editBtn.appendChild(iEditEl);
    actions.appendChild(editBtn);

     // delete button
     let delBtn = document.createElement('button');
     delBtn.className = 'delete';
     let iDelEl = document.createElement('i');
     iDelEl.className = "fa-solid fa-trash";
 
     delBtn.appendChild(iDelEl);
     actions.appendChild(delBtn);

     tasks.appendChild(actions);
     
     container.appendChild(tasks);

    //  edit button on click
    editBtn.addEventListener('click', (e)=>{
        const item = e.target;
        const tasks = item.parentElement.parentElement;
        
    
            if(editBtn.classList.contains('edit')){
            inputEl.removeAttribute('readonly');
            inputEl.focus();
            editBtn.className = 'save';
            iEditEl.className = "fa-solid fa-clipboard-check";
        } else{
            inputEl.setAttribute('readonly', 'readonly');
            editBtn.className = 'edit';
            iEditEl.className = "fa-solid fa-square-pen";  
            
            // const newInput = tasks.children[0].children[0].value
            // console.log(newInput)
            updateLocalTodos(tasks);
        }    
        
    })

    // delete button click
    delBtn.addEventListener('click', deleteTask)


    })

}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todos.indexOf(todo.children[0].children[0].value);
   
   
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function updateLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoValue = todo.children[0].children[0].value;
    const todoIndex = todos.indexOf(todo.children[0].children[0].value)
   

   todos.splice(todoIndex, 1, todoValue)
    localStorage.setItem('todos', JSON.stringify(todos)
)}