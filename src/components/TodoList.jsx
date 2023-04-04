import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { clearCompletedTodos, loadTodos } from '../store/todos/todos-actions';
import { selectVisibleTodos } from '../store/todos/todos-selector';

import TodoItem from './TodoItem';

const TodoList = () => {
  const dispatch = useDispatch();
  const { filter } = useParams();
  const todos = useSelector((state) => selectVisibleTodos(state, filter));
  const { error, status } = useSelector((state) => state);

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  if (error || status === 'rejected') {
    return (
      <h1 className="mt-11 text-bold text-3xl text-gray-300 text-center">
        Unexpected error
      </h1>
    );
  }

  if (status === 'loading') {
    return (
      <h1 className="mt-11 text-bold text-3xl text-gray-300 text-center">
        Loading...
      </h1>
    );
  }

  if (!todos.length) {
    return (
      <h1 className="mt-11 text-bold text-3xl text-gray-300 text-center">
        No {filter === 'all' ? null : filter} todos.
      </h1>
    );
  }

  return (
    <>
      <ul className="flex flex-col gap-5 mt-8">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
          />
        ))}
      </ul>

      {filter !== 'active' && (
        <button
          aria-label="Clear completed"
          className="block m-auto mt-5 text-gray-500 font-bold cursor-pointer decoration-dotted hover:underline active:text-gray-400"
          onClick={() => {
            dispatch(clearCompletedTodos(todos));
          }}
        >
          Clear completed
        </button>
      )}
    </>
  );
};

export default TodoList;
