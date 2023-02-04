import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  FaCloudSun,
  FaShieldAlt,
  FaCoins,
  FaTree,
  FaTrain,
  FaShoppingBag,
  FaSnowboarding,
  FaGlassMartiniAlt,
} from "react-icons/fa";
import apiConnection from "@services/apiConnection";
import ButtonTemplate from "@components/ButtonTemplate";
import ButtonAgreeTemplate from "@components/ButtonAgreeTemplate";
import ButtonDisagreeTemplate from "@components/ButtonDisagreeTemplate";

import User from "../contexts/UserContext";

function OneCity() {
  const { id } = useParams();
  const { user } = useContext(User.UserContext);
  const [reviewsCity, setReviewsCity] = useState();
  const [avgScoresCity, setAvgScoresCity] = useState();
  // console.log(reviewsCity);
  // console.log(avgScoresCity);
  const getReviewsByCity = () => {
    apiConnection
      .get(`/cityReviews/${id}`)
      .then((city) => {
        setReviewsCity(city.data);
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
    getReviewsByCity();
    getAvgScoresByCity();
  }, []);
  return (
    <div className="w-full flex flex-col items-center pb-10">
      {reviewsCity && avgScoresCity && (
        <>
          {/* HEADER */}
          <div
            className="bg-center bg-cover bg-no-repeat w-full h-72 relative"
            style={{ backgroundImage: `url(${reviewsCity[0]?.cityPicture})` }}
          />
          <div className="bg-black opacity-40 w-full h-72 absolute" />
          <div className="absolute flex flex-col h-72 justify-center items-center drop-shadow-lg gap-3">
            <div className="bg-white opacity-80 p-5 rounded-md">
              <h2 className="text-xl">{avgScoresCity.avgTotalScore}</h2>
            </div>
            <h1 className="text-2xl text-white text-center text-shadow">
              Bienvenue à {reviewsCity[0]?.cityName}
            </h1>
            <ButtonTemplate
              buttonType="submit"
              buttonText="Post your Review!"
              buttonStyle="buttonStyle"
            />
          </div>
          {/* NOTES MOYENNE CRITERES */}
          <div className="grid grid-cols-2 gap-4 py-6">
            <div className="countainerCriteria">
              <FaCloudSun className="iconInCountainer" />
              <h3 className="text-sm">Whether</h3>
              <h3 className="text-2xl">{avgScoresCity.avgWeather}</h3>
            </div>
            <div className="countainerCriteria">
              <FaShieldAlt className="iconInCountainer" />
              <h3 className="text-sm">Security</h3>
              <h3 className="text-2xl">{avgScoresCity.avgSecurity}</h3>
            </div>
            <div className="countainerCriteria">
              <FaCoins className="iconInCountainer" />
              <h3 className="text-sm">Cost of Living</h3>
              <h3 className="text-2xl">{avgScoresCity.avgCost_of_living}</h3>
            </div>
            <div className="countainerCriteria">
              <FaTree className="iconInCountainer" />
              <h3 className="text-sm">Environement</h3>
              <h3 className="text-2xl">{avgScoresCity.avgEnvironement}</h3>
            </div>
            <div className="countainerCriteria">
              <FaTrain className="iconInCountainer" />
              <h3 className="text-sm">Public Transportation</h3>
              <h3 className="text-2xl">
                {avgScoresCity.avgPublic_transportation}
              </h3>
            </div>
            <div className="countainerCriteria">
              <FaShoppingBag className="iconInCountainer" />
              <h3 className="text-sm">Shops Facilities</h3>
              <h3 className="text-2xl">{avgScoresCity.avgShops}</h3>
            </div>
            <div className="countainerCriteria">
              <FaSnowboarding className="iconInCountainer" />
              <h3 className="text-sm">Activities</h3>
              <h3 className="text-2xl">{avgScoresCity.avgActivities}</h3>
            </div>
            <div className="countainerCriteria">
              <FaGlassMartiniAlt className="iconInCountainer" />
              <h3 className="text-sm">Nightlife</h3>
              <h3 className="text-2xl">{avgScoresCity.avgNightlife}</h3>
            </div>
          </div>
          {/* LES REVIEWS */}
          <div>
            <div className="flex flex-col items-center gap-5 px-5">
              <h2 className="text-xl">All the Reviews</h2>
              {reviewsCity.map((review) => {
                return (
                  <div
                    key={review.id}
                    className="flex flex-col gap-3 bg-gray-200 p-3 rounded-lg"
                  >
                    <div>
                      <h3 className="text-lg">
                        {review.userAlias} gave the score of {review.avgScore}
                      </h3>
                      <p className="text-sm">
                        Trip date : {review.arrival_date} - {review.return_date}
                      </p>
                    </div>
                    <ul className="grid grid-cols-6 gap-x-4 wrap">
                      <li className="flex items-center gap-2">
                        <FaCloudSun className="iconColor" /> {review.weather}
                      </li>
                      <li className="flex items-center gap-2">
                        <FaShieldAlt className="iconColor" /> {review.security}
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCoins className="iconColor" />
                        {review.cost_of_living}
                      </li>
                      <li className="flex items-center gap-2">
                        <FaTree className="iconColor" /> {review.environement}
                      </li>
                      <li className="flex items-center gap-2">
                        <FaTrain className="iconColor" />
                        {review.public_transportation}
                      </li>
                      <li className="flex items-center gap-2">
                        <FaShoppingBag className="iconColor" />
                        {review.shops}
                      </li>
                      <li className="flex items-center gap-2">
                        <FaSnowboarding className="iconColor" />
                        {review.activities}
                      </li>
                      <li className="flex items-center gap-2">
                        <FaGlassMartiniAlt className="iconColor" />
                        {review.nightlife}
                      </li>
                    </ul>
                    <div>
                      <p>{review.userAlias} review :</p>
                      <p>{review.comment}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      {/* isAGREE ? */}
                      <div className="flex items-center gap-7">
                        <ButtonAgreeTemplate idReview={review.id} user={user} />
                        <ButtonDisagreeTemplate
                          idReview={review.id}
                          user={user}
                        />
                      </div>
                      {/* DATE POST */}
                      <p className="text-xs">{review.date_post}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default OneCity;
