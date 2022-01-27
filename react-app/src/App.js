import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import styled from 'styled-components';

import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import FooterBar from './components/FooterBar';

import SANDBOX from './components/SANDBOX';
import SearchPage from './components/SearchPage';

const MainBody = styled.div`
  width: 100%;
  position: fixed;
  z-index: -1;
  top: 60px;
  bottom: 88px;
  display: flex;
  justify-content: center;
  background-color: #EEE;
`

const Content = styled.div`
  width: 1240px;
  background-color: white;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  overflow-y: auto;

  @media screen and (max-width: 1240px) {
    width: 1000px;
  }

  @media screen and (max-width: 1000px) {
    width: 720px;
  }
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
        <NavBar/>
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
                <SearchPage />
              </Route>
              <ProtectedRoute path='/library'>
                <SANDBOX />
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
