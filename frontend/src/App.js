import React from 'react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from 'react-router-dom'
import LeftSide from './components/LeftSide'

const App = () => {
  return (
    <>
      <LeftSide />
      <Outlet />
      <ToastContainer />
    </>
  )
}

export default App