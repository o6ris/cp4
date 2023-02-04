import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiConnection from "@services/apiConnection";
import ButtonTemplate from "@components/ButtonTemplate";

function OneCity() {
  const { id } = useParams();
  const [city, setCity] = useState();
  const getOneCity = () => {
    apiConnection
      .get(`/cityReviews/${id}`)
      .then((oneCity) => {
        setCity(oneCity.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getOneCity();
  }, []);
  return (
    <div className="w-full flex flex-col items-center">
      {city && (
        <>
          <div
            className="bg-center bg-cover bg-no-repeat w-full h-72 relative"
            style={{ backgroundImage: `url(${city[0]?.cityPicture})` }}
          />
          <div className="bg-black opacity-40 w-full h-72 absolute" />
          <div className="absolute flex flex-col h-72 justify-center items-center drop-shadow-lg gap-3">
            <div className="bg-white opacity-80 p-5 rounded-md">
              <h2 className="text-xl">{city[0]?.avgScore}</h2>
            </div>
            <h1 className="text-2xl text-white text-center text-shadow">
              Bienvenue à {city[0]?.cityName}
            </h1>
            <ButtonTemplate
              buttonType="submit"
              buttonText="Post your Review!"
              buttonStyle="buttonStyle"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>Bonjour</div>
          </div>
        </>
      )}
    </div>
  );
}

export default OneCity;
