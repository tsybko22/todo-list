export const selectVisibleTodos = (state, filter) => {
  switch (filter) {
    default: {
      return state.todos;
    }
    case 'all': {
      return state.todos;
    }
    case 'active': {
      return state.todos.filter((todo) => !todo.isCompleted);
    }
    case 'completed': {
      return state.todos.filter((todo) => todo.isCompleted);
    }
  }
};
