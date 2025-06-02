import { useState } from 'react';
import Orderplaced from '../subcomponents/orderplaced/Orderplaced';
import Emptycart from '../subcomponents/emptycart/Emptycart';
import Cookies from 'js-cookie';
import Header from '../subcomponents/header/Header';
import './Cart.css';

const Cart = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || {}
  );
  const itemsArray = Object.values(cartItems);

  const total = itemsArray.reduce((acc, item) => acc + item.cost * item.quantity, 0);

  const handlePlaceOrder = () => {
    localStorage.removeItem('cartItems');
    setOrderPlaced(true);
  };

  const updateQuantity = (id, delta) => {
    const updated = { ...cartItems };
    if (updated[id]) {
      updated[id].quantity = Math.max(1, updated[id].quantity + delta);
      setCartItems(updated);
      localStorage.setItem('cartItems', JSON.stringify(updated));
    }
  };

  if (orderPlaced) {
    return <Orderplaced />;
  }

  return (
    <div>
      <Header />
      <div className="cart-container">
        {itemsArray.length === 0 ? (
          <Emptycart />
        ) : (
          <>
            <div className="cart-table">
              <div className="cart-header">
                <div className="cart-col item">Item</div>
                <div className="cart-col qty">Quantity</div>
                <div className="cart-col price">Price</div>
              </div>
              {itemsArray.map(item => (
                <div className="cart-row" key={item.id}>
                  <div className="cart-col item">
                    <img src={item.image_url} alt={item.name} className="cart-item-img" />
                    <span className="cart-item-name">{item.name}</span>
                  </div>
                  <div className="cart-col qty">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                  <div className="cart-col price">
                    <span className="cart-item-price">₹ {item.cost.toFixed(2)}</span>
                  </div>
                </div>
              ))}
              <div className="cart-footer">
                <div className="cart-total-label">Order Total : ₹{total}</div>
                <button className="cart-place-order-btn" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;