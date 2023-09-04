import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .then(history.push("/"))
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

  const DemoUserLogin = () => {
    let payload = {
      credential: "Demo-lition",
      password: "password"
    }
    dispatch(sessionActions.login(payload)).then(closeModal);
  }

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
        <button onClick={DemoUserLogin} id='demo-user-button'>Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
