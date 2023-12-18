import React from 'react'
import '../assets/Auth.css'
import { Link } from 'react-router-dom'
import OshwalImage from '../assets/images/library.jpg'

const LoginPage = () => {
  return (
    <>
    <div className='wholeContainer'>
    <div className='leftLoginSide'>
        <div className='loginImage'>
                    <img src={OshwalImage} alt='Oshwal' />
        </div>
    </div>
    <div className='rightLoginSide'>
        <div className='loginForm'>
            <Link to='/' className='linkStyle'>
            <h1>Oshwal Library </h1>
            </Link>
            <form>
                <div className='form-group'>
                    <label>Email</label>
                    <input type='email' className='form-control' placeholder='Enter Email' />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input type='password' className='form-control' placeholder='Enter Password' />
                </div>
                <button type='submit' className='btn btn-primary'>Login</button>
            </form>
            <p className='registerLink '>
                Don't have an account? <Link to='/register'>Register</Link>
            </p>
        </div>


    </div>
    </div>

    </>
  )
}

export default LoginPage