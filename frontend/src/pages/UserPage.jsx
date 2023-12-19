import Layout from "../components/Layout"
import Header from "../components/Header"
import { useParams } from "react-router-dom"

const UserPage = () => {
    const id = useParams().id;
  return (
    <>
    <Header />
    <Layout>
      <h1>User Page {id}</h1>
    </Layout>
    </>
  )
}

export default UserPage