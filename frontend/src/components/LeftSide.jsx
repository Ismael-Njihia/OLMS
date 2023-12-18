import {AiOutlineHome} from 'react-icons/ai';
import '../assets/LeftSide.css';
import { Link } from 'react-router-dom';
import {useFetchGenresQuery} from '../slices/GenreApiSlice';
import {Dropdown} from 'react-bootstrap';

const LeftSide = () => {
  const {data: genres, isLoading} = useFetchGenresQuery();
 
  return (
   <>
   <div className='leftSide'> 
   <div className='leftSideContainer'>
    <div className='importantLinks'>
        <div className='links'>
            <Link to='/' className='homeLink'>
                <AiOutlineHome className='homeIcon'/> Home
            </Link>
        </div>
        <div>
          <Dropdown className='dropdown'>
            <Dropdown.Toggle variant="primary" id="genre-dropdown">
              Genres 
            </Dropdown.Toggle>
            <Dropdown.Menu className='dropdown-menu'>
                {isLoading ? (
                  <Dropdown.Item>Loading...</Dropdown.Item>
                ) : (
                  genres.map((genre) => (
                    <Dropdown.Item key={genre.genre_id}>
                      <Link to={`/genres/${genre.genre_id}`} className='genreLink'>
                        {genre.genre_name}
                      </Link>
                    </Dropdown.Item>
                  ))
                )}
            </Dropdown.Menu>
       
          </Dropdown>

        </div>
      </div>

    </div>
   </div>
   </>
  )
}

export default LeftSide