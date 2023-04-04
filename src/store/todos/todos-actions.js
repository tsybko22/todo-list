export const ADD_TODO = '@@todos/ADD_TODO';
export const CLEAR_COMPLETED_TODOS = '@@todos/CLEAR_COMPLETED_TODOS';
export const LOAD_TODOS = '@@todos/LOAD_TODOS';
export const REMOVE_TODO = '@@todos/REMOVE_TODO';
export const SET_ERROR = '@@todos/SET_ERROR';
export const SET_LOADING = '@@todos/SET_LOADING';
export const UPDATE_TODO = '@@todos/UPDATE_TODO';

const setLoading = () => ({ type: SET_LOADING });
const setError = (err) => ({ type: SET_ERROR, payload: err });

export const loadTodos =
  () =>
  async (dispatch, _, { db, api }) => {
    try {
      dispatch(setLoading());
      const { docs } = await api.getDocs(db);
      const data = docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      dispatch({ type: LOAD_TODOS, payload: data });
    } catch (err) {
      dispatch(setError(err));
    }
  };

export const updateTodo =
  (todo) =>
  async (dispatch, _, { db, api }) => {
    try {
      dispatch(setLoading());
      const todoDoc = api.doc(db, todo.id);
      await api.updateDoc(todoDoc, {
        title: todo.title,
        isCompleted: todo.isCompleted,
      });

      dispatch({ type: UPDATE_TODO, payload: { ...todo } });
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

export const addTodo =
  (title) =>
  async (dispatch, _, { db, api }) => {
    try {
      dispatch(setLoading());
      const newTodo = { title, isCompleted: false };
      const data = await api.addDoc(db, {
        ...newTodo,
      });

      dispatch({ type: ADD_TODO, payload: { id: data.id, ...newTodo } });
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

export const removeTodo =
  (id) =>
  async (dispatch, _, { db, api }) => {
    try {
      dispatch(setLoading());
      const todoDoc = api.doc(db, id);
      await api.deleteDoc(todoDoc);

      dispatch({ type: REMOVE_TODO, payload: { id } });
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

export const clearCompletedTodos =
  (todos) =>
  async (dispatch, _, { db, api }) => {
    try {
      const completedTodosIds = todos
        .filter((todo) => todo.isCompleted === true)
        .map((todo) => todo.id);

      await Promise.all(
        completedTodosIds.map(async (id) => {
          const todoDoc = api.doc(db, id);
          await api.deleteDoc(todoDoc);
        })
      );

      dispatch({ type: CLEAR_COMPLETED_TODOS });
    } catch (err) {
      dispatch(setError(err.message));
    }
  };
