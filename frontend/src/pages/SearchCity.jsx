import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import SearchBar from "@components/SearchbarTemplate";
import apiConnection from "@services/apiConnection";

import User from "../contexts/UserContext";

function SearchCity() {
  const { user } = useContext(User.UserContext);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

  const getCities = () => {
    apiConnection
      .get(`/cities`)
      .then((allCities) => setCities(allCities.data))
      .catch((error) => console.error(error));
  };

  const showCityReviews = (city) => {
    navigate(`/OneCity/${city.id}`);
  };

  useEffect(() => {
    getCities();
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>City Rater - Find a City</title>
        <meta
          name="description"
          content="Search for city destinations from our selection and read user reviews."
        />
      </Helmet>
      <div className=" flex flex-col items-center w-full pt-5">
        <img className="h-20" src="../assets/logo.png" alt="" />
        <p className="text-xs">Find and rate your destination!</p>
      </div>
      <div className="pageContainer">
        <h2 className="text-xl">Hello {user.alias}!</h2>
        <SearchBar
          data={cities}
          customWidth="inputStyle"
          searchBarContainer="flex flex-col items-center w-full relative"
          textPlaceholder="Find a City!"
          textButton="Show Cities"
          methodOnClick={showCityReviews}
        />
      </div>
    </>
  );
}

export default SearchCity;
