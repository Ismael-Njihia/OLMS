import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../slices/usersApiSlice';
import '../assets/Modal.css';

const CustomModal = ({ show, handleClose }) => {
  const { id } = useParams();
  const { data: users, isLoading } = useGetUsersQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

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
    setSearchTerm(user.email);
    setSearchResults([]); // Clear search results after selecting a user
  };

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
                {user.email}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomModal;
