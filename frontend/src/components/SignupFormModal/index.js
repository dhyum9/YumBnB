import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div id='signup'>
      <h1 id='signup-title'>Sign Up</h1>
      <div className='signup-errors'>
        {errors.firstName && (<p>{errors.firstName}</p>)}
        {errors.lastName && (<p>{errors.lastName}</p>)}
        {errors.email && (<p>{errors.email}</p>)}
        {errors.username && (<p>{errors.username}</p>)}
        {errors.password && (<p>{errors.password}</p>)}
        {errors.confirmPassword && (<p>{errors.confirmPassword}</p>)}
      </div>
      <form id='signup-form' onSubmit={handleSubmit}>
        <label className='signup-label'>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className='signup-input'
          />
        </label>
        <label className='signup-label'>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className='signup-input signup-input-evens'
          />
        </label>
        <label className='signup-label'>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='signup-input'
          />
        </label>
        <label className='signup-label'>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className='signup-input signup-input-evens'
          />
        </label>
        <label className='signup-label'>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='signup-input'
          />
        </label>
        <label className='signup-label'>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className='signup-input signup-input-evens'
          />
        </label>
        <button id='signup-button'type="submit"
          disabled={(
            firstName.length === 0 ||
            lastName.length === 0 ||
            email.length === 0 ||
            username.length < 4 ||
            password.length < 6 ||
            confirmPassword.length === 0 ?
            true : false
          )}
        >Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
