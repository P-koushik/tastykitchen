import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './RestaurantDetails.css';
import Header from '../header/Header';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem('cartItems')) || {};
  });

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      const jwtToken = Cookies.get('token');
      const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`;
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      try {
        const response = await fetch(apiUrl, options);
        if (!response.ok) throw new Error('Failed to fetch restaurant details');
        const data = await response.json();

        const updatedData = {
          id: data.id,
          name: data.name,
          imageUrl: data.image_url,
          rating: data.rating,
          reviewsCount: data.reviews_count,
          cuisine: data.cuisine,
          costForTwo: data.cost_for_two,
          location: data.location,
          foodItems: data.food_items,
        };

        setRestaurant(updatedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  // LocalStorage Sync
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart]);

  const handleAdd = (item) => {
    setCart(prev => ({
      ...prev,
      [item.id]: { ...item, quantity: 1 }
    }));
  };

  const handleIncrement = (item) => {
    setCart(prev => ({
      ...prev,
      [item.id]: {
        ...prev[item.id],
        quantity: prev[item.id].quantity + 1
      }
    }));
  };

  const handleDecrement = (item) => {
    setCart(prev => {
      const existing = prev[item.id];
      if (existing.quantity <= 1) {
        const { [item.id]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [item.id]: {
          ...existing,
          quantity: existing.quantity - 1
        }
      };
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!restaurant) return <div>No restaurant found</div>;

  return (
    <div>
        <Header/>
        <div className="restaurant-details">
        <div className="restaurant-header">
            <img src={restaurant.imageUrl} alt={restaurant.name} className="restaurant-banner" />
            <div className="restaurant-info">
            <h1>{restaurant.name}</h1>
            <p>{restaurant.cuisine}</p>
            <p>{restaurant.location}</p>
            <div className="rating-cost">
                <div>
                <p>Rating: {restaurant.rating}</p>
                <p>{restaurant.reviewsCount} Reviews</p>
                </div>
                <div>
                <p>₹{restaurant.costForTwo}</p>
                <p>Cost for two</p>
                </div>
            </div>
            </div>
        </div>
        
        <div className="food-items">
            {restaurant.foodItems?.map((item) => (
            <div key={item.id} className="food-item">
                <img src={item.image_url} alt={item.name} />
                <div className="food-info">
                <h3>{item.name}</h3>
                <p>₹{item.cost}</p>
                <p>{item.rating} ★</p>
                {cart[item.id] ? (
                    <div className="quantity-control">
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{cart[item.id].quantity}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                    </div>
                ) : (
                    <button onClick={() => handleAdd(item)}>ADD</button>
                )}
                </div>
            </div>
            ))}
        </div>
        </div>
    </div>
  );
};

export default RestaurantDetails;