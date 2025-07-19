import React, { useState, useEffect } from 'react';
import VentCard from '../components/VentCard';


const Home = () => {
  const [vents, setVents] = useState(() => {
    const storedVents = localStorage.getItem('vents');
    return storedVents ? JSON.parse(storedVents) : [];
  });

  useEffect(() => {
    localStorage.setItem('vents', JSON.stringify(vents));
  }, [vents]);

  const handleUpvote = (id) => {
    setVents(prevVents =>
      prevVents.map(vent =>
        vent.id === id ? { ...vent, upvotes: vent.upvotes + 1 } : vent
      )
    );
  };

  const handleDownvote = (id) => {
    setVents(prevVents =>
      prevVents.map(vent =>
        vent.id === id ? { ...vent, downvotes: vent.downvotes + 1 } : vent
      )
    );
  };

  const handleAddReply = (ventId, replyContent) => {
    setVents(prevVents =>
      prevVents.map(vent =>
        vent.id === ventId
          ? {
              ...vent,
              replies: [
                ...(vent.replies || []), 
                {
                  id: Date.now(),
                  content: replyContent,
                  author: "Anonymous", 
                  timestamp: new Date().toISOString(),
                },
              ],
            }
          : vent
      )
    );
  };

  const handleDeleteVent = (id) => {

    if (window.confirm("Are you sure you want to delete this vent?")) {
      setVents(prevVents => prevVents.filter(vent => vent.id !== id));
    }
  };

  const sortedVents = [...vents].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));

  return (
    <div className="container">
      <h2 className="text-center" style={{ fontSize: '36px', fontWeight: '800', color: '#333', marginBottom: '40px' }}>All Vents</h2>
      {sortedVents.length === 0 ? (
        <p className="text-center" style={{ fontSize: '18px', color: '#666' }}>No vents yet. Be the first to vent!</p>
      ) : (
        <div className="vent-grid">
          {sortedVents.map(vent => (
            <VentCard
              key={vent.id}
              vent={vent}
              onUpvote={handleUpvote}
              onDownvote={handleDownvote}
              onAddReply={handleAddReply}
              onDeleteVent={handleDeleteVent} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;