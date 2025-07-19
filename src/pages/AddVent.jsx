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
    <div className="container mx-auto p-6 max-w-lg">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Add a New Vent</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        {message && (
          <div className={`mb-4 p-3 rounded-lg text-center ${message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        <div className="mb-6">
          <label htmlFor="title" className="block text-gray-700 text-lg font-medium mb-2">Vent Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            placeholder="A short summary of your vent"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 text-lg font-medium mb-2">Your Vent</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg resize-y"
            placeholder="Pour out your feelings here..."
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 text-xl block mx-auto"
        >
          Submit Vent
        </button>
      </form>
    </div>
  );
};

export default AddVent;