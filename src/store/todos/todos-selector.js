export const selectVisibleTodos = ({ todos }, filter) => {
  switch (filter) {
    default:
      return todos;
    case 'active':
      return todos.filter((todo) => !todo.isCompleted);
    case 'completed':
      return todos.filter((todo) => todo.isCompleted);
  }
};
