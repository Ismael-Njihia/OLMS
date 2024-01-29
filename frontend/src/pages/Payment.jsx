import Header from "../components/Header"
import Layout from "../components/Layout"
import ReadOnlineSteps from "../components/ReadOnlineSteps"
import {Form, Button, col, Row} from "react-bootstrap"
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import Message from "../components/Message"
import { PayPalButtons , usePayPalScriptReducer} from "@paypal/react-paypal-js"
import {useGetPaypalClientIdQuery} from "../slices/TransactionApiSlice"
import {toast} from "react-toastify"
import { ListGroup, Col } from "react-bootstrap"

const Payment = () => {
  //make sure local storage for Hours and bookPdf are filled using useSelector
  const hours = useSelector((state) => state.hours);
  const bookPdf = useSelector((state) => state.bookPdf);
 const pricePerHour = 0.15;
 const totalPrice = hours * pricePerHour;
  const navigate = useNavigate();

  const [{isPending}, paypalDispatch] = usePayPalScriptReducer();
  const {data: paypal, isLoading: loadingPayPal, error: errorPayPal} = useGetPaypalClientIdQuery();

  console.log('PayPal Data:', paypal);

  console.log('PayPal Error:', errorPayPal);
  useEffect(() => {
    if(!hours){
      navigate('/duration');
    }
  })

  useEffect(() => {
    if(!bookPdf){
      navigate('/');
    }
  })

  useEffect(() => {
    if(!errorPayPal && !loadingPayPal && paypal.clientId){
      const loadingPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions', 
          value: {
          'client-id': paypal.clientId,
          currency: 'USD'
        }});
        paypalDispatch({type: 'setLoadingStatus', value: 'pending'});
      
      }
      if(!window.paypal){
      loadingPayPalScript(); 
      }
    }
  }, [paypal, paypalDispatch, loadingPayPal, errorPayPal])
  
  function createOrder(data, actions){
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalPrice
          }
        }
      ]
    })
  }

  function onApprove(data, actions){
    return actions.order.capture().then(function(details){
      toast.success("Payment Successful");
      navigate('/read');
    })
  }

  function onError(error){
    toast.error("Payment Failed");
    console.log(error)
    navigate('/payment');
  }
  return (
    <>
    <Header />    
    <Layout>
    <ReadOnlineSteps step1 step2 step3/>
        <Message variant='info'>You have selected {hours} hour{hours !== 1 && 's'} for ${totalPrice}</Message>

        <Row>
          <Col md={6}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  PayPal
                </p>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={6}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2> Make A PAYMENT</h2>
              </ListGroup.Item>

              <div>
                <ListGroup.Item>

                  <PayPalButtons
                  createOrder ={createOrder}
                  onApprove={onApprove}
                  onError={onError}
                  >

                  </PayPalButtons>
                  </ListGroup.Item>

              </div>
              </ListGroup>
            </Col>
            
        </Row>
    </Layout>
    </>
  )
}

export default Payment