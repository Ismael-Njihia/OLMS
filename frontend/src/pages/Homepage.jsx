import Layout from "../components/Layout"
import Header from "../components/Header"
import {useFetchBooksQuery} from '../slices/BooksApiSlice';
import { Row, Col } from "react-bootstrap";
import '../assets/HomePage.css'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal,Form, FormGroup } from "react-bootstrap";
import { useState } from "react";
import { useFetchGenresQuery } from "../slices/GenreApiSlice";
import {useAddBookMutation} from '../slices/BooksApiSlice';	
import {toast } from 'react-toastify';

const Homepage = () => {

  const {data: books, isLoading, error} = useFetchBooksQuery();
  const {data: genres} = useFetchGenresQuery();
  const [addBook, {isLoading: loadingCreatingBook}] = useAddBookMutation();

  const userInfo = useSelector((state) => state.auth);
  const userType = localStorage.getItem('user_type');

  const userType_ = userType?.replace(/['"]+/g, '');
  const isAdmin = userType_ === 'admin';
  const isStaff = userType_ === 'staff';
  //book details
  const[title, bookTitle] = useState('');
  const[author, bookAuthor] = useState('');
  const[isbn, bookIsbn] = useState('');
  const[genre, bookGenre] = useState('');
  const[published_date, bookPublishedDate] = useState('');
  const[total_copies, bookTotalCopies] = useState('');
  const [image_url, bookImageUrl] = useState('');
  const [description_, bookDescription] = useState('');
   
  //add book
  const handleCreateBook = async (e) => {
    if(!title || !author || !isbn || !genre || !published_date || !total_copies || !image_url || !description_){
      toast.error('Please fill all fields');
      return;
    }
    e.preventDefault();
    const bookDetails = {
      title,
      author,
      isbn,
      genre,
      published_date,
      total_copies: parseInt(total_copies),
      image_url,
      description: description_
    }
  try {
    const res = await addBook(bookDetails).unwrap();
    toast.success(res.message|| 'Book Added Successfully');
    //reset form
    bookTitle('');
    bookAuthor('');
    bookIsbn('');
    bookGenre('');
    bookPublishedDate('');
    bookTotalCopies('');
    bookImageUrl('');
    bookDescription('');
    //close modal
    handleCloseModal();
    
  } catch (error) {
    console.log(error);
    toast.error(error?.data?.error || 'Something went wrong');
    
  }
  }

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
        <Form>
          <Form.Group controlId='title'>
            <Form.Label style={{fontSize:'14px', fontWeight:"bold"}}>Title</Form.Label>
            <Form.Control style={{fontSize:'14px', marginBottom:"15px"}}
              type='text'
              placeholder='Enter Title'
              value={title}
              onChange={(e) => bookTitle(e.target.value)}
            ></Form.Control>
          </Form.Group>

         <Form.Group controlId='author'>
            <Form.Label style={{fontSize:'14px', fontWeight:"bold"}}>Author</Form.Label>
            <Form.Control style={{fontSize:'14px', marginBottom:"15px"}}
              type='text'
              placeholder='Enter Author'
              value={author}
              onChange={(e) => bookAuthor(e.target.value)}
            ></Form.Control>
          </Form.Group>


          <Form.Group controlId='isbn'>
            <Form.Label style={{fontSize:'14px', fontWeight:"bold"}}>ISBN</Form.Label>
            <Form.Control style={{fontSize:'14px', marginBottom:"15px"}}
              type='text'
              placeholder='Enter Book ISBN'
              value={isbn}
              onChange={(e) => bookIsbn(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/**Genre are dropdow pick from genre*/}
          <Form.Group controlId='genre'>
            <Form.Label style={{fontSize:'14px', fontWeight:"bold"}}>Genre</Form.Label>
            <Form.Control style={{fontSize:'14px', marginBottom:"15px"}}
              as='select'
              value={genre}
              onChange={(e) => bookGenre(e.target.value)}
            >
              <option value=''>Select Genre</option>
              {genres &&
                genres.map((genre) => (
                  <option key={genre.genre_id} value={genre.genre_id}>
                    {genre.genre_name}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='publishing Date'>
            <Form.Label style={{fontSize:'14px', fontWeight:"bold"}}>Year Of Publishing</Form.Label>
            <Form.Control style={{fontSize:'14px', marginBottom:"15px"}}
              type='text'
              placeholder='Enter Book Year Of Publishing'
              value={published_date}
              onChange={(e) => bookPublishedDate(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='total copies'>
            <Form.Label style={{fontSize:'14px', fontWeight:"bold"}}>Total Copies</Form.Label>
            <Form.Control style={{fontSize:'14px', marginBottom:"15px"}}
              type='number'
              placeholder='Enter Book Total Copies'
              value={total_copies}
              onChange={(e) => bookTotalCopies(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='Image'>
            <Form.Label style={{fontSize:'14px', fontWeight:"bold"}}>Image URL</Form.Label>
            <Form.Control style={{fontSize:'14px', marginBottom:"15px"}}
              type='text'
              placeholder='Enter Book Image URL'
              value={image_url}
              onChange={(e) => bookImageUrl(e.target.value)}
            ></Form.Control>
          </Form.Group>

          

          <Form.Group controlId='description'>
            <Form.Label style={{fontSize:'14px', fontWeight:"bold"}}>Book Description</Form.Label>
            <Form.Control style={{fontSize:'14px', marginBottom:"15px"}}
              type='text'
              placeholder='A Brief Description of the Book'
              value={description_}
              onChange={(e) => bookDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
        <button 
        disabled={loadingCreatingBook}
        className='btn btn-danger' onClick={handleCloseModal}>
          Close
          </button>
          <button 
          disabled={loadingCreatingBook}
          className='btn btn-primary' onClick={handleCreateBook}>
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