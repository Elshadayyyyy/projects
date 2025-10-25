import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const Cart = () => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));

  useEffect(() => {
    const handleStorage = () => setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const remove = (id) => {
    const next = cart.filter(c => c.id !== id);
    localStorage.setItem('cart', JSON.stringify(next));
    setCart(next);
  };

  const clear = () => {
    if (!window.confirm('Clear cart?')) return;
    localStorage.setItem('cart', JSON.stringify([]));
    setCart([]);
  };

  const total = cart.reduce((s, p) => s + (p.price || 0), 0);
  const { currentUser, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const handleCheckout = () => {
    // Demo checkout: show toast that Chapa will be integrated, assume payment successful,
    // increment user's coins (one coin per item) and clear cart.
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const coinsToAdd = cart.length;
    updateProfile({ coins: (currentUser.coins || 0) + coinsToAdd });
    // clear cart
    localStorage.setItem('cart', JSON.stringify([]));
    setCart([]);

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate('/');
    }, 2200);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-gray-600">Your cart is empty. <Link to="/shop" className="text-gray-800 underline">Browse products</Link></div>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded shadow">
              <div className="flex items-center space-x-4">
                {item.image && <img src={item.image} alt="product" className="w-20 h-20 object-cover rounded" />}
                <div>
                  <div className="font-semibold">{item.caption}</div>
                  <div className="text-sm text-gray-600">{item.price} ETB</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => remove(item.id)} className="px-3 py-1 border rounded">Remove</button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between bg-white p-3 rounded shadow">
            <div className="font-semibold">Total</div>
            <div className="font-semibold">{total} ETB</div>
          </div>

          <div className="flex space-x-3">
            <button onClick={clear} className="px-4 py-2 border rounded">Clear cart</button>
            <button onClick={handleCheckout} className="px-4 py-2 bg-black text-white rounded">Checkout</button>
          </div>
        </div>
      )}
      {showToast && (
        <div className="fixed left-1/2 transform -translate-x-1/2 bottom-8 bg-black text-white px-4 py-2 rounded shadow">
          Will be integrated with Chapa — assuming demo payment completed. Redirecting...
        </div>
      )}
    </div>
  );
};

export default Cart;
