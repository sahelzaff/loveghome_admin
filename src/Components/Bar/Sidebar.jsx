import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="fixed top-16 left-0 w-[19.6%] h-full bg-[#fff] p-4 border-r-2 border-gray-400">
      <ul className='Home flex flex-col items-center justify-center gap-5 pt-5 '>
        <li className='py-3 px-12 text-center cursor-pointer border-b-2 border-gray-300'>
          <NavLink exact to="/" activeClassName="active-link">Home</NavLink>
        </li>
        <li className='py-3 px-12 text-center cursor-pointer border-b-2 border-gray-300'>
          <NavLink to="/leads" activeClassName="active-link">Contact</NavLink>
        </li>
        <li className='py-3 px-12 text-center cursor-pointer border-b-2 border-gray-300'>
          <NavLink to="/leads-cal" activeClassName="active-link">Calculator</NavLink>
        </li>
        <li className='py-3 px-12 text-center cursor-pointer border-b-2 border-gray-300'>
          <NavLink to="/blogs" activeClassName="active-link">Blogs</NavLink>
        </li>
        <li className='py-3 px-12 text-center cursor-pointer border-b-2 border-gray-300'>
          <NavLink to="/profile" activeClassName="active-link">Profile</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
