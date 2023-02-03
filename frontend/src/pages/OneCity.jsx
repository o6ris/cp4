import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import apiConnection from "@services/apiConnection";

function OneCity() {
  const { id } = useParams();
  const getOneCity = () => {
    apiConnection
      .get(`/cityReviews/${id}`)
      .then((oneCity) => {
        console.warn(oneCity.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getOneCity();
  });
  return (
    <div>
      <h1>Bienvenu à {}</h1>
    </div>
  );
}

export default OneCity;
