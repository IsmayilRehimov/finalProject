import React from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Features from "./components/features/Features";
import Explore from "./components/explore/Explore";
import FeaturesDark from "./components/featuresDark/FeaturesDark";
import SliderTwo from "./components/sliderTwo/SliderTwo";
import SliderOne from "./components/sliderOne/SliderOne";
import SecOne from "./components/SecOne/SecOne";

const Home = () => {
  const navigate = useNavigate();

  const { isLoading, error, data: gigs } = useQuery({
    queryKey: ["allGigs"],
    queryFn: () =>
      newRequest
        .get("/gigs")
        .then((res) => res.data)
        .catch((err) => {
          console.log("Error fetching gigs:", err.response?.data || err.message);
          throw err;
        }),
  });

  return (
    <div className="home">
      <SecOne/>
      <SliderOne gigs={gigs} isLoading={isLoading} error={error} />
      <Features/>
      <Explore/>
      <FeaturesDark/>
      <SliderTwo gigs={gigs} isLoading={isLoading} error={error} />
    </div>
  );
};

export default Home;
