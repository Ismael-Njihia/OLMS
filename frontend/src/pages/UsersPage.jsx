import React, { useState } from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import { useGetUsersQuery } from '../slices/usersApiSlice'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap'
import {useDeleteUserMutation} from '../slices/usersApiSlice'
import { toast } from 'react-toastify'

const UsersPage = () => {
    const { data: users, isLoading, refetch } = useGetUsersQuery()
    const [deleteUserMutation, {isLoading: isDeleting}] = useDeleteUserMutation()
    const { userInfo } = useSelector((state) => state.auth);
    const [show, setShow] = useState(false);

    const [userId, setUserId] = useState(null);

    const handleClose = () => setShow(false);

    const handleShow = (id) => {
      setUserId(id);
      setShow(true);
    };
    const handleDelete = async() => {
      const res = await deleteUserMutation(userId);
      console.log(res);
      toast.success("User Deleted Successfully");
      setShow(false);
      refetch();

    }

  return (
    <>
    <Header />
    <Layout>
    {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Table striped bordered hover style={{fontSize:'14px'}}>
            <thead>
              <tr>
                <th>User Id</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Registration Date</th>
                <th>User Type</th>
                <th>Username</th>
                <th>View</th>
                <th>DELETE</th>

              </tr>
            </thead>
            <tbody>
              {users && users.map((user) => (
                <tr key={user.user_id}>
                 <td>{user.user_id}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{new Date(Number(user.registration_date)).toLocaleString()}</td>
                  <td>{user.user_type}</td>
                  <td>{user.username}</td>
                  <td>
                    {/* Wrap user_id with Link for user/id */}

                    <Link to={`/user/${user.user_id}`}>View</Link>

                  </td>
                  <td>
                    <button
                    disabled={userInfo.user_type === 'staff'}
                    onClick={() => handleShow(user.user_id)}
                    >DELETE</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <Modal show={show}  onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this user?</p>
          {/**Show the name of user being deleted */}
          <p>user id: {userId}</p>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose}>
            Cancel
          </button>
          <button variant="primary" 
          onClick={handleDelete}>
            Delete
          </button>
        </Modal.Footer>

          </Modal>
    </Layout>
    </>
  )
}

export default UsersPage