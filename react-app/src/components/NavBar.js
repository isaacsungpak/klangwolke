import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import styled from "styled-components";

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
    width: 1240px;
  }

  a {
    text-decoration: none;
    color: #CCC
  }

  #logo-holder {
    width: 80px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #75B1DE;
  }

  #logo {
    height: 50px;
  }

  .nav-option {
    padding: 20px;
    border-right: 1px solid #333;
    height: 20px;
  }

  a.active .nav-option {
    background-color: #333;
  }
`
const NavBar = () => {
  return (
    <StyledNav>
      <ul>
        <li>
          <Link to='/'>
            <div id="logo-holder">
              <img src="/Pammer.png" id="logo" alt="Pammer, the Klangvolke"/>
            </div>
          </Link>
        </li>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            <div className='nav-option'>Home</div>
          </NavLink>
        </li>
        <li>
          <NavLink to='/library' exact={true} activeClassName='active'>
            <div className='nav-option'>Library</div>
          </NavLink>
        </li>
        <li>
          <NavLink to='/upload' exact={true} activeClassName='active'>
            <div className='nav-option'>Upload</div>
          </NavLink>
        </li>
        <li>
          <NavLink to='/temp' exact={true} activeClassName='active'>
            <div>User</div>
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </StyledNav>
  );
}

export default NavBar;
