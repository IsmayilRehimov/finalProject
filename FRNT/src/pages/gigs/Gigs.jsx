import React, { useRef, useState, useMemo } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";
import { FiChevronRight, FiFilter, FiX, FiCheck } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [openSort, setOpenSort] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);

  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gigs", search, min, max, sort],
    queryFn: () =>
      newRequest
        .get(`/gigs${search}&min=${min || 0}&max=${max || 9999}`)
        .then((res) => res.data),
  });

  const reSort = (type) => {
    setSort(type);
    setOpenSort(false);
  };

  const applyFilters = () => {
    setMin(minRef.current.value);
    setMax(maxRef.current.value);
    setOpenFilter(false);
  };

  const resetFilters = () => {
    setMin(null);
    setMax(null);
    if (minRef.current) minRef.current.value = "";
    if (maxRef.current) maxRef.current.value = "";
    setOpenFilter(false);
  };

  const getCatName = () => {
    const query = new URLSearchParams(search);
    const cat = query.get("cat");
    if (!cat) return "All Services";
    switch (cat) {
      case "web": return "Programming & Development";
      case "design": return "Graphics & Design";
      case "animation": return "Video & Animation";
      case "music": return "Music & Audio";
      case "digital": return "Digital Marketing";
      case "business": return "Business";
      case "lifestyle": return "Lifestyle";
      case "writing": return "Writing & Translation";
      case "data": return "Data Services";
      case "photography": return "Photography";
      default: return "Services";
    }
  };

  const sortedData = useMemo(() => {
    if (!data) return [];

    const calculateRating = (gig) => {
      return gig.starNumber > 0 ? gig.totalStars / gig.starNumber : 0;
    };

    switch (sort) {
      case "sales":
        return [...data].sort((a, b) => b.sales - a.sales);
      case "createdAt":
        return [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "topRated":
        return [...data].sort((a, b) => {
          const ratingA = calculateRating(a);
          const ratingB = calculateRating(b);
          return ratingB - ratingA;
        });
      default:
        return data;
    }
  }, [data, sort]);

  return (
    <div className="gigs">
      <div className="container">
        <div className="breadcrumbs">
          <span>FreeWell</span>
          <FiChevronRight className="chevron" />
          <span>{getCatName()}</span>
        </div>

        <div className="header">
          <h1>{getCatName()}</h1>
          <p className="subtitle">
            Explore top-quality services from our professional freelancers
          </p>
        </div>

        <div className="controls">
          <div className="filterControls">
            <button 
              className="filterButton"
              onClick={() => setOpenFilter(!openFilter)}
            >
              <FiFilter className="filterIcon" />
              Filters
            </button>

            {openFilter && (
              <div className="filterDropdown">
                <div className="filterHeader">
                  <h3>Price Range</h3>
                  <button onClick={() => setOpenFilter(false)}>
                    <FiX />
                  </button>
                </div>
                <div className="priceInputs">
                  <div className="inputGroup">
                    <label>Min Price ($)</label>
                    <input 
                      ref={minRef} 
                      type="number" 
                      placeholder="0" 
                      min="0"
                    />
                  </div>
                  <div className="inputGroup">
                    <label>Max Price ($)</label>
                    <input 
                      ref={maxRef} 
                      type="number" 
                      placeholder="9999" 
                      min="0"
                    />
                  </div>
                </div>
                <div className="filterActions">
                  <button className="resetButton" onClick={resetFilters}>
                    Reset
                  </button>
                  <button className="applyButton" onClick={applyFilters}>
                    <FiCheck className="checkIcon" />
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="sortControls">
            <span className="sortLabel">Sort by:</span>
            <div className="sortSelect" onClick={() => setOpenSort(!openSort)}>
              <span className="sortValue">
                {sort === "sales" ? "Best Selling" : 
                 sort === "createdAt" ? "Newest" : "Top Rated"}
              </span>
              <IoIosArrowDown className={`arrowIcon ${openSort ? "open" : ""}`} />
              
              {openSort && (
                <div className="sortDropdown">
                  <div 
                    className={`sortOption ${sort === "sales" ? "active" : ""}`}
                    onClick={() => reSort("sales")}
                  >
                    Best Selling
                  </div>
                  <div 
                    className={`sortOption ${sort === "createdAt" ? "active" : ""}`}
                    onClick={() => reSort("createdAt")}
                  >
                    Newest
                  </div>
                  <div 
                    className={`sortOption ${sort === "topRated" ? "active" : ""}`}
                    onClick={() => reSort("topRated")}
                  >
                    Top Rated
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="results">
          {isLoading ? (
            <div className="loadingState">
              <div className="spinner"></div>
              <span>Loading services...</span>
            </div>
          ) : error ? (
            <div className="errorState">
              <span>Unable to load services. Please try again.</span>
            </div>
          ) : sortedData.length > 0 ? (
            <div className="cards">
              {sortedData.map((gig) => (
                <GigCard key={gig._id} item={gig} />
              ))}
            </div>
          ) : (
            <div className="emptyState">
              <span>No services found matching your criteria</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gigs;