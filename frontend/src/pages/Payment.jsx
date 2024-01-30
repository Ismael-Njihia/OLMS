import Header from "../components/Header"
import Layout from "../components/Layout"
import ReadOnlineSteps from "../components/ReadOnlineSteps"
import {Form, Button, Row} from "react-bootstrap"
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import Message from "../components/Message"
import { PayPalButtons , usePayPalScriptReducer} from "@paypal/react-paypal-js"
import {useGetPaypalClientIdQuery} from "../slices/TransactionApiSlice"
import {toast} from "react-toastify"
import { ListGroup, Col } from "react-bootstrap"
import {useCreateOnlineMutation} from "../slices/onlineApiSlice"
import { setStartTime } from "../slices/startTimeSlice"

const Payment = () => {
  //make sure local storage for Hours and bookPdf are filled using useSelector
  const hours = useSelector((state) => state.hours);
  //Parse the hours to a Int
  const dispatch = useDispatch();
  const hoursInt = parseInt(hours);
  const bookPdf = useSelector((state) => state.bookPdf);
 const pricePerHour = 0.15;
 const totalPrice = hours * pricePerHour;
  const navigate = useNavigate();

  const [{isPending}, paypalDispatch] = usePayPalScriptReducer();
  const {data: paypal, isLoading: loadingPayPal, error: errorPayPal} = useGetPaypalClientIdQuery();

  const [createOnline, {data: onlineData, isLoading: loadingOnline, error: errorOnline}] = useCreateOnlineMutation();
  console.log('PayPal Data:', paypal);

  console.log('PayPal Error:', errorPayPal);
  useEffect(() => {
    if(!hours){
      navigate('/duration');
    }
  })

  useEffect(() => {
    if(onlineData){
      toast.success(`You can now read the book for the next ${hours} hours`);
      console.log(onlineData);
      let stopTime = onlineData.stopTime;
      console.log(stopTime);
      dispatch(setStartTime(stopTime));
      navigate('/read');
    }
  }, [onlineData, hours, navigate, dispatch])

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
      console.log(details);
      createOnline({duration: hoursInt, book_id: bookPdf, cost: totalPrice});
      toast.success("Payment Successful");
      
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

{ errorOnline && <Message variant='danger'>{errorOnline}</Message>}
{ loadingOnline && <Message variant='info'>Loading, Please Hold</Message>}
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