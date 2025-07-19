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

  
  console.log(`Vent ID: ${vent.id}`);
  console.log(`Current User:`, currentUser ? currentUser.username : 'Not logged in');
  console.log(`Vent Actual Author: ${vent.actualAuthor}`);//imma use this to add a delete button
  console.log(`Is Original Poster: ${isOriginalPoster}`);


  return (
    <div className="vent-card">
      <div>
        <h3 className="vent-title">{vent.title}</h3>
        <p className="vent-content">{vent.content}</p>
        <p className="vent-author">Posted by: {vent.author}</p>
      </div>
      <div className="vent-actions">
        <div className="vote-buttons">
          <button
            onClick={() => onUpvote(vent.id)}
            disabled={!currentUser}
            className={`vote-btn vote-btn-up ${!currentUser ? 'vote-btn-disabled' : ''}`}
            title={!currentUser ? "Login to upvote" : "Upvote this vent"}
          >

            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            <span>{vent.upvotes}</span>
          </button>
          <button
            onClick={() => onDownvote(vent.id)}
            disabled={!currentUser}
            className={`vote-btn vote-btn-down ${!currentUser ? 'vote-btn-disabled' : ''}`}
            title={!currentUser ? "Login to downvote" : "Downvote this vent"}
          >
           
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <span>{vent.downvotes}</span>
          </button>
        </div>
        <span className="vent-score">Score: {vent.upvotes - vent.downvotes}</span>
      </div>

      
      {isOriginalPoster && (
        <div style={{ textAlign: 'right', marginTop: '15px' }}>
          <button
            onClick={() => onDeleteVent(vent.id)}
            className="delete-btn"
            title="Delete this vent"
          >
            Delete Vent
          </button>
        </div>
      )}

    
      <div className="replies-section">
        <button
          onClick={() => setShowReplySection(!showReplySection)}
          className={`replies-toggle-btn ${!currentUser ? 'btn-disabled' : ''}`}
          disabled={!currentUser}
          title={!currentUser ? "Login to view/add replies" : "Toggle reply section"}
        >
          {showReplySection ? (
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          ) : (
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          )}
          {vent.replies && vent.replies.length > 0 ? `View/Add Replies (${vent.replies.length})` : 'Add Reply'}
        </button>

        {showReplySection && (
          <>
           
            {vent.replies && vent.replies.length > 0 && (
              <ul className="reply-list">
                {vent.replies.map((reply) => (
                  <li key={reply.id} className="reply-item">
                    <p className="reply-content">{reply.content}</p>
                    <p className="reply-author">— {reply.author}</p>
                  </li>
                ))}
              </ul>
            )}

            
            {currentUser && (
              <form onSubmit={handleReplySubmit} className="reply-form">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Add your anonymous reply..."
                  className="reply-textarea"
                  rows="3"
                  required
                ></textarea>
                <button type="submit" className="btn btn-secondary">
                  Post Reply
                </button>
              </form>
            )}
            {!currentUser && (
              <p style={{textAlign: 'center', color: '#888', fontSize: '14px', marginTop: '10px'}}>Login to post a reply.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VentCard;