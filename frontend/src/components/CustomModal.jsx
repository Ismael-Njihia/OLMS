import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../slices/usersApiSlice';
import '../assets/Modal.css';
import {useCreateTransactionMutation} from '../slices/TransactionApiSlice'
import { toast } from 'react-toastify';

const CustomModal = ({ show, handleClose }) => {
  const { id } = useParams();
  const { data: users, isLoading } = useGetUsersQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [borrower_id, setBorrower_id] = useState(null);

  console.log(borrower_id)

  const [createTransaction, {isLoading: isCreating}] = useCreateTransactionMutation()

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
  //create transaction
  const handleTransaction = async (e)=>{
    e.preventDefault();
    const transactionDetails ={
        book_id: id,
        borrower_id: borrower_id,
        cost: 100
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
          <Modal.Title>Give Book with Id {id}</Modal.Title>
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

export default CustomModal;
