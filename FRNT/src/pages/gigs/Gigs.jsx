import React, { useRef, useState, useMemo } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);

  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gigs", search, min, max],
    queryFn: () =>
      newRequest
        .get(`/gigs${search}&min=${min || 0}&max=${max || 9999}`)
        .then((res) => res.data),
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const apply = () => {
    setMin(minRef.current.value);
    setMax(maxRef.current.value);
  };

  const getCatName = () => {
    const query = new URLSearchParams(search);
    const cat = query.get("cat");
    if (!cat) return "All Gigs";
    switch (cat) {
      case "web":
        return "Programming & Development";
      case "design":
        return "Graphics & Design";
      case "animation":
        return "Video & Animation";
      case "music":
        return "Music & Audio";
      case "digital":
        return "Digital Marketing";
      case "business":
        return "Business";
      case "lifestyle":
        return "Lifestyle";
      case "writing":
        return "Writing & Translate";
      case "data":
        return "Data";
      case "photography":
        return "Photography";
      default:
        return "Gigs";
    }
  };

  // Lokal olaraq sıralanmış datanı hesablamaq üçün useMemo
  const sortedData = useMemo(() => {
    if (!data) return [];

    const gigsWithRating = data.map((gig) => ({
      ...gig,
      rating:
        typeof gig.totalStars === "number" &&
        typeof gig.starNumber === "number" &&
        gig.starNumber > 0
          ? gig.totalStars / gig.starNumber
          : 0,
    }));

    if (sort === "sales") {
      return gigsWithRating.sort((a, b) => b.sales - a.sales);
    } else if (sort === "createdAt") {
      return gigsWithRating.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sort === "topRated") {
      return gigsWithRating.sort((a, b) => b.rating - a.rating);
    } else {
      return gigsWithRating;
    }
  }, [data, sort]);

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Quickerr &gt; {getCatName()} &gt;</span>
        <h1>{getCatName()}</h1>
        <p>Explore the best gigs from top freelancers in {getCatName()}!</p>

        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales"
                ? "Best Selling"
                : sort === "createdAt"
                ? "Newest"
                : "Top Rated"}
            </span>
            <img src="/img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort !== "createdAt" && (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                )}
                {sort !== "sales" && (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                {sort !== "topRated" && (
                  <span onClick={() => reSort("topRated")}>Top Rated</span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="cards">
          {isLoading
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : sortedData.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
