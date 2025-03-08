import React, { useState, useEffect } from 'react';
import './index.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  return (
    <div className='grid grid-cols-12 h-screen'>
      {/* Login Form Section */}
      <div className='col-span-12 md:col-span-4 bg-gradient-to-b from-[#F0532D] to-[#d14522] min-h-screen p-8 flex items-center'>
        <div className='w-full max-w-md mx-auto'>
          <h1 className='text-4xl font-bold text-white mb-12 font-poppins'>Admin Portal</h1>
          
          <div className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-white/80 mb-2 font-inter'>Username</label>
              <input
                type='text'
                className='w-full px-4 py-3 rounded-lg bg-white/90 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 border border-gray-300 transition-all'
                placeholder='Enter username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-white/80 mb-2 font-inter'>Password</label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='w-full px-4 py-3 rounded-lg bg-white/90 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 border border-gray-300 transition-all pr-10'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password && (
                  <button
                    type='button'
                    onClick={togglePasswordVisibility}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors'
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FaEyeSlash className='w-4 h-4 text-[#000000]' /> : <FaEye className='w-4 h-4 text-[#000000]' />}
                  </button>
                )}
              </div>
              <button
                className='mt-2 text-sm text-white/80 hover:text-white underline transition-colors'
                onClick={() => setShowModal(true)}
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center'>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              className='w-full py-3.5 bg-white/90 hover:bg-white text-[#F0532D] font-semibold rounded-lg transition-all transform hover:scale-[1.01] shadow-lg'
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Graphic Section */}
      <div className='hidden md:block col-span-8 relative bg-[#F0532D]'>
        <div className='absolute inset-0 bg-gradient-to-r from-[#F0532D]/90 to-transparent' />
        <div className='h-full w-full bg-cover bg-center' style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600585154526-990dced4db0d")' }}>
          <div className='absolute bottom-8 left-8 text-white max-w-xl'>
            <h2 className='text-5xl font-bold mb-4 font-poppins'>Love Home Conveyancing</h2>
            <p className='text-lg font-inter opacity-90'>Secure Administration Portal</p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm'>
          <div className='bg-white p-8 rounded-xl max-w-md w-full mx-4 shadow-2xl relative'>
            <h2 className='text-2xl font-bold mb-4 text-gray-800'>Password Assistance</h2>
            <p className='text-gray-600 mb-6'>For security reasons, please contact your system administrator to reset your password.</p>
            <button
              className='w-full py-2.5 bg-[#F0532D] hover:bg-[#d14522] text-white rounded-lg transition-colors'
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
