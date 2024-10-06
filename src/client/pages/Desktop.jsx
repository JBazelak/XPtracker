import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const ProfilePage = () => {
  const { user } = useAuthContext();

  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/');
  }

  if(!user) {return <div>Ładowanie....</div>};

  return (
    <>
      <div>
        <h1>Profil użytkownika</h1>
        <p>Login: {user.login}</p>
        <p>Imię: {user.firstName}</p>
        <p>Nazwisko: {user.lastName}</p>
      </div>
      <button onClick={handleClick}>Wyloguj</button>
    </>
  );
};


export default ProfilePage;
