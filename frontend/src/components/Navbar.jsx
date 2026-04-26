import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="border-b border-[#2a2a2a] bg-[#161616] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-xl font-bold flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-[#00D9A6]/20 text-[#00D9A6] flex items-center justify-center">E</span>
              <span>Expense<span className="text-[#00D9A6]">Tracker</span></span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-[#888888] hidden sm:block">Welcome, <span className="text-[#f0f0f0] font-medium">{user.name}</span></span>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors text-sm font-medium"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
