import React from 'react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from 'react-router-dom'


const App = () => {
  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  )
}

export default App