import Layout from '../components/Layout';
import { useParams } from 'react-router-dom'

const BookPage = () => {
    //get id in url
   

   const { id } = useParams();
  return (
    <Layout>
        <h1>
            Book Page {id}
        </h1>
    </Layout>
  )
}

export default BookPage