import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-slate-800 shadow sticky top-0 z-10">
      <div className="max-w-full mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Warline News
        </Link>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-300 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className={`font-medium ${pathname === '/' ? 'text-blue-500' : 'text-gray-300'}`}>
            News
          </Link>
          <Link to="/alerts" className={`font-medium ${pathname === '/alerts' ? 'text-blue-500' : 'text-gray-300'}`}>
            Red Zone Areas
          </Link>
          <Link to="/helpline-numbers" className={`font-medium ${pathname === '/helpline-numbers' ? 'text-blue-500' : 'text-gray-300'}`}>
            Helpline Numbers
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-slate-800">
          <Link to="/" onClick={() => setIsOpen(false)} className={`block font-medium ${pathname === '/' ? 'text-blue-500' : 'text-gray-300'}`}>
            News
          </Link>
          <Link to="/alerts" onClick={() => setIsOpen(false)} className={`block font-medium ${pathname === '/alerts' ? 'text-blue-500' : 'text-gray-300'}`}>
            Red Zone Areas
          </Link>
          <Link to="/helpline-numbers" onClick={() => setIsOpen(false)} className={`block font-medium ${pathname === '/helpline-numbers' ? 'text-blue-500' : 'text-gray-300'}`}>
            Helpline Numbers
          </Link>
        </div>
      )}
    </nav>
  );
}
