import React from 'react';
import { Outlet } from 'react-router-dom';


import SideMenu from "../components/SideMenu";

const ProfilePage = () => {

  return (
    <>
      <SideMenu/>
      <Outlet/>
    </>
  );
};


export default ProfilePage;
