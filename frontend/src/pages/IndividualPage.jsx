import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import Header from '../components/Header'
import {useGetTransactionQuery} from "../slices/TransactionApiSlice"
import {toast } from "react-toastify"
import {Link} from "react-router-dom"
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'


const IndividualPage = () => {
    const { id } = useParams()
    //send id for a response
    const {data: transactionInfo, error, isLoading} = useGetTransactionQuery(id);
    console.log(transactionInfo)
    return (
    <>
        <Header />
        <Layout>
           <Link className='btn btn-light my-3' to="/transactions">
            Go Back
           </Link>
            {isLoading && <h2>Loading...</h2>}
            <Row>
              <h1 style={{ marginLeft:"10px", textAlign:"center",marginRight:"10px"}}>Transaction Receipt</h1>
              <Col md={5}>
                <div className='transaction Info'>
                  <ListGroup variant='flush'>
                   <ListGroup.Item>
                    <h6>ID: {transactionInfo?.transation_id}</h6>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h6>Borrowed On: {new Date(Number(transactionInfo?.borrow_date)).toLocaleDateString()}</h6>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      
                    </ListGroup.Item>
                  </ListGroup>
                </div>
                </Col>
            </Row>
        </Layout>
    </>
  )
}

export default IndividualPage