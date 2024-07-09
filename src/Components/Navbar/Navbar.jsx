import React from 'react';
import assets from '../../assets/assets';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  return (
    <div className='w-full h-auto max-w-screen-4xl sticky top-0 z-50 bg-white'>
      <div className='py-4 px-6 flex flex-row items-center justify-between'>
        <a href="">
          <img src={assets.logoBlackRed} className='w-[15rem] hover:scale-105 transition ease-in-out duration-500' alt="" />
        </a>
        <div className='flex flex-row items-center justify-between gap-5'>
          <img src={assets.profile_1} className='w-10 cursor-pointer' id='profile' alt="" />
          <button
            className='bg-[#f0532d] py-2 px-4 rounded-[6px] text-white font-bold text-sm font-sans hover:scale-110 transition ease-in-out duration-500'
            onClick={onLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
