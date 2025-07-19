import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';

const VentCard = ({ vent, onUpvote, onDownvote, onAddReply, onDeleteVent }) => {
  const { currentUser } = useContext(AuthContext);
  const [showReplySection, setShowReplySection] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleReplySubmit = (e) => {
    e.preventDefault(); 
    if (!replyContent.trim()) return;

    onAddReply(vent.id, replyContent);
    setReplyContent(''); 
  };

  const isOriginalPoster = currentUser && vent.actualAuthor && currentUser.username === vent.actualAuthor;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{vent.title}</h3>
        <p className="text-gray-600 mb-4 text-justify">{vent.content}</p>
        <p className="text-sm text-gray-500 font-medium">Posted by: {vent.author}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onUpvote(vent.id)}
            disabled={!currentUser}
            className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
              currentUser ? 'bg-blue-100 hover:bg-blue-200 text-blue-700' : 'bg-gray-100 text-gray-500 cursor-not-allowed'
            } transition-all duration-300 transform hover:scale-105`}
            title={!currentUser ? "Login to upvote" : "Upvote this vent"}
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">{vent.upvotes}</span>
          </button>
          <button
            onClick={() => onDownvote(vent.id)}
            disabled={!currentUser}
            className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
              currentUser ? 'bg-red-100 hover:bg-red-200 text-red-700' : 'bg-gray-100 text-gray-500 cursor-not-allowed'
            } transition-all duration-300 transform hover:scale-105`}
            title={!currentUser ? "Login to downvote" : "Downvote this vent"}
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">{vent.downvotes}</span>
          </button>
        </div>
        <span className="text-sm text-gray-500">Score: {vent.upvotes - vent.downvotes}</span>
      </div>

      {isOriginalPoster && (
        <div className="text-right mt-4">
          <button
            onClick={() => onDeleteVent(vent.id)}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 text-sm"
            title="Delete this vent"
          >
            Delete Vent
          </button>
        </div>
      )}


      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={() => setShowReplySection(!showReplySection)}
          className={`text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center space-x-2 transition-colors duration-300 ${!currentUser ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!currentUser}
          title={!currentUser ? "Login to view/add replies" : "Toggle reply section"}
        >
          {showReplySection ? (
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          ) : (
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          )}
          {vent.replies && vent.replies.length > 0 ? `View/Add Replies (${vent.replies.length})` : 'Add Reply'}
        </button>

        {showReplySection && (
          <div className="mt-4">
            {vent.replies && vent.replies.length > 0 && (
              <ul className="space-y-3">
                {vent.replies.map((reply) => (
                  <li key={reply.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p className="text-gray-700 text-sm mb-1">{reply.content}</p>
                    <p className="text-gray-500 text-xs italic">— {reply.author}</p>
                  </li>
                ))}
              </ul>
            )}

            {currentUser && (
              <form onSubmit={handleReplySubmit} className="mt-4 pt-4 border-t border-gray-100">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Add your anonymous reply..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-y"
                  rows="3"
                  required
                ></textarea>
                <button type="submit" className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 text-sm mt-2">
                  Post Reply
                </button>
              </form>
            )}
            {!currentUser && (
              <p className="text-center text-gray-500 text-xs mt-2">Login to post a reply.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VentCard;