import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({ text: "", isError: false });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData.name || !userData.email || !userData.password) {
      setMessage({ text: "Please fill in all fields.", isError: true });
      return;
    }

    try {
      const response = await axios.post(
         "http://localhost:5000/api/user/register",
        // "https://buyboddy-backend.onrender.com/api/user/register",
        
        userData
      );
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      setMessage({ text: "Signup successful!", isError: false });
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error during signup. Please try again.";
      setMessage({ text: errorMessage, isError: true });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-black p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-4xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        {message.text && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`text-center mb-4 ${
              message.isError ? "text-red-400" : "text-green-400"
            }`}
          >
            {message.text}{" "}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          <div>
            <label className="block text-white mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-white shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-white shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Signup
          </motion.button>
        </form>

        <div className="text-center mt-4">
          <span className="text-white">Already have an account? </span>
          <Link
            to="/login"
            className="text-yellow-300 hover:underline hover:text-yellow-400"
          >
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
