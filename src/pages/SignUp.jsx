import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
// react toastify
import { toast } from "react-toastify";
// icons
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("user created successfully");
      navigate("/sign-in");
    } catch (err) {
      toast.error("Oops! Something went wrong 🥲");
    }
  };

  return (
    <div className="container text-gray-800 mx-auto">
      <div className="flex flex-col justify-center items-center py-12">
        <h2 className="text-3xl font-medium">Create an account</h2>
        <p className="text-sm mt-1 font-medium ">
          Already have an account ?{" "}
          <Link to="/sign-in">
            <span className="underline underline-offset-1">Log in</span>
          </Link>
        </p>
      </div>
      <form className="max-w-xl mx-auto px-3" onSubmit={handleSubmit}>
        {/* Input for name */}
        <label
          htmlFor="name"
          className="after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          What should we call you?
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
          placeholder="Enter your profile name"
          className="border-2 mt-1 w-full p-3 indent-2 rounded-lg focus:outline-none mb-3"
        />

        {/* Input for email */}
        <label
          htmlFor="email"
          className="after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          What's your email?
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email address"
          className="border-2 mt-1 w-full p-3 indent-2 rounded-lg focus:outline-none mb-3"
        />

        {/* Input for password */}
        <div className="flex justify-between items-center">
          <label
            htmlFor="password"
            className="after:content-['*'] after:ml-0.5 after:text-red-500"
          >
            Create a strong password
          </label>
          <div
            className="flex items-center"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <MdVisibilityOff className="text-gray-500" />
            ) : (
              <MdVisibility className="text-gray-500" />
            )}
            <span className="text-xs ml-1 text-gray-500">
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
        </div>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="border-2 mt-1 w-full p-3 indent-2 rounded-lg focus:outline-none"
        />
        <p className="text-xs text-gray-500 mb-5 mt-1 ml-2">
          Use 6 or more characters with a mix of letters, numbers & symbols
        </p>
        <button className="bg-slate-100 w-full text-center p-3 rounded-full">
          Create an account
        </button>
      </form>
    </div>
  );
};

export default SignUp;
