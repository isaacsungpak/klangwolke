import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import LoginForm from './components/auth/LoginForm';
// import SignUpForm from './components/auth/SignUpForm';
// import User from './components/User';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import styled from 'styled-components';

import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import UploadSong from './components/SongForms/UploadSong';
import FooterBar from './components/FooterBar';
import EditSong from './components/SongForms/EditSong';

const MainBody = styled.div`
  width: 100%;
  position: fixed;
  z-index: -1;
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
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <BrowserRouter>
    {isLoaded &&
      <>
        <NavBar />
        <MainBody>
          <Content>
            <Switch>
              <Route path='/auth' exact={true}>
                <AuthPage />
              </Route>
              <Route path='/users/:userId'>
                {/* <User /> */}
                <Redirect to="/" />
              </Route>
              <Route path='/songs/:songId'>
                {/* <User /> */}
                <Redirect to="/" />
              </Route>
              <Route path='/search'>
                <Redirect to="/" />
              </Route>
              <ProtectedRoute path='/upload' exact={true} >
                <UploadSong />
              </ProtectedRoute>
              <ProtectedRoute path='/library'>
                <EditSong />
              </ProtectedRoute>
              <Route path='/' exact={true} >
                <HomePage />
              </Route>
            </Switch>
          </Content>
        </MainBody>
        <FooterBar />
      </>
    }
    </BrowserRouter>
  );
}

export default App;
