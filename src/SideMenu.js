import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SideMenu = ({ setIsLoggedIn, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4 flex flex-col justify-between">
      <ul>
        <li className="mb-4">
          <Link to="/dashboard/user" className="hover:text-gray-300">
            Users
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/organisation/admin" className="hover:text-gray-300">
            Organisation
          </Link>
        </li>
        {/* Add more links as needed */}
      </ul>
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 hover:bg-gray-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
