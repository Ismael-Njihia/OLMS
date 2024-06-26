import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import store from './store';
import {PayPalScriptProvider} from '@paypal/react-paypal-js';

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
import DashboardPage from './pages/DashboardPage';
import CartPage from './pages/CartPage';
import Overdue from './pages/Overdue';
import Duration from './pages/Duration';
import Payment from './pages/Payment';
import Read from './pages/Read';
import Online from './pages/Online';

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
          <Route path='/users' element={<UsersPage />} />
         <Route path='/user/:id' element={<UserPage />} />
         <Route path='/cart' element={<CartPage />} />
         <Route path='/overdue' element={<Overdue />} />
          <Route path='/duration' element={<Duration />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/read' element={<Read />} />
          <Route path='/online' element={<Online />} />
          
        </Route>
       
        <Route path='/' element={<StaffRoute/>} >
       
          

        </Route>
        <Route path='/' element={<AdminRoute/>} >
          
         
          <Route path='/dashboard' element={<DashboardPage />} />
         

          </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
      <RouterProvider router={routes}/>
        </PayPalScriptProvider>
      
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
