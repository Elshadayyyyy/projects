import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../App';
import PostCard from '../components/PostCard';
import { mockPosts } from '../data/mockPosts';

const Profile = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState(() => JSON.parse(localStorage.getItem('gebeya_posts') || '[]'));
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const { currentUser: authCurrentUser } = useContext(AuthContext);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('gebeya_users') || '[]');
    const found = users.find(u => u.username === username);
    // Prefer currentUser from context when viewing your own profile so updates appear immediately
    if (!found && authCurrentUser && authCurrentUser.username === username) {
      setUser(authCurrentUser);
    } else {
      setUser(found || { username });
    }

    const allPostsRaw = JSON.parse(localStorage.getItem('gebeya_posts') || '[]');
    const allPosts = (allPostsRaw || []).map(p => {
      const mp = mockPosts.find(m => m.id === p.id);
      return mp ? { ...p, image: mp.image } : p;
    });
    setPosts(allPosts);
    setUserPosts(allPosts.filter(p => p.authorUsername === username).sort((a,b)=> b.timestamp - a.timestamp));
  }, [username, authCurrentUser]);

  const toggleLike = (postId) => {
    const currentUser = JSON.parse(localStorage.getItem('gebeya_currentUser') || 'null');
    if (!currentUser) return;
    const allPosts = JSON.parse(localStorage.getItem('gebeya_posts') || '[]');
    const next = allPosts.map(p => {
      if (p.id !== postId) return p;
      const likes = p.likes || [];
      if (likes.includes(currentUser.id)) {
        return { ...p, likes: likes.filter(id => id !== currentUser.id) };
      } else {
        return { ...p, likes: [...likes, currentUser.id] };
      }
    });
    localStorage.setItem('gebeya_posts', JSON.stringify(next));
    setPosts(next);
    setUserPosts(next.filter(p => p.authorUsername === username));
  };

  const addComment = (postId, comment) => {
    const allPosts = JSON.parse(localStorage.getItem('gebeya_posts') || '[]');
    const next = allPosts.map(p => p.id === postId ? { ...p, comments: [...(p.comments || []), comment] } : p);
    localStorage.setItem('gebeya_posts', JSON.stringify(next));
    setPosts(next);
    setUserPosts(next.filter(p => p.authorUsername === username));
  };

  const deletePost = (postId) => {
    if (!window.confirm('Delete this post?')) return;
    const allPosts = JSON.parse(localStorage.getItem('gebeya_posts') || '[]');
    const next = allPosts.filter(p => p.id !== postId);
    localStorage.setItem('gebeya_posts', JSON.stringify(next));
    setPosts(next);
    setUserPosts(next.filter(p => p.authorUsername === username));
  };

  const handleAddToCart = (post) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!cart.find(c => c.id === post.id)) {
      const next = [...cart, post];
      localStorage.setItem('cart', JSON.stringify(next));
      try { window.dispatchEvent(new Event('storage')); } catch (e) {}
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <div className="flex items-center space-x-6">
          <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-white">
            {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
          </div>

          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-semibold">{user?.username}</h1>
              {user?.verified && <span className="text-gray-500">✔</span>}
            </div>

            <div className="flex items-center space-x-6 mt-3">
              <div><span className="font-semibold">{userPosts.length}</span> posts</div>
              <div><span className="font-semibold">0</span> followers</div>
              <div><span className="font-semibold">0</span> following</div>
            </div>

            <div className="mt-3 text-sm text-gray-700">
              {user?.businessDescription && <div>{user.businessDescription}</div>}
              {user?.phone && <div className="mt-1 text-sm text-gray-600">{user.phone}</div>}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Link to="/" className="text-gray-700">Back to feed</Link>
        </div>
      </div>

      {/* Grid of thumbnails (Instagram-like) */}
      <div>
        {userPosts.length === 0 ? (
          <p className="text-center text-gray-600">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {userPosts.map(p => (
              <button key={p.id} onClick={() => setSelectedPost(p)} className="block">
                {p.image ? (
                  <img src={p.image} alt={p.caption} className="w-full h-32 object-cover" />
                ) : (
                  <div className="w-full h-32 bg-gray-100 flex items-center justify-center">No image</div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal for selected post */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl w-full rounded p-4">
            <div className="flex justify-end">
              <button onClick={() => setSelectedPost(null)} className="text-gray-600">Close</button>
            </div>
            <PostCard
              post={selectedPost}
              onToggleLike={toggleLike}
              onAddComment={addComment}
              onDeletePost={deletePost}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
