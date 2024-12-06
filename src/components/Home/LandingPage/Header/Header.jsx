import React, { useState, useEffect, useContext } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { motion } from "framer-motion";
import { UserOutlined } from "@ant-design/icons";
import { SharedContext } from "../../../../context/SharedContextProvider/SharedContextProvider";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const navigate = useNavigate();

  const { logo } = useContext(SharedContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = () => {
    console.log('Search Query:', searchQuery); // Ensure this is correctly set
    console.log('Search Location:', searchLocation);
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(searchLocation)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <motion.div
      className="background_container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="header_content">
          <div className="logo_container">
            <img src={logo} alt=" Logo" className="logo" />
          </div>
          <div className="header_right">
            <Button className="modern_btn list_space_btn">List a Property</Button>
            <Link to="/signup">
              <UserOutlined className="user_icon" aria-label="User Icon" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="main-title">
            Agricultural <span className="solutions">Solutions</span> Made Easy
          </h1>
          <div className="divider"></div>
          <p className="sub-title">
            Let us handle your <span className="storage">storage</span> while you focus on your agri-business
          </p>

          {/* Search Bar */}
          <div className="modern-search-bar">
            <input
              type="text"
              placeholder="Enter search term (e.g., Tractor)"
              className="modern-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter location (e.g., Lagos)"
              className="modern-input"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            <Button
              className="modern_btn search_btn"
              onClick={handleSearch}
            >
              Start Search
            </Button>
          </div>

          {/* Call to Action */}
          <Button className="modern-btn supplier-btn">Explore Now</Button>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Header;
