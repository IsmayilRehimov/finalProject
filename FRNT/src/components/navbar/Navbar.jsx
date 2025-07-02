import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import "./Navbar.scss";

function Navbar({ toggleMode, darkMode }) {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const isActive = () => {
    setActive(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => window.removeEventListener("scroll", isActive);
  }, []);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (currentUser) {
        try {
          const res = await newRequest.get(`/messages/unread-count`);
          setUnreadCount(res.data.count);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 10000);
    return () => clearInterval(interval);
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.removeItem("currentUser");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = () => {
    if (input.trim()) {
      navigate(`/gigs?search=${input}`);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">FreeWell</span>
          </Link>
          <span className="dot">.</span>
        </div>

        <div className="searchInputNavbar">
          <input
            type="text"
            placeholder="What service are you looking for?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="links">
          <Link to="/favorites">
            <FiHeart size={20} style={{ color: "red" }} />
          </Link>

          <div className="messagesLink">
            <Link className="link" to="/messages">
              <FiMessageCircle size={20} />
            </Link>
            {unreadCount > 0 && (
              <span className="unreadBadge">{unreadCount}</span>
            )}
          </div>

          <button className="darkModeBtn" onClick={toggleMode}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  <Link className="link" to="/profile">
                    Profile
                  </Link>
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                Sign in
              </Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>

      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/gigs?cat=design">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/gigs?cat=animation">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/gigs?cat=music">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/gigs?cat=web">
              Programming & Development
            </Link>
            <Link className="link menuLink" to="/gigs?cat=digital">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/gigs?cat=business">
              Business
            </Link>
            <Link className="link menuLink" to="/gigs?cat=lifestyle">
              Lifestyle
            </Link>
            <Link className="link menuLink" to="/gigs?cat=writing">
              Writing & Translate
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
