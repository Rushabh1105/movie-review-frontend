import React from 'react'
import '../Styles/RatingCard.css';

function RatingCard(props) {
  const {data} = props;

  return (
    <div className='movie-ratings'>
      <h2>User: {data.user}</h2>
      <p>Rating: {data.rating}</p>
      <p>Review: {data.review}</p>
    </div>
  )
}

export default RatingCard
