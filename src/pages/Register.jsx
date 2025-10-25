import React, { useContext, useState } from 'react';
import { AuthContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useContext(AuthContext);
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
    const ok = register(username, password);
    if (ok) {
      setMsg('Registered! You can login now.');
      navigate('/login');
    } else {
      setMsg('Username exists, choose another.');
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

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
          <button className="bg-black-600 text-white px-4 py-2 rounded">Register</button>
        </div>

        <p className="mt-4 text-sm text-gray-600">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
