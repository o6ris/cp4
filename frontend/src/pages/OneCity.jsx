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
          <div className="absolute flex flex-col h-72 justify-center items-center gap-3">
            <h1 className="text-2xl text-white text-center text-shadow">
              Bienvenu à {city[0]?.cityName}
            </h1>
            <ButtonTemplate
              buttonType="submit"
              buttonText="Post your Review!"
              buttonStyle="buttonStyle"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default OneCity;
