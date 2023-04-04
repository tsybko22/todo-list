import {
  ADD_TODO,
  CLEAR_COMPLETED_TODOS,
  LOAD_TODOS,
  REMOVE_TODO,
  SET_ERROR,
  SET_LOADING,
  UPDATE_TODO,
} from './todos-actions';

const initialState = {
  status: 'idle',
  todos: [],
  error: null,
};

export const todosReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;

    case SET_LOADING:
      return {
        ...state,
        status: 'loading',
        error: null,
      };

    case SET_ERROR:
      return {
        ...state,
        error: payload,
        status: 'rejected',
      };

    case LOAD_TODOS:
      return {
        ...state,
        status: 'fulfilled',
        todos: payload,
      };

    case ADD_TODO:
      return {
        ...state,
        status: 'fulfilled',
        todos: [payload, ...state.todos],
      };

    case REMOVE_TODO:
      return {
        ...state,
        status: 'fulfilled',
        todos: state.todos.filter((todo) => todo.id !== payload.id),
      };

    case UPDATE_TODO:
      const updatedTodos = state.todos.map((todo) =>
        todo.id === payload.id ? { ...todo, ...payload } : todo
      );
      return {
        ...state,
        status: 'fulfilled',
        todos: updatedTodos,
      };

    case CLEAR_COMPLETED_TODOS:
      return {
        ...state,
        status: 'fulfilled',
        todos: state.todos.filter((todo) => todo.isCompleted === false),
      };
  }
};

export default todosReducer;
