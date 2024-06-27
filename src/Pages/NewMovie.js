import React, { useState } from 'react';
import '../Styles/NewMovie.css';
import { useDispatch } from 'react-redux';
import { AddMovieThunk } from '../Redux/movieReducer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function NewMovie() {
    const [movie, setMovie] = useState({});
    const disptch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(movie){
            disptch(AddMovieThunk(movie));
            navigate('/');
        }else{
            toast('Add required fields');
        }
    }
    return (
        <div className='new-movie'>
            <h2>Add New Movie</h2>
            <form>
                <div className="input-field">
                    <label className="form-label">Enter Movie Name</label>
                    <input type="text" className="form-control" onChange={(e) => {setMovie({...movie, name: e.target.value})}} required />
                </div>
                <div className="input-field">
                    <label className="form-label">Enter Movie Plot</label>
                    <input type="text" className="form-control" onChange={(e) => {setMovie({...movie, desc: e.target.value})}} required />
                </div>
                <div className="input-field">
                    <label className="form-label">Enter Movie Genre</label>
                    <input type="text" className="form-control" onChange={(e) => {setMovie({...movie, genre: e.target.value})}} required />
                </div>
                <div className="input-field">
                    <label className="form-label">Enter Movie Relese Year</label>
                    <input type="text" className="form-control" onChange={(e) => {setMovie({...movie, releaseYear: e.target.value})}} required />
                </div>
                <div className="input-field">
                    <label className="form-label">Enter Movie Poster URL</label>
                    <input type="text" className="form-control" onChange={(e) => {setMovie({...movie, poster: e.target.value})}} required />
                </div>
                <div className="input-field">
                    <label className="form-label">Enter Movie Director Name</label>
                    <input type="text" className="form-control" onChange={(e) => {setMovie({...movie, director: e.target.value})}} required />
                </div>
                <div className="input-field">
                    <label className="form-label">Enter Movie Actors Name</label>
                    <input type="text" className="form-control" onChange={(e) => {setMovie({...movie, actors: e.target.value})}} required />
                </div>
            </form>
            <button onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
    )
}

export default NewMovie