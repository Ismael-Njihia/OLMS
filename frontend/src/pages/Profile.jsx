import Layout from "../components/Layout"
import Header from "../components/Header"
import { useSelector } from "react-redux"

const Profile = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const username = userInfo.username;
  return (
    <>
      <Header />
      <Layout>
        <h1>Hi {username}</h1>
      </Layout>
    </>
  )
}

export default Profile