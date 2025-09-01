import React, { useState } from "react";
// import { LogOut, KeyRound } from "lucide-react"; // icons

const Navbar = ({ userName }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Take first letter from props
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "?";

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="https://via.placeholder.com/40" // replace with your logo
          alt="Logo"
          className="h-10 w-10 rounded-full"
        />
        <span className="text-xl font-bold">MyShop</span>
      </div>

      {/* Right: Profile */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 transition"
        >
          {firstLetter}
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
            <div className="px-4 py-2 border-b text-sm font-medium text-gray-700">
              {userName}
            </div>
            <button
              className="w-full flex items-center px-4 py-2 hover:bg-gray-100"
              onClick={() => alert("Change Password Clicked")}
            >
              <KeyRound size={18} className="mr-2" /> Change Password
            </button>
            <button
              className="w-full flex items-center px-4 py-2 hover:bg-gray-100 text-red-600"
              onClick={() => alert("Logout Clicked")}
            >
              <LogOut size={18} className="mr-2" /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
