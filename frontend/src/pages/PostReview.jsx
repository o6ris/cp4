import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaCloudSun,
  FaSnowboarding,
  FaShieldAlt,
  FaCoins,
  FaTree,
  FaTrain,
  FaShoppingBag,
  FaGlassMartiniAlt,
} from "react-icons/fa";
import InputTemplate from "@components/InputTemplate";
import RangeInputTemplate from "@components/RangeInputTemplate";
import ButtonTemplate from "@components/ButtonTemplate";
import apiConnection from "@services/apiConnection";

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
              <p className="w-11/12 ml-5">Arrival Date</p>
              <InputTemplate
                customWidth="inputStyle"
                inputType="date"
                methodOnChange={handleInputOnChange}
                name="arrival_date"
              />
            </div>
            <div className="flex flex-col items-center gap-1 w-full">
              <p className="w-11/12 ml-5">Departure Date</p>
              <InputTemplate
                customWidth="inputStyle"
                inputType="date"
                methodOnChange={handleInputOnChange}
                name="return_date"
              />
            </div>
            {/* CRITERIAS */}
            <div className="flex flex-col items-center gap-7 mt-5">
              {/* ALL SLIDERS */}
              <RangeInputTemplate
                methodOnChange={handleInputOnChange}
                score={review.weather}
                name="weather"
                idCriteria="weather"
                criteria="Weather"
                icon={<FaCloudSun className="iconColor text-xl" />}
                tip="0 for a bad weather, 10 for a wonderful weather"
              />
              <RangeInputTemplate
                methodOnChange={handleInputOnChange}
                score={review.activities}
                name="activities"
                idCriteria="activities"
                criteria="Activities"
                icon={<FaSnowboarding className="iconColor text-xl" />}
                tip="0 for few activities, 10 for many activities"
              />
              <RangeInputTemplate
                methodOnChange={handleInputOnChange}
                score={review.security}
                name="security"
                idCriteria="security"
                criteria="Security"
                icon={<FaShieldAlt className="iconColor text-xl" />}
                tip="0 for unsafe, 10 for very safe"
              />
              <RangeInputTemplate
                methodOnChange={handleInputOnChange}
                score={review.cost_of_living}
                name="cost_of_living"
                idCriteria="cost_of_living"
                criteria="Cost of Living"
                icon={<FaCoins className="iconColor text-xl" />}
                tip="0 for very expensive life, 10 for cheap life"
              />
              <RangeInputTemplate
                methodOnChange={handleInputOnChange}
                score={review.environement}
                name="environement"
                idCriteria="environement"
                criteria="Environement"
                icon={<FaTree className="iconColor text-xl" />}
                tip="0 for poor environment, 10 for beautiful environment"
              />
              <RangeInputTemplate
                methodOnChange={handleInputOnChange}
                score={review.public_transportation}
                name="public_transportation"
                idCriteria="public_transportation"
                criteria="Public transportation"
                icon={<FaTrain className="iconColor text-xl" />}
                tip="0 for a crappy transport network, 10 for a great one"
              />
              <RangeInputTemplate
                methodOnChange={handleInputOnChange}
                score={review.shops}
                name="shops"
                idCriteria="shops"
                criteria="Shopping facilities"
                icon={<FaShoppingBag className="iconColor text-xl" />}
                tip="0 for very little shops and 10 for a lot"
              />
              <RangeInputTemplate
                methodOnChange={handleInputOnChange}
                score={review.nightlife}
                name="nightlife"
                idCriteria="nightlife"
                criteria="Nightlife"
                icon={<FaGlassMartiniAlt className="iconColor text-xl" />}
                tip="0 if it sucked and 10 if you can had fun all night"
              />
            </div>
            <hr className="w-6/12 bg-gray-300" />
            <p className="w-9/12 text-center">
              For the next step, detail your pros and cons about your
              destination. Please be as precise and honest as possible, your
              opinion will interest everyone!
            </p>
            <div className="flex flex-col items-center w-full">
              <textarea className="inputStyle" name="comment" id="" rows="7" />
              <p className="text-xs">Enter between 80 and 1000 characters</p>
            </div>
            <ButtonTemplate
              buttonType="submit"
              buttonText="Add Review"
              buttonStyle="buttonStyle"
              // methodOnClick={handleLogin}
            />
          </form>
        </>
      )}
    </div>
  );
}

export default PostReview;
