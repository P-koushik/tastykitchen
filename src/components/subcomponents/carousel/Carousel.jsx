import React, { useState, useEffect } from 'react';
import './Carousel.css';
import Cookies from 'js-cookie';

const Carousel = () => {
    const [carouselData, setCarouselData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const token = Cookies.get("token");

    useEffect(() => {
        const fetchCarouselData = async () => {
            const url = "https://apis.ccbp.in/restaurants-list/offers"; // Replace with your API endpoint
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            };
            try {
                const response = await fetch(url, options);
                if (response.ok) {
                    const data = await response.json();
                    setCarouselData(data.offers); // Adjust based on actual API response
                } else {
                    console.error("Failed to fetch carousel data");
                }
            } catch (error) {
                console.error("Error fetching carousel data:", error);
            }
        };

        if (token) {
            fetchCarouselData();
        }
    }, [token]);

    // Image rotation effect
    useEffect(() => {
        if (carouselData.length > 0) {
            const timer = setInterval(() => {
                setCurrentIndex((prevIndex) => 
                    prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
                );
            }, 5000); // Change image every 3 seconds

            return () => clearInterval(timer);
        }
    }, [carouselData]);

    if (!token) {
        return <p>Please log in to view the carousel.</p>;
    }

    return (
        <div className='carousel'>
            {Array.isArray(carouselData) && carouselData.length > 0 ? (
                <img 
                    src={carouselData[currentIndex].image_url} 
                    alt={`Carousel ${currentIndex}`} 
                    className='carousel-image'
                />
            ) : (
                <p>Loading carousel...</p>
            )}
        </div>
    );
};

export default Carousel;
