import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Restaurent.css';

const sortByOptions = [
  { optionId: '', displayText: 'Sort by' },
  { optionId: 'high', displayText: 'Highest' },
  { optionId: 'low', displayText: 'Lowest' },
];

const TOTAL_PAGES = 20; // Adjust as needed

const Restaurent = () => {
  const navigate = useNavigate();
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const limit = 9;
  const [activeOptionId, setActiveOptionId] = useState(sortByOptions[0].optionId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRestaurantsList = async () => {
      setLoading(true);
      setError(null);
      const jwtToken = Cookies.get('token');
      const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${(activePage - 1) * limit}&limit=${limit-1}&sort_by_rating=${activeOptionId}`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      };
      try {
        const response = await fetch(apiUrl, options);
        if (response.ok) {
          const fetchedData = await response.json();
          const updatedData = fetchedData.restaurants.map(restaurant => ({
            imageUrl: restaurant.image_url,
            id: restaurant.id,
            name: restaurant.name,
            userRating: restaurant.user_rating,
            rating: restaurant.user_rating.rating,
            ratingText: restaurant.user_rating.rating_text,
            totalReviews: restaurant.user_rating.total_reviews,
          }));
          setRestaurantsList(updatedData);
        } else {
          setError(new Error('Failed to fetch restaurants'));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getRestaurantsList();
  }, [activePage, limit, activeOptionId]);

  const onClickRightPage = () => {
    setActivePage(prev => (prev < TOTAL_PAGES ? prev + 1 : prev));
  };

  const onClickLeftPage = () => {
    setActivePage(prev => (prev > 1 ? prev - 1 : prev));
  };

  const updateActiveOptionId = (optionId) => {
    setActiveOptionId(optionId);
    setActivePage(1); // Reset to first page on sort change
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleRestaurantClick = (id) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div className="home-container">
      <div className="sort-options">
        <select
          value={activeOptionId}
          onChange={e => updateActiveOptionId(e.target.value)}
        >
          {sortByOptions.map(option => (
            <option key={option.optionId} value={option.optionId}>
              {option.displayText}
            </option>
          ))}
        </select>
      </div>
      <div className="restaurants-list">
        {restaurantsList.map(item => (
          <div key={item.id} className="restaurant-card" onClick={() => handleRestaurantClick(item.id)}>
            <div>
              <img
                src={item.imageUrl}
                alt={item.name}
                className="restaurant-img"
              />
            </div>
            <div>
              <h1 className="restaurant-name">{item.name}</h1>
              <p className="restaurant-food-type">Fast Food</p>
              <div className="restaurant-rating-container">
                <p className="rating-value">{item.rating}</p>
                <p className="total-ratings-value">
                  ({item.totalReviews})
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <button onClick={onClickLeftPage} disabled={activePage === 1}>{'<'}</button>
        <p className="page-count-numbers">
          <span>{activePage}</span> of <span>{TOTAL_PAGES}</span>
        </p>
        <button onClick={onClickRightPage} disabled={activePage === TOTAL_PAGES}>{'>'}</button>
      </div>
    </div>
  );
};

export default Restaurent;