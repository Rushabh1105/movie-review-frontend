import React from 'react';
import '../Styles/MovieCard.css';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteMovieThunk, getMovieThunk, movieActions, updateWatchStatusThunk } from '../Redux/movieReducer';


function MovieCard(props) {
    const {movie} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // dispatch(movieActions.setMovie(movie));
    return (
        <div className='movie-card'>
            <div className='movie-poster'>
                <img src={movie.poster} alt='poster'/>
            </div>
            <div className='movie-info'>
                <h2>{movie.name}</h2>
                <p>{movie.director}</p>
                <p>{movie.actors}</p>
                <br/>
                <p>{movie.releaseYear}</p>
                <div className='extra-btns'>
                    <button onClick={() => {dispatch(getMovieThunk(movie)); navigate('/detail')}}>View More</button>
                    <button onClick={() => {dispatch(updateWatchStatusThunk(movie))}}>{movie.status}</button>
                </div>
            </div>
            <div className='movie-btns'>
                <FontAwesomeIcon icon={faTrash} className='delete' onClick={() => {dispatch(deleteMovieThunk(movie))}}/>
                <FontAwesomeIcon icon={faPen} className='edit' onClick={() => {dispatch(getMovieThunk(movie)); navigate('/edit')}}/>
            </div>
        </div>
    )
}

export default MovieCard
