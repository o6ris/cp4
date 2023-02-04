import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import apiConnection from "@services/apiConnection";
import InputTemplate from "@components/InputTemplate";

function PostReview() {
  const { id } = useParams();
  const [city, setCity] = useState();
  const [avgScoresCity, setAvgScoresCity] = useState();

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
        </>
      )}
    </div>
  );
}

export default PostReview;
