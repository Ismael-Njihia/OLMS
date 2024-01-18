import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../slices/usersApiSlice';
import '../assets/Modal.css';
import {useManyTransactionMutation} from '../slices/TransactionApiSlice'
import { toast } from 'react-toastify';
import {useSelector} from 'react-redux'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useGetSettingsQuery} from '../slices/setingsApiSlice';

const CustomMany = ({ show, handleClose }) => {
  const { id } = useParams();
  const basketItems = useSelector((state) => state.cart.cartItems);
  //get book id's from the basketItems
 const bookIds = basketItems.map((book) => book.book_id);
 console.log(bookIds);
  const count = bookIds.length;
  const { data: users, isLoading } = useGetUsersQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [borrower_id, setBorrower_id] = useState(null);

  const [expected_return_date, setExpected_return_date] = useState(null);

  const { data: settings, isLoading: isLoadingSettings } = useGetSettingsQuery();
  const price = settings?.[0].price;

  const [createTransaction, {isLoading: isCreating}] = useManyTransactionMutation()

  // Handle user input change
  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    // Clear search results if the search term is empty
    if (term.trim() === '') {
      setSearchResults([]);
      return;
    }

    // Search logic
    const results = users.filter((user) =>
      user.email.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
  };

  // Handle user click on search result
  const handleUserClick = (user) => {
    setSelectedUser(user);
    console.log(user);
    setSearchTerm(user.email);
    setBorrower_id(user.user_id);
    setSearchResults([]); 
  };

  const handleDateChange = (date) => {
    const formattedDateInSec = Math.floor(date.getTime()/1000);
    setExpected_return_date(formattedDateInSec);
     console.log(formattedDateInSec);
  }

  //set borrow date
  const borrowDate = new Date();
  const formattedBorrowDateInSec = Math.floor(borrowDate.getTime()/1000);
  console.log(formattedBorrowDateInSec);

  //calculate days between borrow date and expected return date
  const days = (expected_return_date - formattedBorrowDateInSec)/(60*60*24);
  //round of days to nearest whole number
  const roundedDays = Math.round(days);

  const cost = price * roundedDays;

  //create transaction
  const handleTransaction = async (e)=>{
    e.preventDefault();
    const transactionDetails ={
        book_ids: bookIds,
        borrower_id: borrower_id,
        cost: cost,
        borrow_date: formattedBorrowDateInSec,
        expected_return_date: expected_return_date
    }
    try {
        const res = await createTransaction(transactionDetails).unwrap();
        toast.success(res.message || 'Transaction created successfully');
        //clear form
        setSearchTerm('');
        setSelectedUser(null);
        setSearchResults([]);
        //close modal
        handleClose();
        //refresh page
        window.location.reload();
    } catch (error) {
        toast.error(error.data.message || 'Something went wrong');
        console.log(error);
        
    }

  }
  

  return (
    <div className="modalContainer">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>The Number of Books You're giving is {count}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId='searchUser'>
            <Form.Label>Search User by email</Form.Label>
            <Form.Control
              type='text'
              placeholder='Search User by email'
              value={searchTerm}
              onChange={handleInputChange}
            />
          </Form.Group>
          <ul className='unOrderedList'>
            {searchResults.map((user) => (
              <li key={user.id} onClick={() => handleUserClick(user)}>
                {user.email + " " + "Name: "+ user.first_name +" "+ user.last_name}
              </li>
            ))}
          </ul>
          <br></br>
          {
            selectedUser &&(
              <div className='borrowDate'>
              <Form.Group controlId='borrowDate'>
                <Form.Label>Borrow Date</Form.Label>
                <DatePicker
                selected={new Date()}
                disabled
                dateFormat='dd/MM/yyyy HH:mm:ss'
                className='form-control'>

                </DatePicker>
                </Form.Group>
              </div>
            )
          }
          <br>
          </br>
          {selectedUser && (
            <div className='selectReturnDate'>
              <Form.Group controlId='returnDate'>
                <Form.Label>Return Date</Form.Label>
                <DatePicker
                //if expeccted date is not set, set it to current date
                selected={expected_return_date ? new Date(expected_return_date * 1000) : new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
                  onChange={(date) => handleDateChange(date)}
                  minDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
                  dateFormat='dd/MM/yyyy HH:mm:ss'
                  className='form-control'
                />
                </Form.Group>
              </div>
          )}
          <br></br>
          {
            selectedUser && expected_return_date !== null && expected_return_date !== undefined &&(
              <div className='cost'>
              <Form.Group controlId='cost'>
                <Form.Label>Cost</Form.Label>
                <Form.Control
                  type='text'
                  placeholder={`KSH ${price} per day`}
                  value={`KSH ${cost}`}
                  disabled
                />
              </Form.Group>
              </div>
            )
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleTransaction}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomMany;
