import React, { useState, useEffect } from 'react';
import './index.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleLogin = () => {
    const adminCredentials = {
      username: 'admin',
      password: 'lovehomeadmin',
    };

    if (username === adminCredentials.username && password === adminCredentials.password) {
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [username, password]);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 5000); // Close modal after 5 seconds
      return () => clearTimeout(timer); // Cleanup the timeout if the modal is closed manually
    }
  }, [showModal]);

  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-4 text-white font-sans font-bold  min-h-screen pl-7' id='backgroundform'>
        <div className='grid grid-rows-6 grid-flow-col min-h-screen items-center justify-items-start'>
          <div className='row-span-4 row-start-2 text-4xl'>
            Sign In
            <div className='pt-10 pr-20'>
              <label className='text-sm font-sans font-medium'>Username</label>
              <input
                type='text'
                name='username'
                placeholder='Write your username'
                className='w-full bg-white py-3 px-5 font-normal border hover:border-gray-500 rounded shadow text-base font-sans'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='pt-2 pr-20'>
              <label className='text-sm font-sans font-medium'>Password</label>
              <input
                type='password'
                name='password'
                placeholder='Write your password'
                className='w-full bg-white py-3 px-5 border hover:border-gray-500 rounded shadow font-normal text-base font-sans'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className='text-sm font-sans font-medium text-gray-600 underline'
                onClick={() => setShowModal(true)}
              >
                Forgot password?
              </button>
            </div>
            {error && <p className='text-red-500 text-sm pt-2'>{error}</p>}
            <div className='text-sm font-sans font-medium w-full pr-20 pt-14'>
              <button
                type='button'
                className='text-center w-full py-4 bg-[#19345E] hover:bg-blue-900 rounded-md text-white'
                onClick={handleLogin}
              >
                SIGN IN
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='banner col-span-8 text-white font-sans font-bold'>
        {/* Aquí iría algún comentario */}
      </div>

      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded shadow-lg relative z-10'>
            <h2 className='text-xl font-bold mb-4'>Forgot Password</h2>
            <p>Please contact the Developer.</p>
            <button
              className='mt-4 bg-blue-700 hover:bg-blue-400 text-white py-2 px-4 rounded'
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
          <div className='fixed inset-0 bg-black opacity-50'></div>
        </div>
      )}
    </div>
  );
};

export default Login;
