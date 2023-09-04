import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.replace("/");
  };

  const onClickClose = () => {
    closeMenu();
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div id='nav-bar-top-right'>
      <button id='profile-button' onClick={openMenu}>
        <i style={{margin:'0 4px 0 6px'}} className="fa-solid fa-bars"></i>
        <i style={{margin:'0 3px 0 4px'}} className="fas fa-user-circle"/>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello, {user.firstName}.</li>
            <li>{user.email}</li>
            <hr></hr>
            <NavLink style={{textDecoration:'none'}} exact={true} to='/spots/current'>
              <div onClick={onClickClose} id='manage-links'>
                Manage Spots
              </div>
            </NavLink>
            <hr></hr>
            <NavLink style={{textDecoration:'none'}} exact={true} to='/reviews/current'>
              <div onClick={onClickClose} id='manage-links'>
                Manage Reviews
              </div>
            </NavLink>
            <hr></hr>
            <li>
              <button id='log-out-button' onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <div id='login-signup-text' className='login-signup-dropdown-buttons'>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
            <hr></hr>
            <div id='login-signup-text' className='login-signup-dropdown-buttons'>
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
