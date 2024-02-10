import Header from "../components/Header"
import Layout from "../components/Layout"
import {useGetAllOnlineTransactionsQuery} from "../slices/TransactionApiSlice"
import { Table} from "react-bootstrap";
import { FaSync } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Online = () => {
    const {data: transactions, error, isLoading, refetch} = useGetAllOnlineTransactionsQuery()

    console.log(transactions)
  return (
    <>
    <Header />
    <Layout>
      {
        isLoading && <div>Loading...</div>
      }
      <div className="d-flex justify-content-between">
        <FaSync onClick={refetch} style={{cursor: "pointer", marginBottom: "10px"}}  color="blue"/>
        </div>

      <Table striped bordered hover style={{fontSize: "14px"}}>
        <thead>
            <tr>
                <th>Transaction Id</th>
                <th>User</th>
                <th>Book Id</th>
                <th>Read Started</th>
                <th>Read Ended</th>
                
                <th>Duration (HRS)</th>
                <th> Cost (USD)</th>

            </tr>
        </thead>
        <tbody>
            {transactions && transactions.map((transaction) => (
                <tr key={transaction.transactionId}>
                    <td>{transaction.transactionId}</td>
                    <td>
                        <Link to={`/user/${transaction.user_id}`}>
                            {transaction.user.first_name + " " + transaction.user.last_name}
                        </Link>
                    </td>
                    <td>{transaction.book_id}</td>

                    <td>{new Date(Number(transaction.startTime) * 1000).toLocaleString()}</td>
                    <td>{new Date(Number(transaction.stopTime) * 1000).toLocaleString()}</td>
                    <td>{transaction.duration}</td>
                    <td>{transaction.cost}</td>
                    
                    
                </tr>
            ))}
        </tbody>
        </Table>
    </Layout>
    </>

  )
}

export default Online