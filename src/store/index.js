import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, createStore } from 'redux';

import thunk from 'redux-thunk';

import { todosReducer as todos } from './todos/todos-reducer';

export const store = createStore(
  todos,
  composeWithDevTools(applyMiddleware(thunk))
);
