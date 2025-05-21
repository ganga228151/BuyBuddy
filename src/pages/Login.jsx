import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
         "http://localhost:5000/api/user/login",
        // "https://buyboddy-backend.onrender.com/api/user/login",
        { email, password }
      );
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      alert("Login successful! you are rediected to the home page");
      setMessage("Login successful!");
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
      <div className="relative bg-black text-white backdrop-blur-lg p-8 rounded-xl shadow-2xl w-96 space-y-6">
        <h2 className="text-4xl font-bold text-white text-center">Welcome Back</h2>

        {message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`text-center text-white font-semibold ${
              message === "Login successful!" ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </motion.p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl   shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition border border-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl  shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition border border-white"
        />

        <motion.button
          onClick={handleLogin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full p-3 bg-purple-600 border border-white text-white font-medium rounded-xl hover:bg-purple-700 transition shadow-lg"
        >
          Login
        </motion.button>

        <div className="text-center">
          <span className="text-white">Don't have an account? </span>
          <Link
            to="/sign-up"
            className="text-yellow-300 hover:text-yellow-400 hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
