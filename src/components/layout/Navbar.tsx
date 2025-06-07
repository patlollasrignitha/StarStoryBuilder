import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookText, Pen, Save, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  return (
    <nav className="bg-indigo-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookText className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">STAR Story Builder</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink href="/" current={location.pathname === "/"}>
              <BookText className="h-5 w-5 mr-1" />
              <span>Home</span>
            </NavLink>
            <NavLink href="/builder" current={location.pathname === "/builder"}>
              <Pen className="h-5 w-5 mr-1" />
              <span>Builder</span>
            </NavLink>
            {user && (
              <NavLink href="/saved" current={location.pathname === "/saved"}>
                <Save className="h-5 w-5 mr-1" />
                <span>My Stories</span>
              </NavLink>
            )}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {user.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700 hover:text-white transition-colors"
              >
                <LogIn className="h-5 w-5 mr-1" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  current: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, current, children }) => {
  return (
    <Link
      to={href}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out
        ${current 
          ? 'bg-indigo-800 text-white' 
          : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'
        }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;