import { useState } from "react";
import Header from "../components/Header"
import Layout from "../components/Layout"
import '../assets/Dashboard.css'
import {useFetchBooksQuery} from '../slices/BooksApiSlice';
import {useGetTransactionsQuery} from "../slices/TransactionApiSlice"
import { useGetSettingsQuery, useUpdateASettingMutation } from "../slices/setingsApiSlice";

import { Card, Row, Col, Button, Modal,Form} from "react-bootstrap";
import {useFetchGenresQuery} from '../slices/GenreApiSlice';
import { useGetUsersQuery } from '../slices/usersApiSlice'
import { FaCog } from "react-icons/fa";
import {toast} from 'react-toastify';


const DashboardPage = () => {
    const { data: transactions, error, isLoading } = useGetTransactionsQuery();
    const {data: books, isLoading: isLoadingBooks} = useFetchBooksQuery();
    const {data: genres, isLoading: isLoadingGenres} = useFetchGenresQuery();
    const {data: users, isLoading: isLoadingUsers} = useGetUsersQuery();
    const [updateSetting, { isLoading: isLoadingUpdateSetting }] = useUpdateASettingMutation();
    const { data: settings, isLoading: isLoadingSettings } = useGetSettingsQuery();

    const priceSetting = settings?.[0].price;
    const [price, setPrice] = useState(priceSetting);
    
    //count transactions, books, genres, users
    //store them in variables
    const totalTransactions = transactions?.length || 0;
    const totalBooks = books?.length || 0;
    const totalGenres = genres?.length || 0;
    const totalUsers = users?.length || 0;

    //count completed transactions
    const returnedTransactions = transactions?.filter(
        (transaction) => transaction.status === "returned"
    ) || [];
    const totalReturnedTransactions = returnedTransactions.length || 0;

    const pendingTransactions = transactions?.filter(
        (transaction) => transaction.status === "borrowed"
    ) || [];
    const totalPendingTransactions = pendingTransactions.length || 0;

    //count transactions completed this month
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
   
    const totalTransactionsThisMonth = transactions?.filter(
        (transaction) => {
           const returnDate = new Date(Number(transaction.return_date));
           
           return(
              transaction.status === 'returned' &&
              returnDate.getMonth() === currentMonth
           );
        }
    ) || [];

    const totalTransactionsCompletedThisMonth = totalTransactionsThisMonth.length || 0;
    //cumulative cost of transactions done this month
    const totalCost = totalTransactionsThisMonth.reduce(
        (total, transaction) => total + transaction.cost,
        0
    );
    //total cost of fines
    const totalFines = totalTransactionsThisMonth.reduce(
        (total, transaction) => total + transaction.fine,
        0
    )

    //modal Here
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false)
    const handleShowModal = () => setShowModal(true);
    //convert price to number
    const priceNumber = Number(price);

    //handle submit price
    const handleSubmitPrice = async () =>{
        try{
            const resultAction = await updateSetting({
                id: settings?.[0].id,
                price: priceNumber,
            });
            console.log(resultAction);
            toast.success(resultAction.data.message)
            handleCloseModal();
            setPrice("");

            window.location.reload();

        }catch(error){
            console.log(error);
            toast.error(error.message || "An error occured")
        }

    }

  return (
    <>
    <Header />
    {isLoading || isLoadingBooks || isLoadingGenres || isLoadingUsers || isLoadingSettings ? (
        <div className="loader">Loading...</div>
    ) : null
    }

    <Layout>
    
        <div className="dashboard_container">
            <Button style={{border: "2px solid #333"}} variant="light" onClick={handleShowModal} className="settings-button">
            <FaCog /> Setting
        </Button>
        <hr style={{ borderTop: '2px solid #333' }} />
            <Row style={{marginTop: "20px"}}>
                <Col>
                    <Card className="cardOne">
                        <Card.Body>
                            <Card.Title>Transactions</Card.Title>
                            <Card.Text>
                                {totalTransactions}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="cardTwo">
                        <Card.Body>
                            <Card.Title>Books</Card.Title>
                            <Card.Text>
                                {totalBooks}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="cardThree">
                        <Card.Body>
                            <Card.Title>Genres</Card.Title>
                            <Card.Text>
                                {totalGenres}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="cardFour">
                        <Card.Body>
                            <Card.Title>Users</Card.Title>
                            <Card.Text>
                                {totalUsers}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
          <br>
            </br>
            
           
            <Row>
                <Col>
                    <Card className="cardOne reduceSize">
                        <Card.Body className="smallOne">
                            <Card.Title className="smallOne">Completed Transactions</Card.Title>
                            <Card.Text>
                                {totalReturnedTransactions}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="cardTwo reduceSize">
                        <Card.Body className="smallOne">
                            <Card.Title className="smallOne">Pending Transactions</Card.Title>
                            <Card.Text>
                                {totalPendingTransactions}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                <Card className="cardThree reduceSize">
                    <Card.Body className="smallOne">
                        <Card.Title className="smallOne">Transactions this month</Card.Title>
                        <Card.Text>
                         {totalTransactionsCompletedThisMonth}
                        </Card.Text>
                    </Card.Body>

                </Card>
                </Col>

                <Col>
                <Card className="cardFour reduceSize">
                    <Card.Body className="smallOne">
                        <Card.Title className="smallOne">Revenue This Month</Card.Title>
                        <Card.Text>
                         {totalCost} KES
                        </Card.Text>
                    </Card.Body>

                </Card>
                </Col>
                <Col>
                <Card className="cardFive reduceSize">
                    <Card.Body className="smallOne">
                        <Card.Title className="smallOne">Fines This Month</Card.Title>
                        <Card.Text>
                         {totalFines} KES
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
            <hr style={{ borderTop: '2px solid #333' }} />
 
        </div>


        {/**Modal Here */}
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                  <Modal.Title>SET PRICE PER DAY</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group controlId="price">
                        <Form.Label>
                            Change Price
                        </Form.Label>
                        <Form.Control
                        type="Number"
                        placeholder={priceSetting || "Default Placeholder"} 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        >
                        </Form.Control>

                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button
                className="btn btn-danger"
                onClick={handleCloseModal}
                >
                    Close
                </button>

                <button
                className="btn btn-primary"
                onClick={handleSubmitPrice}
                >
                    Set Price

                </button>
            </Modal.Footer>

        </Modal>
    </Layout>
    </>
  )
}

export default DashboardPage