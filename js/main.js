const addTaskContent = document.getElementById('addTaskContent');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const changeButton = document.getElementById('changeButton');

const startConf = () => {
  // baslangic ayarlari
  const todos = JSON.parse(localStorage.getItem('todos'));
  if (!todos) {
    localStorage.setItem('todos', JSON.stringify([]));
  } else {
    todos.forEach(todo => {
      addHTML(todo);
    });
  }
};

const addTodo = e => {
  const inputVal = addTaskContent.value;
  const todo = {
    text: inputVal
  };

  if (inputVal == '') {
    // Boş değer girilmeye çalışıyor ise hata veriyoruz
    errorToast();
  } else {
    const todos = JSON.parse(localStorage.getItem('todos'));
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    addHTML(todo);
    addTaskContent.value = '';
    successToast();
  }
};

function deleteTodo(item) {
  const todo = item.target.parentElement;
  liList = JSON.parse(localStorage.getItem('todos'));
  let li = liList.find(li => li.text === todo.textContent);
  liList.splice(liList.indexOf(li), 1);
  localStorage.setItem('todos', JSON.stringify(liList));
  todo.remove();
}

function complete(item) {
  const todo = item.target;
  todo.classList.toggle('line-through');
}

const addHTML = todo => {
  const todoLi = document.createElement('li');
  todoLi.classList.add('todo');

  const todoText = document.createElement('span');
  todoText.classList.add('todo_text');
  todoText.textContent = todo.text;

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', deleteTodo);
  todoLi.appendChild(todoText);
  todoLi.appendChild(deleteBtn);
  taskList.appendChild(todoLi);
  todoLi.addEventListener('click', complete);
};

function successToast() {
  let toast = document.querySelector('#successToast');
  let toastAdd = new bootstrap.Toast(toast);
  toastAdd.show();
}

function errorToast() {
  let toast = document.querySelector('#errorToast');
  let toastAdd = new bootstrap.Toast(toast);
  toastAdd.show();
}

startConf();

function changeTheme() {
  const element = document.querySelector('.main');
  element.classList.toggle('dark-mode');
  changeButton.classList.toggle('dark-btn');
}

changeButton.addEventListener('click', changeTheme);
