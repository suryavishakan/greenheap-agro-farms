import React, { useState, useEffect } from "react";
// react router
import { useNavigate } from "react-router-dom";
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

  const time = new Date().getHours();
  var greeting = "";
  if (time >= 0 && time <= 12) {
    greeting = "Good Morning🌞";
  } else if (time > 12 && time <= 16) {
    greeting = "Good Afternoon☀️";
  } else {
    greeting = "Good Evening🌙";
  }

  return (
    <div className="h-screen">
      <header className=" font-medium shadow-md">
        <div className="px-10 container mx-auto flex justify-between items-center py-1">
          {user ? (
            <div>
              <h2 className="text-lg font-medium">Hello {user.displayName}!</h2>
              <p className="text-xs">{greeting}</p>
            </div>
          ) : (
            "Not logged in"
          )}
          <button
            onClick={handleLogout}
            className="py-1 text-sm px-4 bg-gray-200 font-medium"
          >
            Logout
          </button>
        </div>
      </header>
      <Clients />
    </div>
  );
};

export default Dashboard;
