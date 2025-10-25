import React, { useContext, useState } from 'react';
import { AuthContext } from '../App';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMsg('Fill in both fields.');
      return;
    }
    if (login(username, password)) {
      setMsg('Welcome!');
      navigate('/');
    } else {
      setMsg('Invalid credentials.');
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 border rounded shadow">
        {msg && <div className="mb-3 text-sm text-red-600">{msg}</div>}

        <label className="block mb-3">
          <span className="text-sm">Username</span>
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 block w-full px-3 py-2 border rounded" />
        </label>

        <label className="block mb-3">
          <span className="text-sm">Password</span>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-1 block w-full px-3 py-2 border rounded" />
        </label>

        <div className="text-right">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        </div>

        <p className="mt-4 text-sm text-gray-600">Don't have an account? <Link to="/register" className="text-blue-600">Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
