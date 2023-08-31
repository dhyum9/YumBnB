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
    <div id='dropdown'>
      <button id='profile-button' onClick={openMenu}>
        <i className="fas fa-user-circle"/>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello, {user.firstName}.</li>
            <li>{user.email}</li>
            <hr></hr>
            <NavLink exact={true} to='/spots/current'>
              <div onClick={onClickClose} id='manage-links'>
                Manage Spots
              </div>
            </NavLink>
            <hr></hr>
            <NavLink exact={true} to='/reviews/current'>
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
            <div className='login-signup-dropdown-buttons'>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
            <hr></hr>
            <div className='login-signup-dropdown-buttons'>
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
