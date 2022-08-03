import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email sent 🤝");
    } catch (err) {
      toast.error("Could not send email 😥");
    }
  };
  return (
    <div className="container text-gray-800 mx-auto">
      <div className="flex flex-col justify-center items-center py-12">
        <h2 className="text-3xl font-medium">Reset Password</h2>
        <p className="text-sm mt-1 font-medium ">
          Already have an account ?{" "}
          <Link to="/sign-in">
            <span className="underline underline-offset-1">Sign in</span>
          </Link>
        </p>
      </div>
      <form className="max-w-xl mx-auto px-3" onSubmit={handleSubmit}>
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

        <button className="bg-slate-100 w-full text-center p-3 rounded-full">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
