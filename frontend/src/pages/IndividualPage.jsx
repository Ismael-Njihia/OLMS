// Importing necessary dependencies and components
import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import Header from '../components/Header'
import { useGetTransactionQuery } from "../slices/TransactionApiSlice"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import {useUpdateTransactionMutation} from "../slices/TransactionApiSlice"
// IndividualPage functional component
import {useFetchBooksQuery} from "../slices/BooksApiSlice"

const IndividualPage = () => {
    // Extracting the 'id' parameter from the URL using react-router-dom
    const { id } = useParams()


    // Sending id for a response using the useGetTransactionQuery hook
    const { data, error, isLoading } = useGetTransactionQuery(id)
    const [updateTransactionMutation] = useUpdateTransactionMutation()
    const {data: booksData, error: booksError, isLoading: booksLoading} = useFetchBooksQuery()
    console.log(booksData)
    //make bookIds an array
  
    const bookIds = data?.book_id
    //console.log(bookIds)
    const bookIdsArray = Array.isArray(bookIds) ? bookIds : [bookIds];
    console.log(bookIdsArray)
    //make Ids an array else none
    const filteredBooksData = booksData?.filter(book => bookIdsArray.includes(book.book_id));

    //console.log(JSON.stringify(filteredBooksData, null, 2), "filtered");
    const booksElements = filteredBooksData?.map((book, index)=>(
        <ListGroup variant='flush'>
        <ListGroup.Item key={index}>
            <Row>
                <Col md={1}>
                <Image src={book.image_url} alt={book.title} fluid rounded/>
                </Col>

                <Col md={2}>
                    {book.title}
                </Col>

                <Col md={2}>
                     {book.book_id}
                </Col>

                <Col md={2}>
                 {book.author}
                 </Col>
                 <Col md={2}>
                              Publishing Date: {book.published_date}
                </Col>

            </Row>
        </ListGroup.Item>
        </ListGroup>
    ))



    // Mutation hook to update the transaction
    const handleReturnBook = async () => {
       try {
              const {data} = await updateTransactionMutation(id)
              console.log(data)
              toast.success("Transaction with Id " + id + "is now marked as retuned")
             window.location.reload()
        
       } catch (error) {
              console.log(error)
              toast.error("Something went wrong")
       }
    }
    // Rendering JSX elements
    return (
        <>
       
            {/* Header component */}
            <Header />
            {/* Layout component */}
            <Layout>
                {/* Link to navigate back to the transactions page */}
                <Link className='btn btn-light my-3' to="/transactions">
                    Go Back
                </Link>
                {/* Check if the data is loading */}
                {isLoading && <p>Loading...</p>}
                {/* Give a heading with the transaction Id*/}
                <h6 style={{textAlign: "center", color:"blue", marginBottom:"10px"}}>Transaction Id: {id}</h6>
                {/* Check if the data is loading */}
                <Row>
                    <Col md={6}>
                        <div className='transaction-info'>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h6>Borrowed On: {new Date(Number(data?.borrow_date) * 1000).toLocaleString()}</h6>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                   <h6>Expected Return Date: {new Date(Number(data?.expected_return_date) * 1000).toLocaleString()}</h6>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  <h6>Cost: {data?.cost} KES </h6>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h6>Fine: {data?.fine} KES</h6>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h6>Status: {data?.status}</h6>
                                </ListGroup.Item>
                             </ListGroup>
                        </div>
                    </Col>


                    {/**user Info */}
                    <Col md={6}>
                        <div className='userInfo'>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h6>User Id: {data?.user?.user_id}</h6>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h6>Borrower's Name: {data?.user?.first_name +" " + data?.user?.last_name}</h6>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h6>Email: {data?.user?.email}</h6>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h6>Username: {data?.user?.username}</h6>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h6>Registration Date: {new Date(Number(data?.user?.registration_date)).toLocaleDateString()}</h6>
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                    </Col>


                
                </Row>
                <div style={{marginTop: "20px"}}>
                    {booksElements}
                </div>

                {/* check if book is borrowed and then show a button to return the book */}

                {data?.status === "borrowed" && (
                    <Button style={{marginTop: '20px'}}
                        type='button'
                        className='btn btn-block'
                        disabled={data?.status === "returned"}
                        onClick={handleReturnBook}
                    >
                        Complete Transaction
                   </Button>
                )}
                {/* check if book is returned and then show a button to delete the transaction */}
                {data?.status === "returned" && (
                    <Button style={{marginTop: '20px'}}
                        type='button'
                        className='btn btn-block'
                        disabled={data?.status === "returned"}
                    >
                        Delete Transaction
                    </Button>
                )}
               
               {/*show a print receipt button*/}
               <Button
               style={{marginLeft: '20px', marginTop: '20px'}}
               type='button'
               className='btn btn-block'
               disabled={data?.status === "returned"}	
               >
                Print Receipt

               </Button>
            </Layout>
        </>
    )
}

// Exporting the IndividualPage component
export default IndividualPage
