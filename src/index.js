import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from './reportWebVitals';

import reducer from './store';
// import { userLoggedIn } from './store/login';

const store = configureStore({ reducer });

// const user = {
//   id: 'sc10266',
//   firstName: 'SC/2017/10266',
//   username: 'Pabasara',
//   role: 'student',
//   courses: ['CSC2233', 'CSC2263', 'CSC2272']
// };

// const user = {
//   id: 'med1',
//   firstName: 'John',
//   username: 'Doe',
//   role: 'medical',
// }

// const user = {
//   id: 'admin1',
//   firstName: 'Damitha',
//   username: 'Amarakoon',
//   country: 'Sri lanka',
//   role: 'admin',
// }

// store.dispatch(userLoggedIn(user));

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
