import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaCloudSun,
  // FaShieldAlt,
  // FaCoins,
  // FaTree,
  // FaTrain,
  // FaShoppingBag,
  // FaSnowboarding,
  // FaGlassMartiniAlt,
} from "react-icons/fa";

import apiConnection from "@services/apiConnection";
import InputTemplate from "@components/InputTemplate";

function PostReview() {
  const { id } = useParams();
  const [city, setCity] = useState();
  const [avgScoresCity, setAvgScoresCity] = useState();
  const [review, setReview] = useState({
    arrival_date: "",
    return_date: "",
    weather: 0,
    security: 0,
    cost_of_living: 0,
    environement: 0,
    public_transportation: 0,
    shops: 0,
    activities: 0,
    nightlife: 0,
    comment: "",
  });

  /**
   * Cette partie gère la couleur de fond de la barre du slider
   */
  const rangeInput = document.querySelector('input[type="range"]');
  rangeInput.addEventListener("input", () => {
    const val = rangeInput.value;
    const percentage = val / 10;
    const color = `linear-gradient(to right, #d46a6a ${
      percentage * 100
    }%, grey ${percentage * 100}%)`;
    rangeInput.style.background = color;
  });

  const handleInputOnChange = (place, value) => {
    const newreview = { ...review };
    newreview[place] = value;
    setReview(newreview);
  };

  const getCity = (idCity) => {
    apiConnection
      .get(`/cities/${idCity}`)
      .then((oneCity) => {
        setCity(oneCity.data);
      })
      .catch((err) => console.error(err));
  };

  const getAvgScoresByCity = () => {
    apiConnection
      .get(`/cityScores/${id}`)
      .then((avgScore) => {
        setAvgScoresCity(avgScore.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCity(id);
    getAvgScoresByCity();
  }, []);
  return (
    <div className="w-full flex flex-col items-center pb-10">
      {city && avgScoresCity && (
        <>
          {/* HEADER */}
          <div
            className="bg-center bg-cover bg-no-repeat w-full h-72 relative"
            style={{ backgroundImage: `url(${city.picture})` }}
          />
          <div className="bg-black opacity-40 w-full h-72 absolute" />
          <div className="absolute flex flex-col h-72 justify-center items-center drop-shadow-lg gap-3">
            <div className="bg-white opacity-80 p-5 rounded-md">
              <h2 className="text-xl">{avgScoresCity.avgTotalScore}</h2>
            </div>
            <h1 className="text-2xl text-white text-center text-shadow">
              {city.name} awaits your review!
            </h1>
          </div>
          {/* FORMULAIRE */}
          <form className="flex flex-col items-center justify-center w-full gap-5 py-6">
            {/* DATES */}
            <div className="flex flex-col items-center gap-1 w-full">
              <p className="w-9/12 ml-5">Arrival Date</p>
              <InputTemplate
                customWidth="inputStyle"
                inputType="date"
                methodOnChange={handleInputOnChange}
                name="arrival_date"
              />
            </div>
            <div className="flex flex-col items-center gap-1 w-full">
              <p className="w-9/12 ml-5">Departure Date</p>
              <InputTemplate
                customWidth="inputStyle"
                inputType="date"
                methodOnChange={handleInputOnChange}
                name="return_date"
              />
            </div>
            {/* CRITERIAS */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-2 items-center">
                <FaCloudSun className="iconColor text-xl" />
                <h3 className="text-xl">Weather</h3>
              </div>
              <div className="flex relative w-72 rounded-md overflow-hidden bg-gray-300 p-5 gap-4 items-center justify-between">
                <input
                  onChange={(e) =>
                    handleInputOnChange(e.target.name, e.target.value)
                  }
                  name="weather"
                  type="range"
                  min="0"
                  max="10"
                  className="w-9/12 custom-slider bg-red-500 rounded-sm"
                />
                <p className="text-3xl">{review.weather}</p>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default PostReview;
