import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import styled from "styled-components";
import Pammer from "./images/Pammer.png"

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  background-color: black;
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
  }

  a {
    text-decoration: none;
    color: #CCC
  }

  #logo-holder {
    width: 100px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #logo {
    height: 50px;
  }

  .nav-option {
    border-right: 1px solid #333;
    height: 60px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a.active .nav-option {
    background-color: #333;
  }

  .starter-tab {
    border-left: 1px solid #333;
  }

  #search-form {
    height: 60px;
    width: 684px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #searchbar {
    width: 640px;
    height: 26px;
    border-radius: 5px;
    outline: none;
    padding-left: 5px;
    font-family:'Roboto Condensed', sans-serif;
    font-size: 16px;
  }

  .user-tab {
    border-right: 1px solid #333;
    height: 60px;
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const NavBar = () => {
  const user = useSelector(state => state.session.user);

  return (
    <StyledNav>
      <ul>
        <li>
          <Link to='/'>
            <div id="logo-holder">
              <img src={Pammer} id="logo" alt="Pammer, the Klangwolke"/>
            </div>
          </Link>
        </li>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            <div className='nav-option starter-tab'><div>Home</div></div>
          </NavLink>
        </li>
        <li>
          <NavLink to='/library' exact={true} activeClassName='active'>
            <div className='nav-option'><div>Library</div></div>
          </NavLink>
        </li>
        <li>
          <form id="search-form">
            <input id="searchbar" placeholder="Search"/>
          </form>
        </li>
        <li>
          <NavLink to='/upload' exact={true} activeClassName='active'>
            <div className='nav-option starter-tab'><div>Upload</div></div>
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            {user ?
              <div className='user-tab' id="user">{user.username}</div>:
              <div className='user-tab' id="login">Login</div>}
          </NavLink>
        </li>
      </ul>
    </StyledNav>
  );
}

export default NavBar;
