import React, { useState } from 'react';
import '../Styles/NewMovie.css';
import { useDispatch, useSelector } from 'react-redux';
import { movieSelector, updateMovieThunk } from '../Redux/movieReducer';
import { useNavigate } from 'react-router-dom';

function EditMovie() {
    const {mve} = useSelector(movieSelector);
    const [updatedData, setUpdatedData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubit = (e) => {
        e.preventDefault();
        
        dispatch(updateMovieThunk({...updatedData, _id: mve._id}));
        navigate('/');
    }
    return (
        <div className='new-movie'>
            <h2>Edit Movie</h2>
            <form>
                <div className="input-field">
                    <label className="form-label">Enter Movie Name</label>
                    <input type="text" className="form-control" placeholder={mve.name} onChange={(e) => setUpdatedData({...updatedData, name: e.target.value})} required />
                </div>
                <div className="input-field">
                    <label className="form-label">Enter Movie Plot</label>
                    <input type="text" className="form-control" placeholder={mve.desc} onChange={(e) => setUpdatedData({...updatedData, desc: e.target.value})} required />
                </div>
                <div className="input-field">
                    <label className="form-label">Enter Movie Genre</label>
                    <input type="text" className="form-control" placeholder={mve.genre} onChange={(e) => setUpdatedData({...updatedData, genre: e.target.value})} required />
                </div>
                <div className="input-field">
                    <label className="form-label">Enter Movie Relese Year</label>
                    <input type="text" className="form-control" placeholder={mve.releaseYear} onChange={(e) => setUpdatedData({...updatedData, dreleaseYearesc: e.target.value})} required />
                </div>
                <div className="input-field">
                    <label className="form-label">Enter Movie Poster URL</label>
                    <input type="text" className="form-control" placeholder={mve.poster} onChange={(e) => setUpdatedData({...updatedData, poster: e.target.value})} required />
                </div>
                <div className="input-field">
                    <label className="form-label">Enter Movie Director Name</label>
                    <input type="text" className="form-control" placeholder={mve.director} onChange={(e) => setUpdatedData({...updatedData, director: e.target.value})} required />
                </div>
                <div className="input-field">
                    <label className="form-label">Enter Movie Actors Name</label>
                    <input type="text" className="form-control" placeholder={mve.actors} onChange={(e) => setUpdatedData({...updatedData, actors: e.target.value})} required />
                </div>
            </form>
            <button onClick={(e) => handleSubit(e)}>Submit</button>
        </div>
    )
}

export default EditMovie