const todoFormEl = document.querySelector('.todo-form');
const todoInputEl = todoFormEl.querySelector('.todo-form__input');
const todoListEl = document.querySelector('.todo-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const todoList = (function () {
  const createTask = ({ id, title, isCompleted }) => {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-list__item', 'todo-item');
    todoItem.dataset.id = id;

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
        <span class="todo-item__text ${
          isCompleted ? 'todo-item__text--line-through ' : ''
        }"
          ${!isCompleted ? 'contenteditable' : ''}
        >${title}</span>
      </div>
      <button class="todo-item__btn-delete">X</button>
    `;

    todoItem.innerHTML = todoItemMarkup;

    todoListEl.appendChild(todoItem);
  };

  const deleteTask = (taskId, todoItem) => {
    tasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    todoItem.remove();
  };

  const updateTask = (taskId, targetEl) => {
    let currentTask = tasks.find((task) => task.id === taskId);

    if (targetEl.hasAttribute('contenteditable')) {
      currentTask.title = targetEl.textContent;
    }

    if (targetEl.classList.contains('todo-item__checkbox')) {
      const todoTextEl = targetEl.closest('.todo-item').querySelector('.todo-item__text');

      currentTask.isCompleted = !currentTask.isCompleted;

      if (currentTask.isCompleted) {
        todoTextEl.classList.add('todo-item__text--line-through');
        todoTextEl.removeAttribute('contenteditable');
      } else {
        todoTextEl.classList.remove('todo-item__text--line-through');
        todoTextEl.setAttribute('contenteditable', true);
      }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  return { createTask, deleteTask, updateTask };
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

  const newTask = {
    id: new Date().getTime(),
    title: inputValue,
    isCompleted: false,
  };

  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  todoList.createTask(newTask);

  todoFormEl.reset();
  todoInputEl.focus();
});

todoListEl.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('todo-item__btn-delete')) {
    const todoItem = evt.target.closest('.todo-item');
    const taskId = parseInt(todoItem.dataset.id);

    todoList.deleteTask(taskId, todoItem);
  }
});

todoListEl.addEventListener('input', (evt) => {
  const taskId = parseInt(evt.target.closest('.todo-item').dataset.id);

  todoList.updateTask(taskId, evt.target);
});
