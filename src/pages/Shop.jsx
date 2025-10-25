import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { mockPosts } from '../data/mockPosts';

const Shop = () => {
  const [posts, setPosts] = useState(() => {
    const storedRaw = localStorage.getItem('gebeya_posts') || localStorage.getItem('posts');
    if (storedRaw) {
      try {
        const parsed = JSON.parse(storedRaw);
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
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));
  const { currentUser, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleStorage = () => {
      setPosts(JSON.parse(localStorage.getItem('gebeya_posts') || '[]'));
      setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const products = posts.filter(p => p.price != null && (!query || p.caption.toLowerCase().includes(query.toLowerCase())));

  const addToCart = (product) => {
    const existing = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!existing.find(e => e.id === product.id)) {
      const next = [...existing, product];
      localStorage.setItem('cart', JSON.stringify(next));
      setCart(next);
    }
  };

  const removeFromCart = (id) => {
    const existing = JSON.parse(localStorage.getItem('cart') || '[]');
    const next = existing.filter(i => i.id !== id);
    localStorage.setItem('cart', JSON.stringify(next));
    setCart(next);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between my-6">
        <h1 className="text-3xl font-bold">Explore Shop</h1>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="px-3 py-2 border rounded w-64"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: explore grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.map(p => (
              <div key={p.id} className="relative bg-gray-100 overflow-hidden rounded">
                {p.image ? (
                  <img src={p.image} alt={p.caption} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center text-gray-400">No image</div>
                )}
                <div className="absolute left-2 top-2 bg-white/80 px-2 py-1 rounded text-sm font-semibold">{p.price} ETB</div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 text-white text-sm">
                  <div className="font-medium">{p.caption}</div>
                </div>
                <div className="absolute right-2 bottom-2">
                  <button onClick={() => addToCart(p)} className="bg-white text-gray-800 px-2 py-1 rounded text-sm">Add</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: ecommerce sidebar */}
        <aside className="hidden lg:block">
          <div className="bg-white p-4 rounded shadow sticky top-24">
            <h3 className="font-semibold mb-2">Cart</h3>
            {cart.length === 0 ? (
              <div className="text-sm text-gray-600">No items in cart</div>
            ) : (
              <div className="space-y-3">
                {cart.map(c => (
                  <div key={c.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {c.image && <img src={c.image} alt={c.caption} className="w-12 h-12 object-cover rounded" />}
                      <div className="text-sm">{c.caption}</div>
                    </div>
                    <div className="text-sm">{c.price} ETB</div>
                    <button onClick={() => removeFromCart(c.id)} className="ml-2 text-sm text-gray-600">Remove</button>
                  </div>
                ))}
                <div className="mt-3">
                  <button onClick={() => {
                    if (!currentUser) { navigate('/login'); return; }
                    const coinsToAdd = cart.length;
                    updateProfile({ coins: (currentUser.coins || 0) + coinsToAdd });
                    // clear cart
                    localStorage.setItem('cart', JSON.stringify([]));
                    setCart([]);
                    setShowToast(true);
                    setTimeout(() => { setShowToast(false); navigate('/'); }, 2200);
                  }} className="w-full bg-black text-white px-4 py-2 rounded">Checkout</button>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
      {showToast && (
        <div className="fixed left-1/2 transform -translate-x-1/2 bottom-8 bg-black text-white px-4 py-2 rounded shadow z-50">
          Will be integrated with Chapa — assuming demo payment completed. Redirecting...
        </div>
      )}
    </div>
  );
};

export default Shop;
