import React, { useState, useEffect } from "react";
// react router
import { useNavigate, Outlet } from "react-router-dom";
// firebase
import { getAuth } from "firebase/auth";
// components
import Clients from "../components/Clients";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(auth.currentUser);
  }, [auth.currentUser]);

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div className="container mx-auto h-screen">
      <header className="flex justify-between items-center py-2 font-medium">
        {user ? <h1>Hello {user.displayName}</h1> : "Not logged in"}
        <button
          onClick={handleLogout}
          className="py-1 text-sm px-4 bg-slate-100 rounded-lg font-medium"
        >
          Logout
        </button>
      </header>
      <Clients />
      <Outlet />
    </div>
  );
};

export default Dashboard;
