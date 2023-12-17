import React from 'react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from 'react-router-dom'
import LeftSide from './components/LeftSide'
import Header from './components/Header'

const App = () => {
  return (
    <>
      <Header />
      <LeftSide />
      <Outlet />
      <ToastContainer />
    </>
  )
}

export default App