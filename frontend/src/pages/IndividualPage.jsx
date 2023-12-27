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
              <Col md={4}>
                <div className='transaction Info'>
                  <ListGroup variant='flush'>
                   <ListGroup.Item>
                    <h6>ID: {transactionInfo?.transation_id}</h6>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h6>Borrowed On: {new Date(Number(transactionInfo?.borrow_date)).toLocaleDateString()}</h6>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h6>Expected Return Date: {new Date(Number(transactionInfo?.expected_return_date)).toLocaleDateString()}</h6>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h6>Cost: {transactionInfo.cost} </h6>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h6>Fine: {transactionInfo.fine} </h6>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h6>Status: {transactionInfo.status} </h6>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
                </Col>

                {/**User Info in a Col */}
                <Col md={4}>
                  <div className='userInfo'>
                    <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h6>User Id: {transactionInfo.user.user_id}</h6>
                      </ListGroup.Item>
                      <ListGroup.Item>
                      <h6>Borrorwer's Name:  {transactionInfo.user.first_name + " " + transactionInfo.user.last_name}</h6>
                      </ListGroup.Item>
                      <ListGroup.Item>
                      <h6>Email:  {transactionInfo.user.email}</h6>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <h6>Username: {transactionInfo.user.username}</h6>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <h6>Registration Date: {new Date(Number(transactionInfo.user.registration_date)).toLocaleDateString()}</h6>
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                </Col>

                {/**Book Info in a Col */}
                <Col md={4}>
                  <div className='bookInfo'>
                    <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h6>Book Id: {transactionInfo.book.book_id}</h6>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <h6>Title: {transactionInfo.book.title}</h6>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <h6>Author: {transactionInfo.book.author}</h6>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <h6>ISBN: {transactionInfo.book.isbn}</h6>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <h6>Year of Publishing: {transactionInfo.book.published_date}</h6>
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                </Col>
            </Row>

            {/**Show Button when TransactionInfo.status === "borrowed" */}
            {transactionInfo.status === "borrowed" ?(
              <Button style={{marginTop: "25px"}} variant="primary" size="md" block>
                Complete Transaction
              </Button>
            ):(
              <p></p>
            )}
        </Layout>
    </>
  )
}

export default IndividualPage