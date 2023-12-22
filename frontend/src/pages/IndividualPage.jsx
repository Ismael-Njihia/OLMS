import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import Header from '../components/Header'

const IndividualPage = () => {
    const { id } = useParams()
  return (
    <>
        <Header />
        <Layout>
            <h1>Individual Page {id}</h1>
        </Layout>
    </>
  )
}

export default IndividualPage