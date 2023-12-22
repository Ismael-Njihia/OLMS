import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import store from './store';

import Homepage from './pages/Homepage';
import BookPage from './pages/BookPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GenrePage from './pages/GenrePage';
import Profile from './pages/Profile';
import UsersPage from './pages/UsersPage';
import TransactionPage from './pages/TransactionPage';
import UserPage from './pages/UserPage';
import IndividualPage from './pages/IndividualPage';


//Authorization Control
import AdminRoute from './components/AdminRoute';
import UserRoute from './components/UserRoute';
import StaffRoute from './components/StaffRoute';
const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<Homepage />} />
        
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/genres/:id' element={<GenrePage />} />
        <Route path="/book/:id" element={<BookPage />} />
        
        <Route path='/' element={<UserRoute/>} >
         
          <Route path='/profile' element={<Profile />} />
          <Route path='/transactions' element={<TransactionPage />} />
          <Route path='/transaction/:id' element={<IndividualPage />} />
          
        </Route>
       
        <Route path='/' element={<StaffRoute/>} >
          
          

        </Route>
        <Route path='/' element={<AdminRoute/>} >
          <Route path='/users' element={<UsersPage />} />
          <Route path='/user/:id' element={<UserPage />} />

          </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes}/>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
