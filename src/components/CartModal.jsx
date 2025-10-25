import React from 'react';

const CartModal = ({ cartItems, onClose }) => {
  const handleCheckout = (item) => {
    alert(`Simulating Chapa payment for ${item.title} - ${item.price || 0} ETB`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 max-h-[80vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">No items in cart</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-3 p-2 border rounded-md">
              <span>{item.title}</span>
              <button
                onClick={() => handleCheckout(item)}
                className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
              >
                Pay
              </button>
            </div>
          ))
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CartModal;
