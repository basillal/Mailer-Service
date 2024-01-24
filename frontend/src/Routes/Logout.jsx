import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session data
    sessionStorage.removeItem("loged_in");
    
    // Redirect to the login page
    navigate("/login");
  };

  useEffect(() => {
    // Assuming you want to logout when the component mounts
    handleLogout();
  }, []);

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-red-600 hover:underline cursor-pointer"
    >
      Logout
    </button>
  );
};

export default Logout;