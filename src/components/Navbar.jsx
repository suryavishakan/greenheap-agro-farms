import React from "react";
import { Link } from "react-router-dom";
// images
import logo from "../assets/logo.svg";

const navItems = [
  { id: 1, name: "Login", link: "/sign-in" },
  { id: 2, name: "Sign Up", link: "/sign-up" },
];

const Navbar = () => {
  return (
    <header>
      <div className="container mx-auto">
        <nav className="flex items-center justify-between font-medium mx-5 py-6 text-black">
          <img
            src={logo}
            alt="logo"
            width="64px"
            height="48px"
            className="w-20 h-16"
          />
          <div className="flex justify-center">
            {navItems.map((navItem) => (
              <div key={navItem.id}>
                <Link to={navItem.link}>
                  <span className="px-5 py-2 font-medium" href={navItem.link}>
                    {navItem.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
