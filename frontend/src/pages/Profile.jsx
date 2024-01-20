import Layout from "../components/Layout"
import Header from "../components/Header"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Profile = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const user_id = userInfo.user_id;
    const username = userInfo.username;
    const navigate = useNavigate()

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