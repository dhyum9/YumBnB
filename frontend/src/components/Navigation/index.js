import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul id='nav-bar'>
      <NavLink exact to='/'>
        <div id='nav-bar-top-left'>
          <i className="fa-solid fa-person-running"></i>
          <h1>YumBnB</h1>
        </div>
      </NavLink>
      {isLoaded && (
        <div id='nav-bar-top-right'>
          <i className="fa-solid fa-bars"></i>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </ul>
  );
}

export default Navigation;
