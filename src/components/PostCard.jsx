import React, { useContext, useState } from 'react';
import { AuthContext } from '../App';
import { Link } from 'react-router-dom';

const PostCard = ({ post, onToggleLike, onAddComment, onDeletePost, onAddToCart }) => {
  const { currentUser } = useContext(AuthContext);
  const [commentText, setCommentText] = useState('');
  const isLiked = currentUser ? (post.likes || []).includes(currentUser.id) : false;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, {
      id: Date.now(),
      author: currentUser ? currentUser.username : 'Guest',
      content: commentText.trim(),
      timestamp: new Date().toISOString(),
    });
    setCommentText('');
  };

  const handleCartClick = () => {
    if (!post.price) return;
    if (typeof onAddToCart === 'function') {
      onAddToCart(post);
    } else {
      // fallback to localStorage if parent didn't provide handler
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      if (!cart.find((c) => c.id === post.id)) {
        localStorage.setItem('cart', JSON.stringify([...cart, post]));
        // notify other components (Navbar) that cart changed
        try { window.dispatchEvent(new Event('storage')); } catch (e) {}
      }
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md mx-auto my-6 max-w-md w-full">
      {/* Top bar with author & cart */}
      <div className="px-4 py-3 flex items-center justify-between relative">
        <div className="flex items-center space-x-3">
          <Link to={`/profile/${post.authorUsername}`} className="font-semibold text-sm text-gray-800">{post.authorUsername}</Link>
        </div>
        {post.price && (
          <button 
            onClick={handleCartClick} 
            className="absolute top-3 right-3 bg-white-400 hover:bg-gray-500 text-white px-2 py-1 rounded-md text-xs font-semibold"
          >
            🛒
          </button>
        )}
      </div>

      {/* Image */}
      <div className="w-full bg-gray-100 flex items-center justify-center">
        {post.image ? (
          <img src={post.image} alt="post" className="w-full object-cover max-h-[520px]" />
        ) : (
          <div className="p-12 text-gray-400">No image</div>
        )}
      </div>

      {/* Date below image */}
      <div className="px-4 py-2 text-xs text-gray-500">{new Date(post.timestamp).toLocaleString()}</div>

      {/* Caption, likes, comments */}
      <div className="px-4 py-3">
        <p className="text-sm text-gray-800 mb-2">
          <span className="font-semibold mr-2">{post.authorUsername}</span>{post.caption}
        </p>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onToggleLike(post.id)}
              disabled={!currentUser}
              className={`flex items-center space-x-2 ${currentUser ? '' : 'opacity-60 cursor-not-allowed'}`}
              title={!currentUser ? 'Login to like' : isLiked ? 'Unlike' : 'Like'}
            >
              <svg className={`w-6 h-6 ${isLiked ? 'text-red-500' : 'text-gray-700'}`} viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
                <path d="M12 21s-7-4.35-9-7.09A5.2 5.2 0 0 1 3 9.5 5.5 5.5 0 0 1 8.7 4.5 6.09 6.09 0 0 1 12 6.2 6.09 6.09 0 0 1 15.3 4.5 5.5 5.5 0 0 1 21 9.5c0 2.3-1.64 4.86-9 11.5z" />
              </svg>
              <span className="text-sm">{(post.likes || []).length}</span>
            </button>

            <button className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span className="text-sm">{(post.comments || []).length}</span>
            </button>
          </div>

          {currentUser && currentUser.username === post.authorUsername && (
            <button onClick={() => onDeletePost(post.id)} className="text-sm text-red-600">Delete</button>
          )}
        </div>

        {/* Comments */}
        {post.comments && post.comments.length > 0 && (
          <div className="mt-3 max-h-40 overflow-auto space-y-2">
            {post.comments.slice().reverse().map(c => (
              <div key={c.id} className="text-sm">
                <span className="font-semibold">{c.author}</span> <span className="text-gray-700">{c.content}</span>
              </div>
            ))}
          </div>
        )}

        {/* Add comment */}
        <div className="mt-3">
          {currentUser ? (
            <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2">
              <input
                className="flex-1 px-3 py-2 border rounded text-sm focus:outline-none"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit" className="text-sm font-semibold text-blue-600">Post</button>
            </form>
          ) : (
            <div className="text-sm text-gray-500">Login to like/comment</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;