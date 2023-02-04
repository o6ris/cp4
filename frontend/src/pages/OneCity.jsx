import React, { useState, useEffect } from "react";
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

function OneCity() {
  const { id } = useParams();
  const [reviewsCity, setReviewsCity] = useState();
  const [avgScoresCity, setAvgScoresCity] = useState();
  const [agrees, setAgrees] = useState(0);
  const [disagrees, setDisagrees] = useState(0);
  // console.log(reviewsCity);
  // console.log(avgScoresCity);
  console.warn(`who agrees ${agrees.isAgree}`);
  console.warn(`who disagrees ${disagrees.isAgree}`);
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

  const getWhoAgrees = (idReview) => {
    apiConnection
      .get(`/rating/${idReview}?isAgree=1`)
      .then((agree) => {
        setAgrees(agree.data);
      })
      .catch((err) => console.error(err));
  };
  const getWhoDisagrees = (idReview) => {
    apiConnection
      .get(`/rating/${idReview}?isAgree=0`)
      .then((disagree) => {
        setDisagrees(disagree.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getReviewsByCity();
    getAvgScoresByCity();
    getWhoAgrees(2);
    getWhoDisagrees(2);
  }, []);
  return (
    <div className="w-full flex flex-col items-center">
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
          {/* NOTES CRITERES */}
          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="countainerCriteria">
              <FaCloudSun className="iconCriteria" />
              <h3 className="text-sm">Whether</h3>
              <h3 className="text-2xl">{avgScoresCity.avgWeather}</h3>
            </div>
            <div className="countainerCriteria">
              <FaShieldAlt className="iconCriteria" />
              <h3 className="text-sm">Security</h3>
              <h3 className="text-2xl">{avgScoresCity.avgSecurity}</h3>
            </div>
            <div className="countainerCriteria">
              <FaCoins className="iconCriteria" />
              <h3 className="text-sm">Cost of Living</h3>
              <h3 className="text-2xl">{avgScoresCity.avgCost_of_living}</h3>
            </div>
            <div className="countainerCriteria">
              <FaTree className="iconCriteria" />
              <h3 className="text-sm">Environement</h3>
              <h3 className="text-2xl">{avgScoresCity.avgEnvironement}</h3>
            </div>
            <div className="countainerCriteria">
              <FaTrain className="iconCriteria" />
              <h3 className="text-sm">Public Transportation</h3>
              <h3 className="text-2xl">
                {avgScoresCity.avgPublic_transportation}
              </h3>
            </div>
            <div className="countainerCriteria">
              <FaShoppingBag className="iconCriteria" />
              <h3 className="text-sm">Shops Facilities</h3>
              <h3 className="text-2xl">{avgScoresCity.avgShops}</h3>
            </div>
            <div className="countainerCriteria">
              <FaSnowboarding className="iconCriteria" />
              <h3 className="text-sm">Activities</h3>
              <h3 className="text-2xl">{avgScoresCity.avgActivities}</h3>
            </div>
            <div className="countainerCriteria">
              <FaGlassMartiniAlt className="iconCriteria" />
              <h3 className="text-sm">Nightlife</h3>
              <h3 className="text-2xl">{avgScoresCity.avgNightlife}</h3>
            </div>
          </div>
          {/* LES REVIEWS */}
        </>
      )}
    </div>
  );
}

export default OneCity;
