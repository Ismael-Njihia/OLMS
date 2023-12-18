import Layout from "../components/Layout"
import Header from "../components/Header"
import {useFetchBooksQuery} from '../slices/BooksApiSlice';


const Homepage = () => {

  const {data: books, isLoading, error} = useFetchBooksQuery();
  console.log(books);
  return (
   <>
    <Header />
    <Layout>
     
      <div className='booksContainer'>
        {isLoading ? (
          <h3>Loading...</h3>
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          books.map((book) => (
            <div key={book.book_id} className='bookCard'>
              <div className='bookImage'>
                <img src={book.image_url} alt={book.book_name} />
              </div>
              <div className='bookInfo'>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{book.published_date}</p>
                <p>{book.genre_id}</p>
                <p>{book.description_}</p>
                <p>{book.total_copies}</p>
              </div>
            </div>
          ))
        )}
       </div>
    </Layout>
   </>
  )
}

export default Homepage