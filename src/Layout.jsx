import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Bar/Sidebar';

const Layout = ({ onLogout }) => {
  return (
    <div>
      <Navbar onLogout={onLogout} />
      <hr className='px-20'/>
      <div className="flex">
        <Sidebar />
        <div className="ml-64 mt-16 p-4 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
