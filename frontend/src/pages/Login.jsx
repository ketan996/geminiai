import React, { useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    baseURL: "https://geminiai-1-wzve.onrender.com/user",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      // Assuming the token is in `response.data.token`
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/"); // Navigate to the home route
      } else {
        alert("Invalid login credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0E0E0E]">
      <div className="bg-[#0E0E0E] p-8 rounded-lg shadow-lg w-full max-w-md border border-white">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col">
          <label htmlFor="email" className="text-white mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="bg-[#0E0E0E] text-white p-3 rounded-md mb-4 border border-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <label htmlFor="password" className="text-white mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="bg-[#0E0E0E] text-white p-3 rounded-md mb-6 border border-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="bg-white text-[#0E0E0E] p-3 rounded-md font-semibold transition duration-300 hover:bg-[#E0E0E0]"
          >
            Login
          </button>
        </form>
        <p className="text-white mt-6 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-white hover:underline transition duration-300"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
