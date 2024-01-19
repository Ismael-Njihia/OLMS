import Header from "../components/Header"
import Layout from "../components/Layout"
import { useSelector, useDispatch } from 'react-redux';
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import { FaTrash } from "react-icons/fa";
import {removeFromBasket, clearFromBasket} from '../slices/cartSlice'
import {Link, useNavigate} from 'react-router-dom'
import CustomMany from "../components/CustomMany";
import { useState } from "react";


const CartPage = () => {
  const basketItems = useSelector((state) => state.cart.cartItems);
  const { userInfo } = useSelector((state) => state.auth);
  const userType = localStorage.getItem('user_type');
  const userType_ = userType?.replace(/['"]+/g, '');
  const allowed = userType_ === 'admin' || userType_ === 'staff';

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const handleRemoveFromBasket = (id) => {
    dispatch(removeFromBasket(id));
  }
  const handleClearFromBasket = () => {
    dispatch(clearFromBasket());
  }
  const handleShowModal = () =>{
    setShowModal(true);
  }
  const handleCloseModal = () =>{
    setShowModal(false);
  }
  return (
    <>
    <Header/>
    <Layout>
      <div className="basketItems">
        <Row>
          <Col md={10}>

            <h4 style={{marginBottom: "20px"}}>Basket Items</h4>

            {
              basketItems.length === 0 ? (
                <div className="emptyBasket">
                  Your Basket is empty <Link to="/">Go Back</Link>
                </div>
              ):(
                <ListGroup variant="flush">
                  {
                   
                    basketItems.map((book) => {
                     
                      const book_id = book.book_id;
                     const encodedId = encodeURIComponent(book_id);
                      return(
                      <ListGroup.Item key={book.book_id}>
                        <Row>
                          <Col md={1}>
                            <Image src={book.image_url} alt={book.title} fluid rounded/>
                          </Col>
                          <Col md={2}>
                            <Link to={`/book/${encodedId}`}>{book.title}</Link>
                          </Col>
                          <Col md={2}>
                            {book.author}
                            </Col>
                            <Col md={2}>
                            {book.published_date}
                              </Col>
                          <Col md={2}>
                            Available Copies: {book.available_copies}
                          </Col>

                          <Col md={1}>
                            <Button type="button" variant="light" onClick={() => handleRemoveFromBasket(book.book_id)}>
                              <FaTrash/>
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      )
                    })
                  }
                  </ListGroup>
              )
            }
          </Col>
        </Row>
        <div className="giveUserButton">
  {allowed && basketItems.length > 0 && (
    <Button style={{marginTop: "20px"}}
      type='button'
      className='btn-varient-info btn-block'
      onClick={handleShowModal}
    >
      Give to User
    </Button>
  )}
</div>

<div className="giveUserButton">
  {allowed && basketItems.length > 0 && (
    <Button style={{marginTop: "20px"}}
      type='button'
      className='btn-varient-info btn-block'
      onClick={handleClearFromBasket}
    >
      Clear Cart
    </Button>
  )}
</div>
<CustomMany show={showModal} handleClose={handleCloseModal} />


      </div>
    </Layout>
    </>
  )
}

export default CartPage 