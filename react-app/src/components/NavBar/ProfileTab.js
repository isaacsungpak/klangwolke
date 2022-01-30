import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { logout } from "../../store/session";

const Profile = styled.div`
  color: #CCC;

  #user {
    display: grid;
    grid-template-columns: 0px 15px 1fr 15px 0px;
    grid-template-rows: 10px 20px 10px;
    gap: 10px;
  }

  #profile-circle {
    grid-column: 2;
    grid-row: 2;
    text-align: center;
  }

  #username {
    grid-column: 3;
    grid-row: 2;
    text-align: left;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  #arrow {
    grid-column: 4;
    grid-row: 2;
    text-align: center;
  }
`

const Menu = styled.div`
  color: black;
  background-color: white;
  height: 120px;
  width: 149px;
  border: 1px solid black;
  border-top: none;
  box-shadow: 2px 4px 4px rgba(0,0,0,0.5);
  z-index: 1000;

  display: flex;
  flex-direction: column;

  div {
    height: 19px;
    width: 129px;
    padding: 10px;
    border-bottom: 1px solid #EEE;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  #logout {
    height: 20px;
    border-bottom: none;
    cursor: pointer;
    color: #407BA7;
    font-weight: 700;
    transition: all 0.3s ease-in-out;
  }

  #logout:hover {
    background-color: #407BA7;
    color: white;
  }
`

function ProfileTab({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logoutRequest = async (e) => {
    e.preventDefault();
    await dispatch(logout());
  };

  return (
    <Profile menu={showMenu}>
      <div className="user-tab" id="user" onClick={openMenu}>
        <i className="fas fa-user-circle" id="profile-circle"/>
        <div id="username">{user.username}</div>
        {showMenu ? <i className="fas fa-chevron-up" id="arrow"/> : <i className="fas fa-chevron-down" id="arrow"/>}
      </div>
      {showMenu && (
        <Menu>
            <div id="menu-username">{user.username}</div>
            <div id="menu-email">{user.email}</div>
            <div id="logout"onClick={logoutRequest}>Log Out</div>
        </Menu>
      )}
    </Profile>
  )
}

export default ProfileTab;
