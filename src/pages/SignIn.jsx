import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// react toastify
import { toast } from "react-toastify";
// icons
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error("Invalid User Credentials 😥");
    }
  };

  return (
    <div className="container text-gray-800 mx-auto">
      <div className="flex flex-col justify-center items-center py-12">
        <h2 className="text-3xl font-medium">Welcome back!</h2>
        <p className="text-sm mt-1 font-medium ">
          Don't have an account ?{" "}
          <Link to="/sign-up">
            <span className="underline underline-offset-1">Sign up</span>
          </Link>
        </p>
      </div>
      <form className="max-w-xl mx-auto px-3" onSubmit={handleSubmit}>
        {/* Input for email */}
        <label
          htmlFor="email"
          className="after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Enter your email?
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
            Enter your password
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
        <Link to="/forgot-password">
          <span className="text-xs font-medium underline underline-offset-1 text-gray-500 mb-5 mt-1 float-right">
            Forgot your password?
          </span>
        </Link>

        <button className="bg-slate-100 w-full text-center p-3 rounded-full">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
