import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { api, todosCollection } from '../firebase/config';

import { todosReducer as todos } from './todos/todos-reducer';

export const store = createStore(
  todos,
  composeWithDevTools(
    applyMiddleware(
      thunk.withExtraArgument({
        db: todosCollection,
        api,
      })
    )
  )
);
