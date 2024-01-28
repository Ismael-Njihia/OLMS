import Header from "../components/Header"
import Layout from "../components/Layout"
import ReadOnlineSteps from "../components/ReadOnlineSteps"
import {Form, Button, col, Row} from "react-bootstrap"
import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import Message from "../components/Message"

const Payment = () => {
  //make sure local storage for Hours and bookPdf are filled using useSelector
  const hours = useSelector((state) => state.hours);
  const bookPdf = useSelector((state) => state.bookPdf);

  const navigate = useNavigate();
  
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
  
  return (
    <>
    <Header />
    
    <Layout>
    <ReadOnlineSteps step1 step2 step3/>
        <h1>Payment</h1>

    </Layout>
    </>
  )
}

export default Payment