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
import { addToBasket } from '../slices/basketSlice';
import { useDispatch } from 'react-redux';


const BookPage = () => {

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleShowModal = () => {
    setShowModal(true);
  }
  const handleCloseModal = () => {
    setShowModal(false);
  }
    //get id in url
    const {id} = useParams();
    const decodedId = decodeURIComponent(id);
    //get the Last 4 characters of the id
    const lastFour = decodedId.substr(decodedId.length - 4);
    //get book by id
    const {data: book, isLoading, error} = useGetBookByIdQuery(lastFour);

    //add to Cart
    const addToCartHandler = () => {
      dispatch(addToBasket(book))
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
                onClick={addToCartHandler}
                
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
                
                >
                 Edit
                </Button>
                  )
                }
                </ListGroup.Item>

             
                
            </ListGroup>
          </Card>

          </Col> 

      </Row>
      

    </Layout>
    </>
  )
}

export default BookPage