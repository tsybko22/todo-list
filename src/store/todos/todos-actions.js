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
  try {
    dispatch(setLoading());

    const { data } = await axios.get(`http://localhost:3000/todos`);

    dispatch({ type: LOAD_TODOS, payload: data });
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const updateTodo = (todo) => async (dispatch) => {
  try {
    dispatch(setLoading());

    const { data } = await axios.patch(
      `http://localhost:3000/todos/${todo.id}`,
      { ...todo }
    );

    dispatch({ type: UPDATE_TODO, payload: data });
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const addTodo = (title) => async (dispatch) => {
  try {
    dispatch(setLoading());

    const { data } = await axios.post(`http://localhost:3000/todos`, {
      id: generateId(),
      title,
      isCompleted: false,
    });

    dispatch({ type: ADD_TODO, payload: data });
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const removeTodo = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());

    await axios.delete(`http://localhost:3000/todos/${id}`);

    dispatch({ type: REMOVE_TODO, payload: { id } });
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const clearCompletedTodos = (todos) => async (dispatch) => {
  try {
    const completedTodosIds = todos
      .filter((todo) => todo.isCompleted === true)
      .map((todo) => todo.id);

    await Promise.all(
      completedTodosIds.map(async (id) => {
        await axios.delete(`http://localhost:3000/todos/${id}`);
      })
    );

    dispatch({ type: CLEAR_COMPLETED_TODOS });
  } catch (err) {
    dispatch(setError(err.message));
  }
};
