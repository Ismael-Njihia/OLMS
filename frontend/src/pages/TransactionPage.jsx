import Layout from "../components/Layout"
import Header from "../components/Header"
import { useSelector } from "react-redux"
import {useGetTransactionsQuery} from "../slices/TransactionApiSlice"
import { Link, useNavigate } from "react-router-dom"
import { Table } from "react-bootstrap"
import {toast} from 'react-toastify';

const TransactionPage = () => {
  const userInfo = useSelector((state) => state.auth)
  const navigate = useNavigate()
 
  if(!userInfo){
    navigate('/login')
  }
 
  const { data: transactions, error, isLoading } = useGetTransactionsQuery()
 console.log(transactions)
  if(error){
    toast.error(error)
  }
  return (
    <>
    <Header />
    <Layout>
     {isLoading ? (
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
            <th> Actual Return Date</th>
            <th>View</th>
            <th> Status</th>


          </tr>
        </thead>
        <tbody>
        
          {
            transactions && transactions.map((transaction) => (
              
              <tr key={transaction.transation_id}   
             >
                <td>{transaction.transation_id}</td>
                <td>{transaction.book_id}</td>
                <td>{new Date(Number(transaction.borrow_date) * 1000).toLocaleString()}</td>

                <td>{transaction.user.first_name + " " + transaction.user.last_name}</td>
                <td>{transaction.cost} </td>
                <td>{transaction.fine} </td>
                <td>{new Date(Number(transaction.expected_return_date) * 1000).toLocaleString()}</td>

                <td>{
                  transaction.status === "borrowed" ?(
                  <p>-</p>
                  ):(
                new Date(Number(transaction.return_date)).toLocaleString())}</td>
                <td>
                  <Link to={`/transaction/${transaction.transation_id}`}>
                    View
                  </Link>
                </td>
                <td>{transaction.status === "borrowed" ?(
                 <p style={{color: "red", fontSize: "15px", fontWeight:"bold"}}>{transaction.status}</p>
                ):(
                  <p style={{color: "green", fontSize: "15px", fontWeight:"bold"}}>{transaction.status}</p>
                ) }</td>
                </tr>
              
            ))
          }
        </tbody>

        </Table>
     )}
    </Layout>
    </>
  )
}

export default TransactionPage