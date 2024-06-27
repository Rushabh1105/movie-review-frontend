import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import '../Styles/Navbar.css';
import { NavLink, Outlet } from 'react-router-dom';

function Navbar() {
  return (
    <>
        <div className='navbar'>
            <div className='app-logo'>
                <NavLink to='/'>
                    <FontAwesomeIcon icon={faFilm} />
                </NavLink>
                <NavLink to='/'>
                    <h3>Movie-Review</h3>
                </NavLink>
            </div>

            <div className='add-movie'>
                <NavLink to='/new'>
                    <button> <b>Add New Movie</b></button>
                </NavLink>
            </div>
        </div>
        <Outlet />
    </>
  )
}

export default Navbar