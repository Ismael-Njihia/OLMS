import '../assets/Auth.css'
import { Link } from 'react-router-dom'
import OshwalImage from '../assets/images/library.jpg'
import '../assets/Auth.css'

const RegisterPage = () => {
  return (
    <div className='wholeContainer'> 
        <div className='leftLoginSide'>
            <div className='loginImage'>
                <img src={OshwalImage} alt='Oshwal' />
            </div>
        </div>
        <div className='rightLoginSide'>
            {/** have Input for first name, last name, email and password*/}
            <div className='loginForm'>
                <Link to='/' className='linkStyle'>
                  <h1>Oshwal Library </h1>
                </Link>
                <form>
                    <div className='form-group'>
                        <label>First Name</label>
                        <input type='text' className='form-control' placeholder='Enter First Name' />
                    </div>
                    <div className='form-group'>
                        <label>Last Name</label>
                        <input type='text' className='form-control' placeholder='Enter Last Name' />
                    </div>
                    <div className='form-group'>
                        <label>Email</label>
                        <input type='email' className='form-control' placeholder='Enter Email' />
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input type='password' className='form-control' placeholder='Enter Password' />
                    </div>
                    <button type='submit' className='btn btn-primary'>Register</button>
                </form>
                <p className='registerLink '>
                    Already have an account? <Link to='/login'>Login</Link>
                </p>
            </div>

        </div>

    </div>
  )
}

export default RegisterPage