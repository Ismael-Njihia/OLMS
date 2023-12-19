import Layout from '../components/Layout';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';


const BookPage = (props) => {
    //get id in url
    const {id} = useParams();
    const decodedId = decodeURIComponent(id);
  return (
    <>
    <Header />
    <Layout>
        <h1>
            Book Page {decodedId}
        </h1>
    </Layout>
    </>
  )
}

export default BookPage