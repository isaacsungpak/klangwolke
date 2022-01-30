import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import styled from 'styled-components';

const FormStyling = styled.div`
  height: 300px;
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

  #error {
    color: #FF002B;
    font-size: 16px;
  }

  input {
    font-family: 'Roboto Condensed', sans-serif;
    outline: none;
    border: none;
    border-bottom: 1px solid #AAA;
    font-size: 20px;
    width: 100%;
    transition: all 0.3s ease-in-out;
  }

  input:focus {
    border-bottom: 1px solid black;
  }

  #button-container {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  label {
    font-size: 14px;
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

  button:hover {
    box-shadow: 1px 3px 2px rgba(0, 0, 0, 0.3);
  }
`

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);

  const onLogin = async (e) => {
    e.preventDefault();
    dispatch(login({email, password}))
      .then((res) => {
        if (res.error) setError(res.payload[0]);
        else history.push('/');
      })
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    dispatch(login({email: "demo_user@beispiel.de", password: "password"}));
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <FormStyling>
      <form onSubmit={onLogin}>
        <div>
          {error !== '' &&
            <div id='error'>{error}</div>
          }
        </div>
          <div>
            <label>Email</label>
            <input
              name='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              name='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div id="button-container">
            <button type='submit'>Login</button>
            <button onClick={demoLogin}>Demo User</button>
          </div>
      </form>
    </FormStyling>
  );
};

export default LoginForm;
