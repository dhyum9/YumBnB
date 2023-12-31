import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul id='nav-bar'>
      <NavLink style={{color: "#e3dcd2", textDecoration:'none'}}exact to='/'>
        <div id='nav-bar-top-left'>
          <i className="fa-solid fa-person-running"></i>
          <h1>YumBnB</h1>
        </div>
      </NavLink>
      <div id='nav-bar-top-right-with-link'>
          {sessionUser && (
            <NavLink style={{textDecoration:'none'}} exact={true} to='/spots'>
              <div id='create-a-new-spot-link'>
                <i style={{marginRight: "7px"}} className="fa-solid fa-circle-plus"></i>
                Create a New Spot
              </div>
            </NavLink>
          )}
          {isLoaded && (
            <div>
              <ProfileButton user={sessionUser} />
            </div>
          )}
      </div>
    </ul>
  );
}

export default Navigation;
