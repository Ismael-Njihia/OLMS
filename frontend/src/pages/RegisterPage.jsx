import '../assets/Auth.css'
import { Link } from 'react-router-dom'
import OshwalImage from '../assets/images/library.jpg'
import {useRegisterMutation} from '../slices/usersApiSlice'
import {useDispatch, useSelector} from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import {toast} from 'react-toastify'
import {useNavigate, useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react'

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [register, {isLoading}] = useRegisterMutation();

    const {userInfo } = useSelector(state => state.auth);
    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/';
    useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect])

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
     }
//rename firstName to first_name
const first_name = firstName;
const last_name = lastName;

    
     const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await register({first_name,last_name, email, password}).unwrap();
            console.log(res);
            dispatch(setCredentials(res));
            toast.success('Registration Successful');
            navigate('/');
        } catch (error) {
            toast.error(error?.data?.message || 'Something went wrong')
            console.log(error);
            
        }
     }
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
                        <input 
                        type='text'
                         className='form-control' 
                         placeholder='Enter First Name'
                         onChange={handleFirstNameChange} 
                         required
                         value={firstName}
                         />
                    </div>
                    <div className='form-group'>
                        <label>Last Name</label>
                        <input 
                        type='text'
                         className='form-control' 
                         placeholder='Enter Last Name' 
                         onChange={(e) => setLastName(e.target.value)}
                         value={lastName}
                         />
                    </div>
                    <div className='form-group'>
                        <label>Email</label>
                        <input
                         type='email' 
                         className='form-control'
                          placeholder='Enter Email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                           />
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input 
                        type='password'
                         className='form-control'
                          placeholder='Enter Password' 
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                          />
                    </div>
                    <button 
                    type='submit'
                     className='btn btn-primary'
                        disabled={isLoading}
                        onClick={handleRegister}
                     >Register</button>
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