import React, { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from "styled-components";
import Pammer from "../images/Pammer.png"
import ProfileTab from './ProfileTab';

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
    width: 630px;
    height: 26px;
    border: none;
    outline: none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding-left: 5px;
    font-family:'Roboto Condensed', sans-serif;
    font-size: 16px;
  }

  #search-button {
    width: 30px;
    height: 28px;
    border: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    cursor: pointer;
    color: white;
    background-color: #407BA7;
    transition: all 0.3s ease-in-out;
  }

  #search-button.disabled {
    cursor: default;
    color: #407BA7;
    background-color: white;
  }

  .user-tab {
    border-right: 1px solid #333;
    width: 150px;
    cursor: pointer;
  }

  #login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
  }
`
const NavBar = () => {
  const history = useHistory();

  const user = useSelector(state => state.session.user);
  const [searchKey, setSearchKey] = useState("");

  const searchSubmit = e => {
    e.preventDefault();
    history.push(`/search?key=${searchKey}`)
  }

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
          <form id="search-form" onSubmit={searchSubmit}>
            <input id="searchbar" placeholder="Search" value={searchKey} onChange={e => setSearchKey(e.target.value)}/>
            <button id="search-button" disabled={searchKey === ""} className={searchKey === "" ? "disabled" : ""}><i className="fas fa-search"></i></button>
          </form>
        </li>
        <li>
          <NavLink to='/upload' exact={true} activeClassName='active'>
            <div className='nav-option starter-tab'><div>Upload</div></div>
          </NavLink>
        </li>
        <li>
            {user ?
              <ProfileTab user={user} />:
              <NavLink to="/auth"><div className='user-tab' id="login">Register/Login</div></NavLink>}
        </li>
      </ul>
    </StyledNav>
  );
}

export default NavBar;
