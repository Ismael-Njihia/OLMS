import {AiOutlineHome} from 'react-icons/ai';
import { BsBoxArrowRight } from 'react-icons/bs';
import { BiTransfer } from 'react-icons/bi';
import {useState} from 'react';
import '../assets/LeftSide.css';
import { Link } from 'react-router-dom';
import {useFetchGenresQuery} from '../slices/GenreApiSlice';
import {Dropdown} from 'react-bootstrap';
import { Modal, Badge } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {useLogoutMutation} from "../slices/usersApiSlice";
import { logout } from '../slices/authSlice';
import {toast} from 'react-toastify';
import { BsPeople } from 'react-icons/bs';
import { FaChartBar } from 'react-icons/fa';
import { FaExclamationCircle } from 'react-icons/fa';
import {useGetTransactionsQuery} from "../slices/TransactionApiSlice"

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

const { data: transactions, error, isLoading: loadingTrans } = useGetTransactionsQuery()

const currentDate = Math.floor(Date.now()/1000);

const overdueTransactions = transactions?.filter((transaction) => {
    const expectedReturnDate = transaction.expected_return_date;
    return currentDate > expectedReturnDate;
})
const count = overdueTransactions?.length;
console.log(count);

 
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
       {
        userInfo && userInfo.user_type === 'admin' && (
          <div className='bookContainer'>
            <div className='links'>
                <Link to='/dashboard' className='homeLink'>
                    <FaChartBar className='homeIcon'/> Dashboard
                </Link>
                </div>
            </div>
        )
       }
       {/**Show transaction button to the User who are admin and staff */}
       {
        userInfo && (userInfo.user_type === 'admin' || userInfo.user_type === 'staff') && (
          <div className='transactionContainer'>
            <div className='links'>
                <Link to='/transactions' className='homeLink'>
                    <BiTransfer className='homeIcon'/> Transactions
                </Link>
                </div>
            </div>
        )
       }
{
        userInfo && (userInfo.user_type === 'admin' || userInfo.user_type === 'staff') && (
          <div className='transactionContainer'>
          <div className='links'>
                <Link to='/overdue' className='homeLink'>
                  <div className="position-relative">
                    <FaExclamationCircle color='red' className='homeIcon' />
                    {count > 0 && (
                      <Badge pill bg="danger" style={{ position: "absolute", top: 0, right: 0 }}>
                        {count}
                      </Badge>
                    )}
                  </div>
                  Overdue
                </Link>
              </div>
            </div>
        )
       }
        {
        userInfo && (userInfo.user_type === 'admin' || userInfo.user_type === 'staff') &&  (
          <div className='userContainer'>
            <div className='links'>
                <Link to='/online' className='homeLink'>
                    <BiTransfer color='white' className='homeIcon'/> Online Transactions
                </Link>
                </div>
            </div>
        ) 
       }


       {/**Show  when there users when the userInfo.user_type */}
       {
        userInfo && (userInfo.user_type === 'admin' || userInfo.user_type === 'staff') &&  (
          <div className='userContainer'>
            <div className='links'>
                <Link to='/users' className='homeLink'>
                    <BsPeople color='white' className='homeIcon'/> users
                </Link>
                </div>
            </div>
        ) 
       }

       {/**Show on Logout when there is userInfo */}
       {userInfo && (
       <div className='logoutContainer'>
        <div className='links'>
            <button to='/' className='homeLink' onClick={handleShowModal}>
                <BsBoxArrowRight  color="red" className='homeIcon'/> Logout
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