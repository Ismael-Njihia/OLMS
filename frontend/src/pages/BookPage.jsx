import React from 'react'
import { useParams } from 'react-router-dom'

const BookPage = () => {
    //get id in url
   

   const { id } = useParams();
  return (
    <div>
        <h1>
            Book Page {id}
        </h1>
    </div>
  )
}

export default BookPage