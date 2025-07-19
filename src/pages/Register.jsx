import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const Register = () => {
  const { register, currentUser } = useContext(AuthContext);
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
    if (register(username, password)) {
      setMessage('Registration successful! You can now log in.');
      setUsername('');
      setPassword('');
      navigate('/login');
    } else {
      setMessage('Username already exists. Please choose a different one.');
    }
  };

  return (
    <div className="container">
      <h2 className="text-center" style={{ fontSize: '36px', fontWeight: '800', color: '#333', marginBottom: '40px' }}>Register</h2>
      <form onSubmit={handleSubmit} className="form-card">
        {message && (
          <div className={`message-box ${message.includes('successful') ? 'message-success' : 'message-error'}`}>
            {message}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="reg-username" className="form-label">Username</label>
          <input
            type="text"
            id="reg-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reg-password" className="form-label">Password</label>
          <input
            type="password"
            id="reg-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-success"
          style={{ width: '100%' }} 
        >
          Register
        </button>
        <p className="text-center" style={{ marginTop: '25px', color: '#666', fontSize: '18px' }}>
          Already have an account? <Link to="/login" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;