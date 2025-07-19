import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false); 
  };

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false); 
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 shadow-lg rounded-b-xl relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-3xl font-bold font-inter tracking-wide" onClick={handleNavLinkClick}>
          Vent System
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="text-white focus:outline-none focus:ring-2 focus:ring-white p-2 rounded-md"
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? (
            
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

    
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-white hover:text-blue-200 transition-colors duration-300 text-lg font-medium">
            Home
          </Link>
          {currentUser ? (
            <>
        
              <Link to="/add-vent" className="text-white hover:text-blue-200 transition-colors duration-300 text-lg font-medium">
                Add Vent
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-blue-200 transition-colors duration-300 text-lg font-medium">
                Login
              </Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg pb-4 rounded-b-xl animate-fade-in-down">
          <div className="flex flex-col items-center space-y-4 pt-4">
            <Link to="/" className="text-white hover:text-blue-200 transition-colors duration-300 text-lg font-medium w-full text-center py-2" onClick={handleNavLinkClick}>
              Home
            </Link>
            {currentUser ? (
              <>
              
                <Link to="/add-vent" className="text-white hover:text-blue-200 transition-colors duration-300 text-lg font-medium w-full text-center py-2" onClick={handleNavLinkClick}>
                  Add Vent
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 w-auto"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-blue-200 transition-colors duration-300 text-lg font-medium w-full text-center py-2" onClick={handleNavLinkClick}>
                  Login
                </Link>
                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 w-auto">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;