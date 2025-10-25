import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddPost from './pages/AddPost';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import VerifySupplier from './pages/VerifySupplier';

// Auth context
export const AuthContext = createContext();

const App = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    const raw = localStorage.getItem('gebeya_currentUser');
    return raw ? JSON.parse(raw) : null;
  });

  // simple users store in localStorage (username, password, id)
  useEffect(() => {
    if (!localStorage.getItem('gebeya_users')) {
      localStorage.setItem('gebeya_users', JSON.stringify([]));
    }
    if (!localStorage.getItem('gebeya_posts')) {
      localStorage.setItem('gebeya_posts', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gebeya_currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  const register = (username, password) => {
    const users = JSON.parse(localStorage.getItem('gebeya_users') || '[]');
    if (users.find(u => u.username === username)) {
      return false;
    }
    const newUser = { id: Date.now(), username, password };
    users.push(newUser);
    localStorage.setItem('gebeya_users', JSON.stringify(users));
    return true;
  };

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('gebeya_users') || '[]');
    const found = users.find(u => u.username === username && u.password === password);
    if (found) {
      setCurrentUser(found);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updates) => {
    setCurrentUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      // persist into users list
      const users = JSON.parse(localStorage.getItem('gebeya_users') || '[]');
      const nextUsers = users.map((u) => (u.id === updated.id ? updated : u));
      localStorage.setItem('gebeya_users', JSON.stringify(nextUsers));
      localStorage.setItem('gebeya_currentUser', JSON.stringify(updated));
      return updated;
    });
  };

  return (
  <AuthContext.Provider value={{ currentUser, register, login, logout, updateProfile }}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="pt-6 pb-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-post" element={<AddPost />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/verify" element={<VerifySupplier />} />
              <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" />} />
              <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/" />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
