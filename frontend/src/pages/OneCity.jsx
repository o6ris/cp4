import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import ButtonIsAgreeTemplate from "@components/ButtonIsAgreeTemplate";
import CardCriteriaTemplate from "@components/CardCriteriaTemplate";
import GobackButtonTemplate from "@components/GobackButtonTemplate";

import User from "../contexts/UserContext";

function OneCity() {
  const { id } = useParams();
  const { user } = useContext(User.UserContext);
  const [reviewsCity, setReviewsCity] = useState();
  const [avgScoresCity, setAvgScoresCity] = useState();

  const navigate = useNavigate();

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
    <>
      <GobackButtonTemplate navigate={() => navigate("/FindCity")} />
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
              <div className="bg-white opacity-80 p-6 rounded-md">
                <h2 className="text-2xl font-bold">
                  {avgScoresCity.avgTotalScore}
                  <span className="text-xs font-normal">/10</span>
                </h2>
              </div>
              <h1 className="text-2xl text-white text-center text-shadow">
                Bienvenue à {reviewsCity[0]?.cityName}
              </h1>
              <ButtonTemplate
                buttonType="submit"
                buttonText="Post a Review!"
                buttonStyle="buttonStyle"
                methodOnClick={() => navigate(`/PostReview/${id}`)}
              />
            </div>
            {/* NOTES MOYENNE CRITERES */}
            <div className="grid grid-cols-2 gap-4 py-6">
              <CardCriteriaTemplate
                icon={<FaCloudSun className="iconInCountainer" />}
                criteria="Whether"
                score={avgScoresCity.avgWeather}
              />
              <CardCriteriaTemplate
                icon={<FaShieldAlt className="iconInCountainer" />}
                criteria="Security"
                score={avgScoresCity.avgSecurity}
              />
              <CardCriteriaTemplate
                icon={<FaCoins className="iconInCountainer" />}
                criteria="Cost of Living"
                score={avgScoresCity.avgCost_of_living}
              />
              <CardCriteriaTemplate
                icon={<FaTree className="iconInCountainer" />}
                criteria="Environement"
                score={avgScoresCity.avgEnvironement}
              />
              <CardCriteriaTemplate
                icon={<FaTrain className="iconInCountainer" />}
                criteria="Public Transportation"
                score={avgScoresCity.avgPublic_transportation}
              />
              <CardCriteriaTemplate
                icon={<FaShoppingBag className="iconInCountainer" />}
                criteria="Shops Facilities"
                score={avgScoresCity.avgShops}
              />
              <CardCriteriaTemplate
                icon={<FaSnowboarding className="iconInCountainer" />}
                criteria="Activities"
                score={avgScoresCity.avgActivities}
              />
              <CardCriteriaTemplate
                icon={<FaGlassMartiniAlt className="iconInCountainer" />}
                criteria="Nightlife"
                score={avgScoresCity.avgNightlife}
              />
            </div>
            {/* LES REVIEWS */}
            <div>
              <div className="flex flex-col items-center gap-5 px-5">
                <h2 className="text-xl">All the Reviews</h2>
                {reviewsCity.map((review) => {
                  return (
                    <div key={review.id} className="countainerReview">
                      <div>
                        <h3 className="text-lg">
                          {review.userAlias} gave the score of {review.avgScore}
                        </h3>
                        <p className="text-sm">
                          Trip date: {review.arrival_date.slice(0, 10)} -{" "}
                          {review.return_date.slice(0, 10)}
                        </p>
                      </div>
                      <ul className="grid grid-cols-6 gap-x-4 wrap">
                        <li className="flex items-center gap-2">
                          <FaCloudSun className="iconColor" /> {review.weather}
                        </li>
                        <li className="flex items-center gap-2">
                          <FaShieldAlt className="iconColor" />{" "}
                          {review.security}
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
                          <ButtonIsAgreeTemplate
                            idReview={review.id}
                            user={user}
                          />
                        </div>
                        {/* DATE POST */}
                        <p className="text-xs">
                          {review.date_post.slice(0, 10)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default OneCity;
