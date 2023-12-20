import Layout from "../components/Layout"
import Header from "../components/Header"
import {useFetchBooksQuery} from '../slices/BooksApiSlice';
import { Row, Col } from "react-bootstrap";
import '../assets/HomePage.css'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { useState } from "react";

const Homepage = () => {

  const {data: books, isLoading, error} = useFetchBooksQuery();
  const userInfo = useSelector((state) => state.auth);
  const userType = localStorage.getItem('user_type');

  const userType_ = userType?.replace(/['"]+/g, '');
  const isAdmin = userType_ === 'admin';
  const isStaff = userType_ === 'staff';

  //Modal here
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  return (
   <>
    <Header />
    <Layout>
     
      <div className='booksContainer'>
        {
          userInfo && (isAdmin || isStaff) && (
            <button style={{marginBottom: "10px"}} onClick={handleShowModal}>
              Add BOOK
            </button>
          )
        }
        {isLoading ? (
          <h3>Loading...</h3>
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          <Row xs={1} md={2} lg={4}>
  {books &&
    books.map((book) => {
      const shortDescription = book.description_.substring(0, 100);
      const available_copies = book.available_copies;
      const book_id = book.book_id;
      const encodedId = encodeURIComponent(book_id);

      const isNotAvailable = available_copies <= 0;

      return (
        <Col key={book.book_id}>
          <Link to={`/book/${encodedId}`}>
            <div className="bookCard" style={{marginBottom:"10px", position:"relative"}}>
              {isNotAvailable && (
                <div className="overlayEmpty">
                  <p>Not Available</p>
                </div>
              )}
              <div className="bookCard__image" style={{height: "160px", overflow: "hidden"}}>
                <img
                  src={book.image}
                  alt={book.title}
                  style={{width: "100%", height:"100%", objectFit:"cover", objectPosition:"top"}}/>
                </div>


                <div className="bookCard__body">
                  <p className="book_title"> {book.title}</p>
                  <p className="shortDescription">{shortDescription}...</p>
                </div>  
              </div>
            </Link>
        </Col>
      );
    })}
</Row>

        )}
         {/* Modal here */}
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>ADD A BOOK</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
        <button className='btn btn-danger' onClick={handleCloseModal}>
          Close
          </button>
          <button className='btn btn-primary' onClick={handleCloseModal}>
            save changes
            </button>
        </Modal.Footer>
      </Modal>
       </div>
       
    </Layout>

   
   </>
  )
}

export default Homepage