import Layout from '../components/Layout'
import Header from '../components/Header'
import { useGetUsersQuery } from '../slices/usersApiSlice'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'


const UsersPage = () => {
    const { data: users, isLoading } = useGetUsersQuery()
    console.log(users)
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
                <th>EDIT</th>
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
                    <Link to={`/user/${user.user_id}`}>EDIT</Link>

                  </td>
                  <td>
                    <button>DELETE</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
    </Layout>
    </>
  )
}

export default UsersPage