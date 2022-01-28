import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
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

  .bad-input {
    color: #FF002B;
  }

  input {
    outline: none;
    border: none;
    border-bottom: 1px solid #AAA;
    font-size: 20px;
    width: 100%;
    font-family: 'Roboto Condensed', sans-serif;
  }

  input:not(.bad-input-field):focus {
    border-color: black;
  }

  .bad-input-field {
    border-color: #FF002B;
  }

  button {
    font-family: 'Roboto Condensed', sans-serif;
    color: black;
    outline: none;
    border: 1px black solid;
    background-color: white;
    font-size: 16px;
    font-weight: 500;
    margin: 20px;
    margin-top: 0;
    // margin-bottom: 30px;
    padding: 7px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  .disabled {
    cursor: default;
    color: #CCC;
    border: 1px #CCC dashed;
  }

  button:not(.disabled):hover {
    box-shadow: 1px 3px 2px rgba(0, 0, 0, 0.3);
  }
`

const SignUpForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([]);

  const [usernameLabel, setUsernameLabel] = useState('Username');
  const [username, setUsername] = useState('');

  const [emailLabel, setEmailLabel] = useState('Email');
  const [email, setEmail] = useState('');

  const [passwordLabel, setPasswordLabel] = useState('Password');
  const [password, setPassword] = useState('');

  const [confirmPasswordLabel, setConfirmPasswordLabel] = useState('Confirm Password');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerDisabled, setRegisterDisabled] = useState(true);
  const user = useSelector(state => state.session.user);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(signUp({ username, email, password }))
        .then((res) => {
          if (res.error) setErrors(res.payload);
          else history.push('/');
        })
    }
  };

  const updateUsername = (e) => {
    const usernameString = e.target.value;
    const trimmedUsername = usernameString.replaceAll(/[ ​]+/g, '');
    if (trimmedUsername.length === 0) setUsernameLabel('Username must contain at least 1 non-space character');
    else if (usernameString.length > 100) setUsernameLabel('Username length cannot exceed 100 characters');
    else setUsernameLabel('Username');
    setUsername(usernameString);
  };

  const emailPattern = /^[\w.]+@\w+\.\w+$/g
  const updateEmail = (e) => {
    const emailString = e.target.value;
    const matchesPatern = emailPattern.test(emailString);
    if (matchesPatern) setEmailLabel('Email');
    else setEmailLabel('Please enter a valid email address');
    setEmail(emailString);
  };

  const updatePassword = (e) => {
    const passwordString = e.target.value;
    if (passwordString.length < 6) setPasswordLabel('Password must contain 6 or more characters');
    else setPasswordLabel('Password');
    setPassword(passwordString);
  };

  const updateConfirmPassword = (e) => {
    const confirmPasswordString = e.target.value;
    if (confirmPasswordString !== password) setConfirmPasswordLabel('Password confirmation must match password');
    else setConfirmPasswordLabel('Confirm Password')
    setConfirmPassword(confirmPasswordString);
  };

  useEffect(() => {
    setRegisterDisabled(!username || usernameLabel !== 'Username' ||
      !email || emailLabel !== 'Email' ||
      !password || passwordLabel !== 'Password' ||
      !confirmPassword || password !== confirmPassword);
  }, [errors, username, usernameLabel, email, emailLabel, password, passwordLabel, confirmPassword, confirmPasswordLabel])

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
                <label className={usernameLabel === 'Username' ? '' : 'bad-input'}>{usernameLabel}</label>
                <input
                  type='text'
                  name='username'
                  onChange={updateUsername}
                  value={username}
                  className={usernameLabel === 'Username' ? '' : 'bad-input-field'}
                  required
                ></input>
              </div>
              <div>
                <label className={emailLabel === 'Email' ? '' : 'bad-input'}>{emailLabel}</label>
                <input
                  type='text'
                  name='email'
                  onChange={updateEmail}
                  value={email}
                  className={emailLabel === 'Email' ? '' : 'bad-input-field'}
                  required
                ></input>
              </div>
              <div>
                <label className={passwordLabel === 'Password' ? '' : 'bad-input'}>{passwordLabel}</label>
                <input
                  type='password'
                  name='password'
                  onChange={updatePassword}
                  value={password}
                  className={passwordLabel === 'Password' ? '' : 'bad-input-field'}
                  required
                ></input>
              </div>
              <div>
                <label className={confirmPasswordLabel === 'Confirm Password' ? '' : 'bad-input'}>{confirmPasswordLabel}</label>
                <input
                  type='password'
                  name='Confirm_password'
                  onChange={updateConfirmPassword}
                  value={confirmPassword}
                  className={confirmPasswordLabel === 'Confirm Password' ? '' : 'bad-input-field'}
                  required
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
