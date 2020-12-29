import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { loadFromLocalStorage, saveToLocalStorage } from './store/persist';
import { Provider } from 'react-redux';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-modern-calendar-datepicker/lib/DatePicker.css'
import reportWebVitals from './reportWebVitals';

import reducer from './store';

const persistedState = loadFromLocalStorage();
const store = configureStore({ reducer, preloadedState: persistedState });
store.subscribe(() => saveToLocalStorage(store.getState()));


ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
