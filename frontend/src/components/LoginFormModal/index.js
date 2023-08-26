import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
        if (data && data.message === "The provided credentials were invalid.") {
          setErrors(data);
        }
      });
  };

  return (
    <div id='login'>
      <h1 id='login-title'>Log In</h1>
      <div className='login-errors'>
        {errors.credential && (<p>{errors.credential}</p>)}
        {errors.password && (<p>{errors.password}</p>)}
        {errors.message && (<p>{errors.message}</p>)}
      </div>
      <form id='login-form' onSubmit={handleSubmit}>
        <label className='login-label'>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            className="login-input"
          />
        </label>
        <label className='login-label'>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </label>
        <button type="submit" id='login-button' disabled={(credential.length >= 4 && password.length >= 6) ? false : true}>Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
