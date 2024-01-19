import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { Row, Col, Card, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useGetTransactionsOfUserQuery} from "../slices/usersApiSlice";

const UserPage = () => {
  const id = useParams().id;
  const { data: user, isFetching } = useGetUserByIdQuery(id);
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [user_type, setUserType] = useState(user?.user_type || "");
  const [registration_date, setRegistration_date] = useState(user?.registration_date || "");
  const { data: transactionsResponse, isFetching: isFetchingTransactions } = useGetTransactionsOfUserQuery(id);

  console.log(transactionsResponse);

if (transactionsResponse && transactionsResponse.transactions.length > 0) {
  console.log(transactionsResponse.transactions[0]);
} else {
  console.log("No transactions or empty array");
}
  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setUserType(user.user_type);
      setRegistration_date(user.registration_date);
    }
  }, [user]);

  if (isFetching) return <div>Loading...</div>;

  const handleDetailsUpdate = (e) => {
    e.preventDefault();
    // Handle the update logic here
    // For example, you can dispatch an action to update the user details
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  }


  return (
    <>
      <Header />
      <Layout>
        <Row>
          <Col md={6}>
            {/** Show the users details on a form */}
            <h6>Do You Wish to Change {firstName} {lastName}'s Details?</h6>
            <form>
              <div className="form-group">
                <label htmlFor="name">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </div>
              <br></br>
              <div className="form-group">
                <label htmlFor="name">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </div>
              <br></br>
              <div className="form-group">
                <label htmlFor="email">User's Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <br></br>
              <div className="form-group">
                <label htmlFor="userType">User Type</label>
                <select
                  className="form-control"
                  id="userType"
                  value={user_type}
                  onChange={handleUserTypeChange}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                  <option value="staff">staff</option>
                </select>
              </div>
              <br></br>
              <div className="form-group">
                <label htmlFor="email">Joined On</label>
                <input
                  type="text"
                  className="form-control"
                  id="date"
                  value={new Date(Number(registration_date)).toLocaleString()}
                  readOnly
                />
              </div>
              <div className="submitBtn">
                <button
                  style={{ marginTop: "20px" }}
                  type="submit"
                  onClick={handleDetailsUpdate}
                  className="btn btn-primary"
                >
                  Update
                </button>
              </div>
            </form>
          </Col>


        
          <Col md={5}>
          <h6 style={{marginLeft: "20px"}}> {firstName} {lastName}'s History</h6>

          <br>
          </br>
          {isFetchingTransactions ?(
           <p>Loading ... Please Wait</p>
          ):(
            
          <Table striped bordered hover style={{fontSize:'12px'}}>
            <thead>
              <tr>
                <th>Transaction Id</th>
                <th>Status</th>
                <th>Cost</th>
                <th>Fine</th>
                <th>Final Cost</th>
              </tr>
            </thead>
            <tbody>
            {transactionsResponse &&
                Object.values(transactionsResponse.transactions).map((transaction) => (
                  <tr key={transaction.transation_id}>
                    <td>
                      <Link to={`/transaction/${transaction.transation_id}`}>
                        {transaction.transation_id}
                      </Link>
                    </td>
                    <td>{transaction.status}</td>
                    <td>{transaction.cost} KES</td>
                    <td>{transaction.fine} KES</td>
                    <td>{transaction.cost + transaction.fine} KES</td>
                  </tr>
                ))}
              
           
              </tbody>
            </Table>
          )}
            </Col>
        </Row>


      </Layout>
    </>
  );
};

export default UserPage;
