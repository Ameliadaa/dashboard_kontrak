
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaBell, FaUser, FaSearch, FaBars } from 'react-icons/fa';

interface NavbarTopProps {
  toggleSidebar: () => void;
}

const NavbarTop: React.FC<NavbarTopProps> = ({ toggleSidebar }) => {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);

  const handleProfileToggle = () => setProfileOpen(!isProfileOpen);
  const handleNotificationsToggle = () => setNotificationsOpen(!isNotificationsOpen);

  return (
    <nav className="bg-blue-900 text-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
      
        <div className="flex items-center space-x-3">
          <button onClick={toggleSidebar} className="text-white">
            <FaBars size={20} />
          </button>
          <div className="hidden md:flex items-center bg-blue-700 rounded-md">
            <FaSearch className="ml-2 text-gray-300" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent py-1 px-2 text-white placeholder-gray-300 outline-none"
            />
          </div>
        </div>

       
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button onClick={handleNotificationsToggle} className="text-white">
              <FaBell size={20} />
            </button>
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-md shadow-lg overflow-hidden">
                <div className="p-4 border-b">Notifications</div>
                <div className="p-4 text-sm">
                  <p>No new notifications</p>
                </div>
                <div className="p-2 text-center border-t text-blue-600 hover:underline">
                  <Link href="/notifications">View all notifications</Link>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={handleProfileToggle} className="flex items-center text-white">
              <FaUser size={20} />
              <span className="ml-2 hidden md:block">John Doe</span>
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden">
                <div className="p-4 border-b">
                  <h5 className="font-semibold">John Doe</h5>
                  <p className="text-sm text-gray-600">View Profile</p>
                </div>
                <div className="p-4 space-y-2">
                  <button className="w-full text-left text-gray-700 hover:bg-gray-100 p-2 rounded">Edit Profile</button>
                  <button className="w-full text-left text-gray-700 hover:bg-gray-100 p-2 rounded">Settings</button>
                  <button className="w-full text-left text-gray-700 hover:bg-gray-100 p-2 rounded">Sign Out</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarTop;
