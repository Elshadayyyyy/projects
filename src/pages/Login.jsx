import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const Login = () => {
  const { login, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage('Please fill in all fields.');
      return;
    }
    if (login(username, password)) {
      setMessage('Login successful!');
      setUsername('');
      setPassword('');
      navigate('/');
    } else {
      setMessage('Invalid username or password.');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        {message && (
          <div className={`mb-4 p-3 rounded-lg text-center ${message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        <div className="mb-6">
          <label htmlFor="login-username" className="block text-gray-700 text-lg font-medium mb-2">Username</label>
          <input
            type="text"
            id="login-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="login-password" className="block text-gray-700 text-lg font-medium mb-2">Password</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 text-xl block mx-auto"
        >
          Login
        </button>
        <p className="mt-6 text-center text-gray-600 text-lg">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:underline font-semibold">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;