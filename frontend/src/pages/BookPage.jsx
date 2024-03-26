import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import {useGetBookByIdQuery} from '../slices/BooksApiSlice';
import '../assets/HomePage.css'
import { Link } from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CustomModal from '../components/CustomModal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Form } from 'react-bootstrap';
import { useFetchGenresQuery } from "../slices/GenreApiSlice";
import { useNavigate } from 'react-router-dom';
import { addToBasket } from '../slices/cartSlice';
import {setBookPdf} from '../slices/readSlice';
import { toast } from 'react-toastify';
import { useUploadImageMutation} from '../slices/BooksApiSlice';	
import {useEditABookMutation} from '../slices/BooksApiSlice'



const BookPage = () => {
     //get id in url
     const {id} = useParams();
     const decodedId = decodeURIComponent(id);
     //get the Last 4 characters of the id
     const lastFour = decodedId.substr(decodedId.length - 4);

  const [uploadImage, {isLoading: loadingUploadingImage}] = useUploadImageMutation(lastFour);

  const [showModal, setShowModal] = useState(false);
  const [editBook, {isloading: loadingEdit}] = useEditABookMutation()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {data: genres} = useFetchGenresQuery();
  const handleShowModal = () => {
    setShowModal(true);
  }
  const handleCloseModal = () => {
    setShowModal(false);
  }
 
    const {data: book, isLoading, error, refetch} = useGetBookByIdQuery(lastFour);
    const authorEdit = book?.author || "Not available";
    const descriptionEdit = book?.description_ || "Not available";
    const image_urlEdit = book?.image_url || "Not available";
    const isbnEdit = book?.isbn || "Not available";
    const titleEdit = book?.title || "Not available";
    const total_copiesEdit = book?.total_copies || "Not available";
    const bookPdf = book?.image_url;
    
    //let bookPDF = "/Pdf/dsa.pdf";
    
    const handleAddToBasket = () => {
      dispatch(addToBasket(book));
      navigate('/cart');
    };

    const readOnlineHandler = () => {
      console.log(bookPdf + "read Online Handler");
      if(!book){
        console.error("Book not found");
        return;
      }
      dispatch(setBookPdf(bookPdf));
      navigate('/duration');
    }
   

   const userInfo = useSelector((state) => state.auth);
   //get user_type in local storage
    const userType = localStorage.getItem('user_type');
    //remove double quotes from user_type
    const userType_ = userType?.replace(/['"]+/g, '');
    //check if user_type is admin
    const isAdmin = userType_ === 'admin';
    //check if user_type is staff
    const isStaff = userType_ === 'staff';
  //book details
  const[title, bookTitle] = useState(titleEdit);
  const[author, bookAuthor] = useState(authorEdit);
  const[isbn, bookIsbn] = useState(isbnEdit);
  const[genre, bookGenre] = useState('');
  const[published_date, bookPublishedDate] = useState('');
  const[total_copies, bookTotalCopies] = useState(total_copiesEdit);
  const [image_url, bookImageUrl] = useState(image_urlEdit);
  const [description_, bookDescription] = useState(descriptionEdit);
   
// uploading an Image
const uploadImageHandler = async(e)=>{
  const formData = new FormData();
  formData.append('image', e.target.files[0]);

  try {
    const res = await uploadImage(formData).unwrap();
    bookImageUrl(res.image);
    toast.success(res.message)

  } catch (error) {
    console.log(error);
    toast.error(error?.data?.error || 'Something went wrong');
  }
}


  const handleEditBook = async (e) => {
    e.preventDefault();

    // if(isNaN(total_copies)){
    //   toast.error('Total copies must be a number');
    //   return;
    // }
    // if(total_copies < 1){
    //   toast.error('Total copies must be greater than 0');
    //   return;
    // }
   
    const bookDetails = {
      id: lastFour,
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
    const res = await editBook(bookDetails).unwrap();
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
  const [showModal2, setShowModal2] = useState(false);
  const handleCloseModal2 = () => setShowModal2(false);
  const handleShowModal2 = () => setShowModal2(true);

  return (
    <>
    <Header />
    <Layout>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {isLoading && <h2>Loading...</h2>}

      <Row>
        <Col md={5}>
          <div className=''>
          <Image className="" src={book?.image_url} alt={book?.title} fluid />
          </div>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h4>{book?.title}</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>Author: {book?.author}</h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>Genre: {book?.genre?.genre_name}</h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>ISBN: {book?.isbn}</h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>{ book?.available_copies > 0 ?(
                <p style={{color:"green", fontWeight:"bold"}}>Available</p>
              ) : (
                <p style={{color:"red", fontWeight:"bold"}}>Not Available</p>
              )
              }</h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>Year of Publishing: {book?.published_date}</h6>
            </ListGroup.Item>

            </ListGroup>

        </Col>
        <Col md={4}>
          <ListGroup variant='info'>
            <ListGroup.Item>
              <p> {book?.description_}</p>
            </ListGroup.Item>
            </ListGroup>
          </Col>
         <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
            <ListGroup.Item>
                <Row>
                  {
                    (userInfo && (isStaff || isAdmin))&&(
                      <>
                      <Col><strong>Added By:  {book?.user?.first_name + " "+ book?.user?.last_name}</strong></Col>
                      </>
                    )
                  }
                  
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  {

                    (userInfo && (isStaff || isAdmin))&&(
                      <>
                      <Col><strong>Available Copies:  {book?.available_copies}</strong></Col>
                      </>
                    )
                  }
                  
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  {
                    (userInfo && (isStaff || isAdmin))&&(
                      <>
                      <Col><strong>Total Copies:  {book?.total_copies}</strong></Col>
                      </>
                    )
                  }
                  
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  {
                    (userInfo && (isStaff || isAdmin))&&(
                      <>
                      <Col><strong>Borrowed Copies:  {(book?.total_copies) - book?.available_copies }</strong></Col>
                      </>
                    )
                  }
                  
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {
                  (userInfo && (isStaff || isAdmin))&&(
                <Button 
                className='btn-varient-info btn-block'
                type='button'
                disabled={book?.available_copies === 0}
                onClick={handleAddToBasket}
                >
                  Add to Basket
                </Button>
                  )
                }
                </ListGroup.Item>

                <ListGroup.Item>
                {
                  (userInfo && (isStaff || isAdmin))&&(
                <Button 
                className='btn-varient-info btn-block'
                type='button'
                disabled={book?.available_copies === 0}
                onClick={handleShowModal}
                >
                 Give to User
                </Button>
                  )
                }
                </ListGroup.Item>
                {/**Render the Modal */}
                <CustomModal show={showModal} handleClose={handleCloseModal} />

                <ListGroup.Item>
                {
                  (userInfo && (isStaff || isAdmin))&&(
                <Button 
                className='btn-varient-info btn-block'
                type='button'
                onClick={handleShowModal2}
                
                >
                 Edit
                </Button>
                  )
                }
                </ListGroup.Item>

                <ListGroup.Item>
                  { 
                  <Button
                  className='btn-varient-info btn-block'
                  type='button'
                  onClick={readOnlineHandler}
                  >
                    Read Online
                  </Button>

                  }
                  </ListGroup.Item>

             
                
            </ListGroup>
          </Card>

          </Col> 

      </Row>
      

    </Layout>

   {/* Modal here */}
   <Modal show={showModal2} onHide={handleCloseModal2}>
      <Modal.Header closeButton>
        <Modal.Title>EDIT A BOOK</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId='title'>
            <Form.Label style={{fontSize:'14px', fontWeight:"bold"}}>Title</Form.Label>
            <Form.Control style={{fontSize:'14px', marginBottom:"15px"}}
              type='text'
              value={title }
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
              disabled
              required
              onChange={(e) => bookImageUrl(e.target.value)}
            >
            </Form.Control>
            <br/>
            <Form.Control
            type="file"
            id="image-file"
            label="choose Image File"
            custom
            onChange={uploadImageHandler}
            >
            </Form.Control>
          </Form.Group>
           <br/>
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
        disabled={loadingEdit}
        className='btn btn-danger' onClick={handleCloseModal2}>
          Close
          </button>
          <button 
          disabled={loadingEdit}
          className='btn btn-primary' onClick={handleEditBook}>
            save changes
            </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default BookPage