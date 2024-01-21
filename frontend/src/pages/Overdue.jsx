import Header from "../components/Header";
import Layout from "../components/Layout";
import { useSelector } from "react-redux"
import {useGetTransactionsQuery, useSendLateRemindersMutation} from "../slices/TransactionApiSlice"
import { Link, useNavigate } from "react-router-dom"
import { Table } from "react-bootstrap"
import {toast} from 'react-toastify';
import { FaSync } from 'react-icons/fa';
import { Modal } from "react-bootstrap";
import { useState } from "react";

const Overdue = () => {
    const userInfo = useSelector((state) => state.auth)
    const [show, setShow] = useState(false);
    const [selectedTransactionId, setSelectedTransactionId] = useState(null);
    const [sendLateReminders] = useSendLateRemindersMutation()
    const handleClose = () => setShow(false);
    const handleShow = (transactionId) => {
        setSelectedTransactionId(transactionId)
        setShow(true)
    };

    const { data: transactions, error, isLoading,refetch } = useGetTransactionsQuery()
    const currentDate = Math.floor(Date.now()/1000);
    const overdueTransactions = transactions?.filter((transaction) => {
        const expectedReturnDate = transaction.expected_return_date;
        return currentDate > expectedReturnDate;
    })
    const count = overdueTransactions?.length;


    const handleReload = () => {
        refetch();
    }
    const handleSendingAReminder = async() => {
     try {
        const {data} = await sendLateReminders(selectedTransactionId)
        console.log(data)
        toast.success(data.message)
        handleClose()
        refetch()
        
     } catch (error) {
        toast.error(error|| "Something went wrong")
        console.log(error)
     }
    }

  return (
   <>
   <Header />
   <Layout>
    <div className="d-flex justify-content-between">
            <FaSync onClick={handleReload} style={{cursor: "pointer"}}  color="blue"/>
    <h4>There are {count} overdue transactions</h4>
    </div>
    {
        isLoading ?(
            <p>Loading... Please Wait</p>
        ):(
          <Table striped bordered hover style={{fontSize:'12px'}}>
            <thead>
              <tr>
                <th>Transaction Id</th>
                <th>Book Id</th>
                <th>Borrow Date</th>
                <th>Borrower Name</th>
                <th>Cost(KSH)</th>
                <th>fine (KSH) </th>
                <th> Expected Return Date</th>
                <th>Late By</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {
                    overdueTransactions && overdueTransactions.map((transaction) => (
                        <tr key={transaction.transation_id}>
                            <td>
                            <Link to={`/transaction/${transaction.transation_id}`}>
                                {transaction.transation_id}
                            </Link>
                            </td>
                            <td>
                            {transaction.book_id[0].length > 8
                                ? `${transaction.book_id[0].slice(0, 8)}...`
                                : transaction.book_id[0]}
                            </td>
                            <td>{new Date(Number(transaction.borrow_date) * 1000).toLocaleString()}</td>
                            <td>{transaction.user.first_name + " " + transaction.user.last_name}</td>
                            <td>{transaction.cost} </td>
                            <td>{transaction.fine} </td>
                            <td>{new Date(Number(transaction.expected_return_date) * 1000).toLocaleString()}</td>
                            
                            <td>{Math.floor((currentDate - transaction.expected_return_date)/(60*60*24))} days</td>
                            <td>{transaction.cost + transaction.fine}</td>
                            <td>
                                <button
                                onClick={() => handleShow(transaction.transation_id)}
                                >
                                    send reminder
                                </button>
                            </td>
                            </tr>
                    ))
                }
            </tbody>
         </Table>
        )
    }
    <Modal show={show}  onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Send Reminder</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>Are you sure you want to send a reminder to this user?</p>
            <p>Reminder will be sent to {selectedTransactionId}</p>
        </Modal.Body>

        <Modal.Footer>
            <button onClick={handleClose}>
                Cancel
            </button>
            <button
            onClick={handleSendingAReminder}>
                Send
            </button>
        </Modal.Footer>
     </Modal>
   </Layout>
   </>
  )
}

export default Overdue