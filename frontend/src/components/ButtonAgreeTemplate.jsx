/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  // RiHeartFill,
  RiHeartLine,
} from "react-icons/ri";
import apiConnection from "@services/apiConnection";

function ButtonAgreeTemplate({ idReview }) {
  const [agrees, setAgrees] = useState(0);

  const getWhoAgrees = (id) => {
    apiConnection
      .get(`/rating/${id}?isAgree=1`)
      .then((agree) => {
        setAgrees(agree.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getWhoAgrees(idReview);
  }, []);
  return (
    <div className="flex items-center gap-2">
      <RiHeartLine className="text-xl text-gray-400" />
      <p>{agrees.isAgree}</p>
    </div>
  );
}

export default ButtonAgreeTemplate;
