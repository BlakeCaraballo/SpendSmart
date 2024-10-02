import React from 'react';
import { getImageUrl } from '../../utils';
import useLocalStorage from 'use-local-storage';

const NavBar = () => {
  // Using useLocalStorage to manage the dark mode preference
  const [isDarkMode, setIsDarkMode] = useLocalStorage('theme', 'light');

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  // Apply the theme to the body
  React.useEffect(() => {
    if (isDarkMode === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <nav className="p-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold ">
          <img src={getImageUrl("piggy.png")} alt="MyApp Logo" className="ml-4 h-20" />
          <a href="/" style={{ color: 'var(--color-text)' }}>SpendSmart</a>
        </div>
        <ul className="hidden md:flex space-x-6">
          <li>
            <a href="#" className="text-gray-300 hover:text-white">Home</a>
          </li>
          <li>
            <a href="#hero" className="text-gray-300 hover:text-white">About</a>
          </li>
          <li>
            <a href="#form" className="text-gray-300 hover:text-white">Form</a>
          </li>
          <li>
            <a href="#history" className="text-gray-300 hover:text-white">History</a>
          </li>
        </ul>
        <div className="md:hidden">
          {/* Hamburger Menu Icon */}
          <button className="text-gray-300 hover:text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        {/* Dark Mode Toggle Button */}
        <button 
          onClick={toggleDarkMode} 
          className="ml-4 text-gray-300 hover:text-white focus:outline-none"
        >
          {isDarkMode === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
