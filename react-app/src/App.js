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
import SearchPage from './components/SearchPage';
import LibraryPage from './components/LibraryPage';

const MainBody = styled.div`
  width: 100%;
  position: fixed;
  z-index: -10;
  top: 60px;
  bottom: 88px;
  display: flex;
  justify-content: center;
  background-color: #EEE;
`

const Content = styled.div`
  width: 1240px;
  height: 100%;
  background-color: white;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  padding: 0px;
  overflow-y: auto;
  overflow-x: hidden;

  @media screen and (max-width: 1240px) {
    width: 1000px;
  }

  @media screen and (max-width: 1000px) {
    width: 720px;
  }
`
const LinkContainer = styled.div`
  width: fit-content;
  position: fixed;
  bottom: 90px;
  right: 0px;

  a {
    font-size: 40px;
    color: #AAA;
    opacity: 50%;
    margin: 5px;
    transition: all 0.2s ease-in-out;
  }

  a:hover {
    opacity: 100%;
  }

  #gh:hover {
    color: #bd2c00;
  }

  #li:hover {
    color: #0072b1
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
                <LibraryPage/>
              </ProtectedRoute>
              <Route path='/' exact={true} >
                <HomePage />
              </Route>
            </Switch>
          </Content>
          <LinkContainer>
            <a id="gh" href='https://github.com/isaacsungpak/klangwolke'><i className="fab fa-github-square"></i></a>
            <a id="li" href='https://www.linkedin.com/in/isaac-pak-b4324421b/'><i className="fab fa-linkedin"></i></a>
          </LinkContainer>
        </MainBody>
        <FooterBar />
      </>
    }
    </BrowserRouter>
  );
}

export default App;
