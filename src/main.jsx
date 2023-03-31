import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './store';

import App from './App';
import NotFound from './components/NotFound';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<App />}
          >
            <Route
              path=":filter"
              element={<App />}
            />
          </Route>
          <Route
            path="not-found"
            element={<NotFound />}
          />
          <Route
            path="*"
            element={
              <Navigate
                to="/notfound"
                replace
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
