import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import styled from 'styled-components';

const FormStyling = styled.div`
  height: auto;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    width: 100%;
  }

  form > div {
    width: 460px;
    margin: 20px;
  }

  .errors {
    color: #FF002B;
    font-size: 16px;
  }

  label {
    font-size: 14px;
  }

  input {
    outline: none;
    border: none;
    border-bottom: 1px solid #AAA;
    font-size: 20px;
    width: 100%;
    font-family: 'Roboto Condensed', sans-serif;
  }

  input:not(.mismatch):focus {
    border-color: black;
  }

  .mismatch {
    border-color: #FF002B;
  }

  button {
    font-family: 'Roboto Condensed', sans-serif;
    color: black;
    outline: none;
    border: 1px solid black;
    background-color: white;
    font-size: 16px;
    font-weight: 500;
    padding: 10px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .disabled {
    cursor: default;
  }

  button:not(.disabled):hover {
    box-shadow: 1px 3px 2px rgba(0, 0, 0, 0.3);
  }
`

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerDisabled, setRegisterDisabled] = useState(true);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = dispatch(signUp({username, email, password}));
      if (data) {
        setErrors(data.payload)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    setRegisterDisabled(errors.length !== 0 || !username || !email || !password || password != confirmPassword);
  }, [errors, username, email, password, confirmPassword])

  return (
    <>
      {user ?
        <Redirect to='/' />:
        <>
          <FormStyling>
            <form onSubmit={onSignUp}>
              <div>
                {errors.map((error, ind) => (
                  <div className='errors' key={ind}>{error}</div>
                ))}
              </div>
              <div>
                <label>Username</label>
                <input
                  type='text'
                  name='username'
                  onChange={updateUsername}
                  value={username}
                  required
                ></input>
              </div>
              <div>
                <label>Email</label>
                <input
                  type='text'
                  name='email'
                  onChange={updateEmail}
                  value={email}
                  required
                ></input>
              </div>
              <div>
                <label>Password</label>
                <input
                  type='password'
                  name='password'
                  onChange={updatePassword}
                  value={password}
                  required
                ></input>
              </div>
              <div>
                <label>Confirm Password</label>
                <input
                  type='password'
                  name='Confirm_password'
                  onChange={updateConfirmPassword}
                  value={confirmPassword}
                  required
                  className={password !== confirmPassword ? 'mismatch' : ''}
                ></input>
              </div>
              <button type='submit' disabled={registerDisabled} className={registerDisabled ? 'disabled' : ''}>Register</button>
            </form>
          </FormStyling>
        </>
      }
    </>
  );
};

export default SignUpForm;
