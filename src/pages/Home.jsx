import React, { useState, useEffect, useContext } from "react";
import PostCard from "../components/PostCard";
import { AuthContext } from "../App";
import { Link } from 'react-router-dom';
import { mockPosts } from "../data/mockPosts";
import { mockSuppliers } from "../data/mockSuppliers";

export default function Home() {
  const { currentUser } = useContext(AuthContext);

  // Posts (persisted under 'gebeya_posts' to match other pages)
  const [posts, setPosts] = useState(() => {
    const storedRaw = localStorage.getItem('gebeya_posts') || localStorage.getItem('posts');
    if (storedRaw) {
      try {
        const parsed = JSON.parse(storedRaw);
        // If parsed posts are empty, seed with mockPosts so demo content is visible
        if (!Array.isArray(parsed) || parsed.length === 0) {
          localStorage.setItem('gebeya_posts', JSON.stringify(mockPosts));
          return mockPosts;
        }

        const corrected = parsed.map((p) => {
          if (!p.image) {
            const mp = mockPosts.find((m) => m.id === p.id);
            return mp ? { ...p, image: mp.image } : p;
          }
          return p;
        });
        // ensure it's stored under gebeya_posts for consistency
        localStorage.setItem('gebeya_posts', JSON.stringify(corrected));
        return corrected;
      } catch (e) {
        localStorage.setItem('gebeya_posts', JSON.stringify(mockPosts));
        return mockPosts;
      }
    }

    localStorage.setItem('gebeya_posts', JSON.stringify(mockPosts));
    return mockPosts;
  });

  useEffect(() => {
    localStorage.setItem('gebeya_posts', JSON.stringify(posts));
  }, [posts]);

  // Cart
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleToggleLike = (postId) => {
    if (!currentUser) return;
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        const likes = Array.isArray(post.likes) ? post.likes : [];
        if (post.id === postId) {
          if (likes.includes(currentUser.id)) {
            return { ...post, likes: likes.filter((id) => id !== currentUser.id) };
          } else {
            return { ...post, likes: [...likes, currentUser.id] };
          }
        }
        return post;
      })
    );
  };

  const handleAddComment = (postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        const comments = Array.isArray(post.comments) ? post.comments : [];
        if (post.id === postId) return { ...post, comments: [...comments, comment] };
        return post;
      })
    );
  };

  const handleDeletePost = (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleAddToCart = (post) => {
    setCart((prev) => {
      if (!prev.find((item) => item.id === post.id)) {
        return [...prev, post];
      }
      return prev;
    });
    alert(`${post.caption} added to cart!`);
  };

  return (
    <div className="flex justify-center bg-gray-50 min-h-screen px-4 py-6">
      {/* Left Sidebar: Suggested Suppliers */}
      <div className="hidden lg:flex flex-col w-64 space-y-6 mr-6">
          <div className="bg-white shadow-sm rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Suggested Suppliers</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              {mockSuppliers.map((s) => (
                <li key={s.username} className="flex items-center justify-between">
                  <Link to={`/profile/${encodeURIComponent(s.username)}`} className="hover:underline text-gray-800">
                    {s.username}
                  </Link>
                  {s.verified && (
                    <span title="Verified supplier" className="text-gray-500 ml-2">✔</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
      </div>

      {/* Post Feed */}
      <div className="w-full max-w-xl space-y-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onToggleLike={handleToggleLike}
            onAddComment={handleAddComment}
            onDeletePost={handleDeletePost}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Right Sidebar: Verify as Supplier */}
      <div className="hidden lg:flex flex-col w-64 space-y-6 ml-6">
          <div className="bg-white shadow-sm rounded-lg p-4 text-center">
          <h3 className="font-semibold text-gray-900 mb-2">Verify as Supplier</h3>
          <p className="text-gray-600 text-sm mb-3">
            Upgrade your account to start selling products on Gebeya Tok.
          </p>
          <Link to="/verify" className="bg-gray-900 text-white px-4 py-2 rounded inline-block text-center">
            Verify Now
          </Link>
        </div>
      </div>
    </div>
  );
}
