import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/home.css";
import Slider from "react-slick"; // ✅ Import react-slick for sliding banners
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // ✅ Image Slider Settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // ✅ Sample images for banner
  const banners = [
    "/assets/banner1.jpg",
    "/assets/banner2.jpeg",
    "/assets/banner3.jpeg",
  ];
  

  // ✅ Offers Section
  const offers = [
    { id: 1, text: "🔥 50% Off on Electronics!", bg: "#ff5733" },
    { id: 2, text: "🎉 Buy 1 Get 1 Free on Fashion!", bg: "#ffc107" },
    { id: 3, text: "🚀 Free Shipping on Orders Above ₹999", bg: "#28a745" },
  ];

  return (
    <div className="home-container">
      {/* ✅ Image Slider */}
      <Slider {...sliderSettings} className="slider-container">
        {banners.map((image, index) => (
          <div key={index} className="slider-item">
            <img src={image} alt={`Banner ${index + 1}`} />
          </div>
        ))}
      </Slider>

      {/* ✅ Welcome Message */}
      <h1>Welcome to Our eCommerce Platform</h1>
      <p>Find the best products at the best prices.</p>

      {/* ✅ Offers Section */}
      <div className="offers-container">
        {offers.map((offer) => (
          <div key={offer.id} className="offer-card" style={{ background: offer.bg }}>
            {offer.text}
          </div>
        ))}
      </div>

      {/* ✅ Shop Now Button */}
      <button className="shop-now-btn" onClick={() => navigate("/products")}>
        🛍️ Shop Now
      </button>
    </div>
  );
};

export default Home;
