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
    <div className="container">
      <h2 className="text-center" style={{ fontSize: '36px', fontWeight: '800', color: '#333', marginBottom: '40px' }}>Login</h2>
      <form onSubmit={handleSubmit} className="form-card">
        {message && (
          <div className={`message-box ${message.includes('successful') ? 'message-success' : 'message-error'}`}>
            {message}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="login-username" className="form-label">Username</label>
          <input
            type="text"
            id="login-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password" className="form-label">Password</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%' }} 
        >
          Login
        </button>
        <p className="text-center" style={{ marginTop: '25px', color: '#666', fontSize: '18px' }}>
          Don't have an account? <Link to="/register" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;