import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="pageContainer">
      <p>Hello {user.alias}!</p>
      <SearchBar
        data={cities}
        customWidth="inputStyle"
        searchBarContainer="flex flex-col items-center w-full relative"
        textPlaceholder="Find a City!"
        textButton="Show Cities"
        methodOnClick={showCityReviews}
      />
    </div>
  );
}

export default SearchCity;
