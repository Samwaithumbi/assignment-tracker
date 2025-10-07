import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { data } = await axios.post(`${API}/user/register`, {
        userName,
        email,
        password,
        role,
      });
      console.log("API Base URL:", API);


      console.log("Registration Success:", data);
      setSuccess("Registration successful! You can now log in.");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">Create Account</h1>
      <p className="text-gray-600 mb-4">Enter your details to register</p>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        {/* Full Name */}
        <div className="flex flex-col">
          <label htmlFor="userName" className="font-medium mb-1">Full Name</label>
          <input
            id="userName"
            type="text"
            placeholder="Enter your name"
            required
            className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="font-medium mb-1">Email</label>
          <input
            id="email"
            type="email"
            placeholder="student@example.com"
            required
            className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password" className="font-medium mb-1">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Create a password"
            required
            className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Role */}
        <div className="flex flex-col">
          <label htmlFor="role" className="font-medium mb-1">Role</label>
          <select
            id="role"
            required
            className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`bg-blue-600 text-white py-2 rounded-lg transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-gray-600 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
      </p>
    </div>
  );
};

export default Register;
