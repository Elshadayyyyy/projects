import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const AddVent = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      setMessage('Please fill in all fields.');
      return;
    }

    const existingVents = JSON.parse(localStorage.getItem('vents') || '[]');
    const newVent = {
      id: Date.now(),
      title,
      content,
      author: "Anonymous", 
      actualAuthor: currentUser ? currentUser.username : "Guest",
      upvotes: 0,
      downvotes: 0,
      replies: [],
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('vents', JSON.stringify([...existingVents, newVent]));
    setMessage('Vent added successfully!');
    setTitle('');
    setContent('');
    navigate('/');
  };

  return (
    <div className="container">
      <h2 className="text-center" style={{ fontSize: '36px', fontWeight: '800', color: '#333', marginBottom: '40px' }}>Add a New Vent</h2>
      <form onSubmit={handleSubmit} className="form-card">
        {message && (
          <div className={`message-box ${message.includes('successful') ? 'message-success' : 'message-error'}`}>
            {message}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="title" className="form-label">Vent Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="A short summary of your vent"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content" className="form-label">Your Vent</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            className="form-textarea"
            placeholder="Pour out your feelings here..."
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%' }}
        >
          Submit Vent
        </button>
      </form>
    </div>
  );
};

export default AddVent;