import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {assets} from "../assets/assets"
import { AuthStore } from '../Store/authStore';

export default function AdminNavbar() {
  
  const navigate = useNavigate();
 const { authUser, logout } = AuthStore();
  
  const [showDropdown, setShowDropdown] = useState(false);

  // Handle logout
  const handleLogout = () => {
    logout(navigate);
  };

  // Navigate to dashboard
  const goToDashboard = () => {
    navigate('/admin/dashboard');
  };

  // Get first letter for avatar
  const getInitial = () => {
    if (authUser?.name) {
      return authUser.name.charAt(0).toUpperCase();
    }
    if (authUser?.email) {
      return authUser.email.charAt(0).toUpperCase();
    }
    return 'A';
  };

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Logo/Branding */}
          <div className="flex items-center">
            <button
              onClick={goToDashboard}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
              aria-label="Go to admin dashboard"
            >
              <img 
                src={assets.logo} 
                alt="Gefen Institute Logo" 
                className="h-8 w-auto"
              />
              <span className="hidden sm:block text-lg font-semibold text-gray-900">
                Gefen Institute Admin
              </span>
            </button>
          </div>

          {/* Right Side - Admin Info & Logout */}
          <div className="flex items-center gap-4">
            {/* Admin Info */}
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold text-gray-900">
                {authUser?.name || 'Admin'}
              </p>
              <p className="text-xs text-gray-500">
                {authUser?.email}
              </p>
            </div>

            {/* Avatar & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded-full"
                aria-label="Admin menu"
                aria-expanded={showDropdown}
              >
                {/* Avatar Circle */}
                <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  {getInitial()}
                </div>
                
                {/* Dropdown Arrow */}
                <svg 
                  className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    {/* Mobile - Show admin info in dropdown */}
                    <div className="md:hidden px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">
                        {authUser?.name || 'Admin'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {authUser?.email}
                      </p>
                    </div>

                    {/* Dashboard Link */}
                    <button
                      onClick={() => {
                        goToDashboard();
                        setShowDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center gap-2"
                    >
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Dashboard
                    </button>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 flex items-center gap-2"
                      aria-label="Logout from admin panel"
                    >
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>

                  {/* Click outside to close dropdown */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowDropdown(false)}
                    aria-hidden="true"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}