import {useState, useEffect} from 'react'
import '../assets/Auth.css'
import { Link } from 'react-router-dom'
import OshwalImage from '../assets/images/library.jpg'
import {useLoginMutation} from '../slices/usersApiSlice'
import {useDispatch, useSelector} from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import {toast} from 'react-toastify'
import {useNavigate, useLocation} from 'react-router-dom'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();
    const {userInfo } = useSelector(state => state.auth);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const loginHandler = async (e) => {
        e.preventDefault();
       try {
        const res = await login({email, password}).unwrap();
        console.log(res);
        dispatch(setCredentials(res));
        toast.success('Login Successful');
        navigate('/');
        
       } catch (error) {
        toast.error(error?.data?.error || 'Something went wrong')
        console.log(error);
       }
    }
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
                    <input 
                    type='email'
                    //pick email from state
                    
                    placeholder='Enter Email' 
                    onChange={handleEmailChange} 
                    required value={email}/>
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input type='password' className='form-control' placeholder='Enter Password' onChange={handlePasswordChange} required value={password}/>
                </div>
                <button type='submit'disabled={isLoading} onClick={loginHandler} className='btn btn-primary'>Login</button>
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