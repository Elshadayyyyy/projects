import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { FaHome, FaStore, FaUser, FaPlus, FaShoppingCart, FaCoins } from 'react-icons/fa';

const Navbar = ({ cartCount }) => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCountState, setCartCountState] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart') || '[]').length; } catch { return 0; }
  });

  useEffect(() => {
    const onStorage = () => {
      try { setCartCountState(JSON.parse(localStorage.getItem('cart') || '[]').length); } catch { setCartCountState(0); }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Helper component for icon + hover label
  const NavIcon = ({ to, icon, label, badge }) => (
    <Link to={to} className="relative group flex items-center justify-center p-2 text-gray-700 hover:text-gray-900">
      {icon}
      {/* Hover label */}
      <span className="absolute bottom-0 translate-y-full opacity-0 group-hover:opacity-100 transition-all bg-gray-800 text-white text-xs rounded px-2 py-1 mt-1 whitespace-nowrap">
        {label}
      </span>
      {/* Badge for cart */}
      {badge > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </Link>
  );

  return (
    <nav className="bg-white shadow-md p-3 sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          GebeyaTok
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <NavIcon to="/" icon={<FaHome size={20} />} label="Home" />
          <NavIcon to="/shop" icon={<FaStore size={20} />} label="Shop" />
          {currentUser && <NavIcon to="/add-post" icon={<FaPlus size={20} />} label="Add Post" />}
          <NavIcon to={currentUser ? '/cart' : '/login'} icon={<FaShoppingCart size={20} />} label="Cart" badge={cartCountState} />
          {currentUser && (
            <div className="relative group flex items-center space-x-2 px-2 text-gray-700">
              <FaCoins size={18} />
              <span className="text-sm font-medium">{currentUser.coins || 0}</span>
              {/* Hover tooltip for coins */}
              <span className="absolute bottom-0 translate-y-full opacity-0 group-hover:opacity-100 transition-all bg-gray-800 text-white text-xs rounded px-2 py-1 mt-1 w-64 text-center">
                This increases every time you purchase something. When you have enough, you can use this as a currency to buy something on this platform.
              </span>
            </div>
          )}
          {currentUser ? (
            <>
              <NavIcon to={currentUser ? `/profile/${currentUser.username}` : '/login'} icon={<FaUser size={20} />} label="Profile" />
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-700">Login</Link>
              <Link
                to="/register"
                className="bg-black text-white px-3 py-1 rounded-md"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl"
          >
            {isMobileMenuOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col mt-2 space-y-2 bg-gray-50 p-4 rounded-md shadow-md">
          <NavIcon to="/" icon={<FaHome size={20} />} label="Home" />
          <NavIcon to="/shop" icon={<FaStore size={20} />} label="Shop" />
          {currentUser && <NavIcon to="/add-post" icon={<FaPlus size={20} />} label="Add Post" />}
          <NavIcon to={currentUser ? '/cart' : '/login'} icon={<FaShoppingCart size={20} />} label="Cart" badge={cartCountState} />
          {currentUser && (
            <div className="relative group flex items-center space-x-2 px-2 text-gray-700">
              <FaCoins size={18} />
              <span className="text-sm font-medium">{currentUser.coins || 0}</span>
              {/* Hover tooltip for coins in mobile too */}
              <span className="absolute bottom-0 translate-y-full opacity-0 group-hover:opacity-100 transition-all bg-gray-800 text-white text-xs rounded px-2 py-1 mt-1 w-64 text-center">
                This increases every time you purchase something. When you have enough, you can use this as a currency to buy something on this platform.
              </span>
            </div>
          )}
          {currentUser ? (
            <>
              <NavIcon to={currentUser ? `/profile/${currentUser.username}` : '/login'} icon={<FaUser size={20} />} label="Profile" />
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-700">Login</Link>
              <Link
                to="/register"
                className="bg-black-600 hover:bg-black-700 text-white px-3 py-1 rounded-md"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
