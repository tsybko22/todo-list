const todoFormEl = document.querySelector('.todo-form');
const todoInputEl = todoFormEl.querySelector('.todo-form__input');
const todoListEl = document.querySelector('.todo-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const todoList = (function () {
  const createTask = ({ id, title, isCompleted }) => {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-list__item', 'todo-item');
    todoItem.setAttribute('id', id);

    todoItemMarkup = `
      <div class="todo-item__wrapper">
        <label class="todo-item__label">
          <input
            type="checkbox"
            name="task"
            class="todo-item__checkbox"
            ${isCompleted ? 'checked' : ''}
          />
          <span class="todo-item__box"></span>
        </label>
        <span class="todo-item__text">${title}</span>
      </div>
      <button class="todo-item__btn-delete">X</button>
    `;

    todoItem.innerHTML = todoItemMarkup;

    todoListEl.appendChild(todoItem);
  };

  return { createTask };
})();

if (localStorage.getItem('tasks')) {
  tasks.map((task) => {
    todoList.createTask(task);
  });
}

todoFormEl.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const inputValue = todoInputEl.value;
  if (inputValue.trim().length === 0) {
    alert("Task name can't be empty");
    return;
  }

  const task = {
    id: new Date().getTime(),
    title: inputValue,
    isCompleted: false,
  };

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  todoList.createTask(task);

  todoFormEl.reset();
  todoInputEl.focus();
});
