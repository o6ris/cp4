/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  RiHeartFill,
  RiHeartLine,
  RiDislikeFill,
  RiDislikeLine,
} from "react-icons/ri";
import apiConnection from "@services/apiConnection";

function ButtonIsAgreeTemplate({ idReview, user }) {
  const [agreesNbr, setAgreesNbr] = useState();
  const [disagreesNbr, setDisagreesNbr] = useState();
  const [isAgree, setIsAgree] = useState(false);
  const [isDisagree, setIsDisagree] = useState(false);

  /**
   * La fonction récupère le nombre de "agree" by review
   * @param {int} id
   */
  const getWhoAgrees = () => {
    apiConnection
      .get(`/ratingNbr/${idReview}?isAgree=1`)
      .then((agree) => {
        setAgreesNbr(agree.data.isAgree);
      })
      .catch((err) => console.error(err));
  };
  /**
   * La fonction récupère le nombre de "disagree" by review
   * @param {int} id
   */
  const getWhoDisAgrees = () => {
    apiConnection
      .get(`/ratingNbr/${idReview}?isAgree=0`)
      .then((disagree) => {
        setDisagreesNbr(disagree.data.isAgree);
      })
      .catch((err) => console.error(err));
  };

  /**
   * La fonction gère l'ajout, le retrait et l'edition d'un "agree" by user sur UNE review
   */
  const handleAgreed = () => {
    if (!isAgree && !isDisagree) {
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
    } else if (!isAgree && isDisagree) {
      apiConnection
        .put(`/rating/${idReview}`, {
          isAgree: 1,
        })
        .then(() => {
          setIsAgree(true);
          setIsDisagree(false);
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
  /**
   * La fonction gère l'ajout, le retrait et l'edition d'un "disagree" by user sur UNE review
   */
  const handleDisagreed = () => {
    if (!isAgree && !isDisagree) {
      apiConnection
        .post(`/rating`, {
          id_user: user.id,
          id_review: idReview,
          isAgree: 0,
        })
        .then(() => {
          setIsDisagree(true);
          getWhoDisAgrees();
        })
        .catch((error) => console.error(error));
    } else if (isAgree && !isDisagree) {
      apiConnection
        .put(`/rating/${idReview}`, {
          isAgree: 0,
        })
        .then(() => {
          setIsAgree(false);
          setIsDisagree(true);
          getWhoDisAgrees();
        })
        .catch((error) => console.error(error));
    } else {
      apiConnection
        .delete(`/rating/${idReview}`)
        .then(() => {
          setIsDisagree(false);
          getWhoAgrees();
        })
        .catch((err) => console.error(err));
    }
  };

  /**
   * La fonction check si le user à poster un "agree" sur UNE review
   * @param {int} id
   */
  const checkIfAgree = () => {
    apiConnection
      .get(`/rating/${idReview}?isAgree=1`)
      .then((rate) => {
        if (rate.data && rate.data.id_review === idReview) {
          setIsAgree(true);
        } else {
          setIsAgree(false);
        }
      })
      .catch((err) => console.error(err));
  };
  /**
   * La fonction check si le user à poster un "disagree" sur UNE review
   * @param {int} id
   */
  const checkIfDisagree = () => {
    apiConnection
      .get(`/rating/${idReview}?isAgree=0`)
      .then((rate) => {
        if (rate.data && rate.data.id_review === idReview) {
          setIsDisagree(true);
        } else {
          setIsDisagree(false);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getWhoAgrees();
    getWhoDisAgrees();
  }, [agreesNbr]);

  useEffect(() => {
    checkIfAgree();
    checkIfDisagree();
  }, [agreesNbr]);

  return (
    <div className="flex items-center gap-7">
      <div className="flex items-center gap-2">
        {!isAgree ? (
          <button type="button" onClick={handleAgreed}>
            <RiHeartLine className="text-xl text-[#6A8D92]" />
          </button>
        ) : (
          <button type="button" onClick={handleAgreed}>
            <RiHeartFill className="text-xl text-[#6A8D92]" />
          </button>
        )}
        <p>{agreesNbr}</p>
      </div>
      <div className="flex items-center gap-2">
        {!isDisagree ? (
          <button type="button" onClick={handleDisagreed}>
            <RiDislikeLine className="text-xl text-[#6A8D92]" />
          </button>
        ) : (
          <button type="button" onClick={handleDisagreed}>
            <RiDislikeFill className="text-xl text-[#6A8D92]" />
          </button>
        )}
        <p>{disagreesNbr}</p>
      </div>
    </div>
  );
}

export default ButtonIsAgreeTemplate;
