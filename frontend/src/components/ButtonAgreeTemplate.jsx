/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import apiConnection from "@services/apiConnection";

function ButtonAgreeTemplate({ idReview, user }) {
  const [agreesNbr, setAgreesNbr] = useState();
  const [isAgree, setIsAgree] = useState(false);
  // console.log(agreesNbr)

  const getWhoAgrees = (id) => {
    apiConnection
      .get(`/ratingNbr/${id}?isAgree=1`)
      .then((agree) => {
        setAgreesNbr(agree.data.isAgree);
      })
      .catch((err) => console.error(err));
  };

  const handleAgreed = () => {
    if (!isAgree) {
      apiConnection
        .post(`/rating`, {
          id_user: user.id,
          id_review: idReview,
          isAgree: 1,
        })
        .then(() => {
          setIsAgree(true);
          getWhoAgrees();
        })
        .catch((error) => console.error(error));
    } else {
      apiConnection
        .delete(`/rating/${idReview}`)
        .then(() => {
          setIsAgree(false);
          getWhoAgrees();
        })
        .catch((err) => console.error(err));
    }
  };

  const checkIfAgree = (id) => {
    apiConnection
      .get(`/rating/${id}?isAgree=1`)
      .then((rate) => {
        if (rate.data && rate.data.id_review === idReview) {
          setIsAgree(true);
        } else {
          setIsAgree(false);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getWhoAgrees(idReview);
  }, [agreesNbr]);

  useEffect(() => {
    checkIfAgree(idReview);
  }, []);

  return (
    <div className="flex items-center gap-2">
      {!isAgree ? (
        <button type="button" onClick={handleAgreed}>
          <RiHeartLine className="text-xl text-gray-400" />
        </button>
      ) : (
        <button type="button" onClick={handleAgreed}>
          <RiHeartFill className="text-xl text-gray-400" />
        </button>
      )}
      <p>{agreesNbr}</p>
    </div>
  );
}

export default ButtonAgreeTemplate;
