import axios from 'axios';

import { generateId } from '../../utils/generateId';

export const ADD_TODO = '@@todos/ADD_TODO';
export const CLEAR_COMPLETED_TODOS = '@@todos/CLEAR_COMPLETED_TODOS';
export const LOAD_TODOS = '@@todos/LOAD_TODOS';
export const REMOVE_TODO = '@@todos/REMOVE_TODO';
export const SET_ERROR = '@@todos/SET_ERROR';
export const SET_LOADING = '@@todos/SET_LOADING';
export const UPDATE_TODO = '@@todos/UPDATE_TODO';

const setLoading = () => ({ type: SET_LOADING });
const setError = (err) => ({ type: SET_ERROR, payload: err });

export const loadTodos = () => async (dispatch) => {
  dispatch(setLoading());

  try {
    const res = await axios.get(`http://localhost:3000/todos`);

    dispatch({ type: LOAD_TODOS, payload: res.data });
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const updateTodo = (todo) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.patch(`http://localhost:3000/todos/${todo.id}`, {
      ...todo,
    });

    dispatch({
      type: UPDATE_TODO,
      payload: todo,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    dispatch(setError(err.message));
    return Promise.reject(err.message);
  }
};

export const addTodo = (title) => async (dispatch) => {
  dispatch(setLoading());

  try {
    const res = await axios.post(`http://localhost:3000/todos`, {
      id: generateId(),
      title,
      isCompleted: false,
    });

    dispatch({ type: ADD_TODO, payload: res.data });

    return Promise.resolve(res.data);
  } catch (err) {
    dispatch(setError(err.message));
    return Promise.reject(err.message);
  }
};

export const removeTodo = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    await axios.delete(`http://localhost:3000/todos/${id}`);

    dispatch({ type: REMOVE_TODO, payload: { id } });
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const clearCompletedTodos = (todos) => async (dispatch) => {
  dispatch(setLoading());
  const completedTodosIds = todos
    .filter((todo) => todo.isCompleted === true)
    .map((todo) => todo.id);

  try {
    for (const id of completedTodosIds) {
      await axios.delete(`http://localhost:3000/todos/${id}`);
    }

    dispatch({ type: CLEAR_COMPLETED_TODOS });
  } catch (err) {
    dispatch(setError(err.message));
  }
};
