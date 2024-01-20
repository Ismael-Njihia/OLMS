import Header from "../components/Header";
import Layout from "../components/Layout";
import { useSelector } from "react-redux"
import {useGetTransactionsQuery} from "../slices/TransactionApiSlice"
import { Link, useNavigate } from "react-router-dom"
import { Table } from "react-bootstrap"
import {toast} from 'react-toastify';
import { FaSync } from 'react-icons/fa';

const Overdue = () => {
    const userInfo = useSelector((state) => state.auth)
  
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
                            </tr>
                    ))
                }
            </tbody>
         </Table>
        )
    }
   </Layout>
   </>
  )
}

export default Overdue