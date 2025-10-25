import React from 'react';
import PostCard from './PostCard'; // your updated PostCard
import { suggestedSuppliers } from '../data/mockSuppliers'; // example data

const FeedLayout = ({ posts, onToggleLike, onAddComment, onDeletePost }) => {
  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main feed */}
        <div className="md:col-span-2 flex flex-col">
          {posts.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">No posts yet. Be the first!</p>
          ) : (
            posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onToggleLike={onToggleLike}
                onAddComment={onAddComment}
                onDeletePost={onDeletePost}
              />
            ))
          )}
        </div>

        {/* Sidebar: only visible on md+ screens */}
        <div className="hidden md:flex flex-col space-y-6">
          {/* Verify as Supplier */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Verify as Supplier</h3>
            <p className="text-sm text-gray-600 mb-4">
              Upgrade your account to start selling products on Gebeya Tok.
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300">
              Verify Now
            </button>
          </div>

          {/* Suggested Suppliers */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Suggested Suppliers</h3>
            <ul className="space-y-3">
              {suggestedSuppliers.map(s => (
                <li key={s.id} className="flex items-center space-x-3">
                  <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.category}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedLayout;
