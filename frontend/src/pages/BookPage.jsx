import Layout from '../components/Layout';
import Header from '../components/Header';
import { useParams } from 'react-router-dom'

const BookPage = () => {
    //get id in url
   

   const { id } = useParams();
  return (
    <>
    <Header />
    <Layout>
        <h1>
            Book Page {id}
        </h1>
    </Layout>
    </>
  )
}

export default BookPage