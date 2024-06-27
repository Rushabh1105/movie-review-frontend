import React, { useEffect } from 'react';
import '../Styles/HomePage.css'
import MovieCard from '../Components/MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMoviesThunk, movieSelector } from '../Redux/movieReducer';
import Loading from '../Components/Loading';

function HomePage() {

  const dispatch = useDispatch();

  const {movies, loading} = useSelector(movieSelector);

  useEffect(() => {
    dispatch(getAllMoviesThunk());
  }, [])

  // useEffect(() => {
  //   dispatch(getAllMoviesThunk());
  // }, [loading]);


  return (
    <div className='movies'>
        {
            loading? <Loading /> : movies?movies.map((movie, idx) => (
                <MovieCard key={idx} movie={movie}/>
            )):<h1>No Movies To Display</h1>
        }
    </div>
  )
}

export default HomePage