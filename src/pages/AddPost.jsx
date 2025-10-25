import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';

const AddPost = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!currentUser) navigate('/login');
  }, [currentUser, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !image) {
      setMessage('Please fill in the title and upload an image.');
      return;
    }

    const existingPosts = JSON.parse(localStorage.getItem('gebeya_posts') || '[]');
    const newPost = {
      id: Date.now(),
      title,
      image,
      price: price ? parseFloat(price) : null,
      authorUsername: currentUser.username,
      timestamp: Date.now(),
      likes: [],
      comments: [],
    };

    localStorage.setItem('gebeya_posts', JSON.stringify([newPost, ...existingPosts]));
    setMessage('✅ Post added successfully!');
    setTitle('');
    setImage(null);
    setPrice('');

    // Redirect to home after short delay
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Create New Post</h2>

        {message && (
          <p className="text-center text-green-600 font-medium mb-3">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter product or post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-gray-500 hover:border-gray-600 transition-all">
              {image ? (
                <img
                  src={image}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg mb-2"
                />
              ) : (
                <>
                  <FaCamera className="text-3xl mb-2" />
                  <p className="text-sm">Click below to select image</p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 text-sm cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (optional)</label>
            <input
              type="number"
              placeholder="Enter price if applicable..."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-black text-white font-medium py-2 rounded-md transition-all"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
