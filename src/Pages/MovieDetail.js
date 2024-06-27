import React, { useState } from 'react';
import '../Styles/MovieDetail.css';
import { useDispatch, useSelector } from 'react-redux';
import { addReviewThunk, movieSelector } from '../Redux/movieReducer';
import RatingCard from '../Components/RatingCard';
import Loading from '../Components/Loading';

function MovieDetail() {

  const [rating, setRating] = useState(5);
  const [reviewData, setReviewData] = useState({});

  const {mve} = useSelector(movieSelector);
  const disptch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setReviewData({...reviewData});
   
    disptch(addReviewThunk({_id:mve._id, ...reviewData, rating: rating}));
  }
  // const {mve} = useSelector(movieSelector);
  
  return (
    <>
      {
        mve?<div className='movie-detail'>
        <div className='movie-page'>
          <div className='movie-poster'>
            <img src={mve.poster} alt='poster' />
          </div>
          <div className='movie-detail-info'>
            <h2>{mve.name}</h2>
            <p>{mve.plot}</p>          
            <h3>{mve.releaseYear}</h3>
            <p><b>{mve.genre}</b></p>
            <h3>{mve.director}</h3>
            <h4>{mve.actors}</h4>
          </div>
        </div>
        <hr style={{width: '90%'}}/>
        <div className='reviews'>
          <div className='ratings'>
          <h3>Movie Reviews</h3>
            {
              mve.ratings? mve.ratings.map((rating, idx) => (
                <RatingCard data={rating} key={idx}/>
              )): <h1>No Ratings Yet</h1>
            }
          </div>
          <div className='add-review'>
            <h3>Add Your Review</h3>
            <div className="input-field">
              <label className="form-label">Enter Your Name</label>
              <input type="text" className="form-control" onChange={(e) => {setReviewData({...reviewData, user: e.target.value})}} required />
            </div>
            <div className="input-field">
              <label className="form-label">Enter Your Rating</label>
              <input type="range" className="form-control"  min={0} max={5} step={1} onChange={(e) => {setRating(e.target.value)}} required />
              <span>Rating: {rating}</span>
            </div>
            <div className="input-field">
              <label className="form-label">Enter Your Review</label>
              <input type="text" className="form-control" onChange={(e) => {setReviewData({...reviewData, review: e.target.value})}} required />
            </div>
            <button onClick={(e) => handleSubmit(e)}>Post</button>
          </div>
        </div>
      </div>:<Loading />
      }
    </>
  )
}

export default MovieDetail