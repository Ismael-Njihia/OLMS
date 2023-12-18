import Layout from '../components/Layout'
import Header from '../components/Header'
import {useParams} from 'react-router-dom'

const GenrePage = () => {
    const {id} = useParams()
  return (
    <>
    <Header/>
    <Layout>
        <h1>This is page for Genre with Id {id}</h1>
    </Layout>
    </>
  )
}

export default GenrePage