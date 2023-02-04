/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  // RiDislikeFill,
  RiDislikeLine,
} from "react-icons/ri";
import apiConnection from "@services/apiConnection";

function ButtonDisagreeTemplate({ idReview }) {
  const [disagrees, setDisagrees] = useState(0);

  const getWhoDisagrees = (id) => {
    apiConnection
      .get(`/rating/${id}?isAgree=0`)
      .then((disagree) => {
        setDisagrees(disagree.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getWhoDisagrees(idReview);
  }, []);
  return (
    <div className="flex items-center gap-2">
      <RiDislikeLine className="text-xl text-gray-400" />
      <p>{disagrees.isAgree}</p>
    </div>
  );
}

export default ButtonDisagreeTemplate;
