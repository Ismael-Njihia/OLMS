import {AiOutlineHome} from 'react-icons/ai';
import '../assets/LeftSide.css';
import { Link } from 'react-router-dom';

const LeftSide = () => {
 
  return (
   <>
   <div className='leftSide'> 
   <div className='leftSideContainer'>
    <div className='importantLinks'>
        <div className='links'>
            <Link to='/' className='homeLink'>
                <AiOutlineHome className='homeIcon'/> Home
            </Link>
        </div>
        </div>

    </div>
   </div>
   </>
  )
}

export default LeftSide