import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import {
  FiHeart,
  FiMessageCircle,
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiSearch,
  FiUser,
  FiPlus,
  FiShoppingBag,
  FiLogOut,
} from "react-icons/fi";
import "./Navbar.scss";

function Navbar({ toggleMode, darkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch unread messages count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (currentUser) {
        try {
          const res = await newRequest.get("/messages/unread-count");
          setUnreadMessages(res.data.count);
        } catch (err) {
          console.error("Error fetching unread messages:", err);
        }
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.removeItem("currentUser");
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/gigs?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const categories = [
    { name: "Graphics & Design", cat: "design" },
    { name: "Video & Animation", cat: "animation" },
    { name: "Music & Audio", cat: "music" },
    { name: "Programming & Tech", cat: "web" },
    { name: "Digital Marketing", cat: "digital" },
    { name: "Business", cat: "business" },
    { name: "Lifestyle", cat: "lifestyle" },
    { name: "Writing & Translation", cat: "writing" },
  ];

  return (
    <nav
      className={`navbar ${isScrolled || pathname !== "/" ? "scrolled" : ""} ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
          <span className="logo-text">FreeWell</span>
          <span className="logo-dot">.</span>
        </Link>

        {/* Search Bar - Desktop */}
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Find services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          <button
            type="submit"
            className={`search-button ${isSearchFocused ? "focused" : ""}`}
          >
            <FiSearch />
          </button>
        </form>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <div className="nav-links">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.cat}
                to={`/gigs?cat=${category.cat}`}
                className="nav-link"
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div className="user-actions">
            <button className="theme-toggle" onClick={toggleMode}>
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>

            <Link to="/favorites" className="icon-link">
              <FiHeart />
            </Link>

            <Link to="/messages" className="icon-link message-link">
              <FiMessageCircle />
              {unreadMessages > 0 && (
                <span className="badge">{unreadMessages}</span>
              )}
            </Link>

            {currentUser ? (
              <div className="user-menu">
                <div className="user-avatar">
                  <img
                    src={currentUser.img || "/img/noavatar.jpg"}
                    alt={currentUser.username}
                  />
                </div>
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">
                    <FiUser /> Profile
                  </Link>
                  {currentUser.isSeller && (
                    <>
                      <Link to="/mygigs" className="dropdown-item">
                        <FiShoppingBag /> My Gigs
                      </Link>
                      <Link to="/add" className="dropdown-item">
                        <FiPlus /> New Gig
                      </Link>
                    </>
                  )}
                  <Link to="/orders" className="dropdown-item">
                    <FiShoppingBag /> Orders
                  </Link>
                  <div className="dropdown-menu">
                   
                    <button
                      onClick={handleLogout}
                      className="dropdown-item logout"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="auth-link">
                  Sign In
                </Link>
                <Link to="/register" className="auth-link primary">
                  Join
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-button" onClick={toggleMenu}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          {/* Search Bar - Mobile */}
          <form className="mobile-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Find services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <FiSearch />
            </button>
          </form>

          {/* User Info */}
          {currentUser ? (
            <div className="mobile-user-info">
              <img
                src={currentUser.img || "/img/noavatar.jpg"}
                alt={currentUser.username}
              />
              <div>
                <h4>{currentUser.username}</h4>
                <span>{currentUser.email}</span>
              </div>
            </div>
          ) : (
            <div className="mobile-auth-buttons">
              <Link to="/login" className="auth-button" onClick={toggleMenu}>
                Sign In
              </Link>
              <Link
                to="/register"
                className="auth-button primary"
                onClick={toggleMenu}
              >
                Join
              </Link>
            </div>
          )}

          {/* Navigation Links */}
          <div className="mobile-nav-links">
            <Link to="/favorites" onClick={toggleMenu}>
              <FiHeart /> Favorites
            </Link>
            <Link to="/messages" onClick={toggleMenu}>
              <FiMessageCircle /> Messages
              {unreadMessages > 0 && (
                <span className="badge">{unreadMessages}</span>
              )}
            </Link>
            {currentUser && (
              <>
                <Link to="/profile" onClick={toggleMenu}>
                  <FiUser /> Profile
                </Link>
                {currentUser.isSeller && (
                  <>
                    <Link to="/mygigs" onClick={toggleMenu}>
                      <FiShoppingBag /> My Gigs
                    </Link>
                    <Link to="/add" onClick={toggleMenu}>
                      <FiPlus /> New Gig
                    </Link>
                  </>
                )}
                <Link to="/orders" onClick={toggleMenu}>
                  <FiShoppingBag /> Orders
                </Link>
              </>
            )}
          </div>

          {/* Categories */}
          <div className="mobile-categories">
            <h4>Categories</h4>
            {categories.map((category) => (
              <Link
                key={category.cat}
                to={`/gigs?cat=${category.cat}`}
                onClick={toggleMenu}
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Theme Toggle and Logout */}
          {currentUser && (
            <div className="mobile-footer">
              <button className="theme-toggle" onClick={toggleMode}>
                {darkMode ? <FiSun /> : <FiMoon />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              <button
                className="logout-button"
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
              >
                <FiLogOut /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
