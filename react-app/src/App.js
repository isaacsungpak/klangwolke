import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';
import { authenticate } from './store/session';
import styled from 'styled-components';

import HomePage from './components/HomePage';
import UploadSong from './components/SongForms/UploadSong';
import FooterBar from './components/FooterBar';

const MainBody = styled.div`
  width: 100%;
  position: fixed;
  top: 60px;
  bottom: 88px;
  display: flex;
  justify-content: center;
  background-color: #FFF;
`

const Content = styled.div`
  width: 1240px;
  // background-color: green;
`

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticate()).then(() => setLoaded(true));
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
        <MainBody>
          <Content>
            <Switch>
              <Route path='/login' exact={true}>
                <LoginForm />
              </Route>
              <Route path='/sign-up' exact={true}>
                <SignUpForm />
              </Route>
              <Route path='/users/:userId' exact={true} >
                <User />
              </Route>
              <Route path='/' exact={true} >
                <HomePage />
              </Route>
              <ProtectedRoute path='/upload' exact={true} >
                <UploadSong />
              </ProtectedRoute>
              <ProtectedRoute path='/library'>
                <UploadSong />
              </ProtectedRoute>
            </Switch>
          </Content>
      </MainBody>
      <FooterBar />
    </BrowserRouter>
  );
}

export default App;
