import {AiOutlineHome} from 'react-icons/ai';
import { BsBoxArrowRight } from 'react-icons/bs';
import {useState} from 'react';
import '../assets/LeftSide.css';
import { Link } from 'react-router-dom';
import {useFetchGenresQuery} from '../slices/GenreApiSlice';
import {Dropdown} from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {useLogoutMutation} from "../slices/usersApiSlice";
import { logout } from '../slices/authSlice';
import {toast} from 'react-toastify'

const LeftSide = () => {
  const {data: genres, isLoading} = useFetchGenresQuery();
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state => state.auth);
  
  const [logoutMutation] = useLogoutMutation();
  const [showModal, setShowModal] = useState(false);
  
  const handleLogout = async() => {
    try {
      const res = await logoutMutation().unwrap();
      dispatch(logout());
      toast.success(res.message || 'Logout Successful');
      setShowModal(false);
    } catch (error) {
      toast.error(error?.data?.error || 'Something went wrong');
      console.log(error);
    }

  }
 const handleCloseModal = () => setShowModal(false);
const handleShowModal = () => setShowModal(true);
 
  return (
   <>
   <div className='leftSide'> 
    <div className='leftSideContainer'>
    <div className='importantLinks'>
        <div className='links'>
            <button to='/' className='homeLink'>
                <AiOutlineHome className='homeIcon'/> Home
            </button>
        </div>
        <div>
          <Dropdown className='dropdown'>
            <Dropdown.Toggle variant="primary" id="genre-dropdown">
              Genres 
            </Dropdown.Toggle>
            <Dropdown.Menu className='dropdown-menu'>
                {isLoading ? (
                  <Dropdown.Item>Loading...</Dropdown.Item>
                ) : (
                  genres.map((genre) => (
                    <Dropdown.Item key={genre.genre_id}>
                      <Link to={`/genres/${genre.genre_id}`} className='genreLink'>
                        {genre.genre_name}
                      </Link>
                    </Dropdown.Item>
                  ))
                )}
            </Dropdown.Menu>
       
          </Dropdown>

        </div>
        
       </div>
       {/**Show on when there is userInfo */}
       {userInfo && (
       <div className='logoutContainer'>
        <div className='links'>
            <button to='/' className='homeLink' onClick={handleShowModal}>
                <BsBoxArrowRight className='homeIcon'/> Logout
            </button>
        </div>
        </div>
        )}

    </div>
    </div>
    {/* Logout Modal */}

    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Logout Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to logout?</Modal.Body>
      <Modal.Footer>
        <button className='btn btn-secondary' onClick={handleCloseModal}>
          Cancel
        </button>
        <button className='btn btn-primary' onClick={handleLogout}>
          Logout
        </button>
      </Modal.Footer>
    </Modal>
   </>
  )
}

export default LeftSide