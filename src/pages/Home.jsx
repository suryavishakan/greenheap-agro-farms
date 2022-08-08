import React from "react";
// components
import Navbar from "../components/Navbar";
import Main from "../components/Main";

const Home = () => {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <Main />
    </div>
  );
};

export default Home;
