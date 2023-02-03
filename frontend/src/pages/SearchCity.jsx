import React, { useState, useEffect, useContext } from "react";
import SearchBar from "@components/SearchbarTemplate";
import apiConnection from "@services/apiConnection";

import User from "../contexts/UserContext";

function SearchCity() {
  const { user } = useContext(User.UserContext);
  const [cities, setCities] = useState([]);

  const getCities = () => {
    apiConnection
      .get(`/cities`)
      .then((allCities) => setCities(allCities.data))
      .catch((error) => console.error(error));
  };

  const showCityReviews = (city) => {
    console.warn(city);
  };

  useEffect(() => {
    getCities();
  }, []);
  return (
    <div className="w-full flex flex-col gap-5 items-center mt-20">
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
