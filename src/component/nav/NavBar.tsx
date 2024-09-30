import React from 'react'
import { getImageUrl } from '../../utils'

const NavBar = () => {
    return (
      <nav className="p-4" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold ">
          <img src={getImageUrl("piggy.png")} alt="MyApp Logo" className="ml-4 h-20" /> {/* Adjust height as needed */}
            <a href="/" style={{ color: 'var(--color-text' }}>SpendSmart</a>
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
              <a href="#" className="text-gray-300 hover:text-white">Contact</a>
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
        </div>
      </nav>
    );
  }
  

export default NavBar