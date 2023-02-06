import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  FaCloudSun,
  FaSnowboarding,
  FaShieldAlt,
  FaCoins,
  FaTree,
  FaTrain,
  FaShoppingBag,
  FaGlassMartiniAlt,
} from "react-icons/fa";
import InputTemplate from "@components/InputTemplate";
import RangeInputTemplate from "@components/RangeInputTemplate";
import ButtonTemplate from "@components/ButtonTemplate";
import ModalTemplate from "@components/ModalTemplate";
import validateReview from "@services/reviewValidator";
import apiConnection from "@services/apiConnection";

import User from "../contexts/UserContext";

function PostReview() {
  const { id } = useParams();
  const { user } = useContext(User.UserContext);
  const [displayModal, setDisplayModal] = useState(false);
  const [city, setCity] = useState();
  const [avgScoresCity, setAvgScoresCity] = useState();
  const [review, setReview] = useState({
    id_city: id,
    id_user: user?.id,
    arrival_date: "",
    return_date: "",
    weather: 0,
    security: 0,
    cost_of_living: 0,
    environement: 0,
    public_transportation: 0,
    shops: 0,
    activities: 0,
    nightlife: 0,
    comment: "",
  });

  const notify = (msg) => {
    toast(msg);
  };

  const navigate = useNavigate();

  const handleInputOnChange = (place, value) => {
    const newreview = { ...review };
    newreview[place] = value;
    setReview(newreview);
  };

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

  const handleAddReview = () => {
    apiConnection
      .post(`/review`, {
        ...review,
      })
      .then(() => {
        notify("Review successfully posted!");
        setDisplayModal(false);
        setTimeout(() => navigate(`/OneCity/${id}`), 3000);
      })
      .catch((error) => console.error(error));
  };

  const handleCheckBeforePost = () => {
    const { status, errorMessage } = validateReview(review);
    if (status) {
      setDisplayModal(true);
    } else {
      notify(errorMessage);
    }
  };

  useEffect(() => {
    getCity(id);
    getAvgScoresByCity();
  }, []);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
              <div className="bg-white opacity-80 p-6 rounded-md">
                <h2 className="text-2xl font-bold">
                  {avgScoresCity.avgTotalScore}
                  <span className="text-xs font-normal">/10</span>
                </h2>
              </div>
              <h1 className="text-2xl text-white text-center text-shadow">
                {city.name} awaits your review!
              </h1>
            </div>

            {/* FORMULAIRE */}
            <form className="flex flex-col items-center justify-center w-full gap-5 py-6">
              {/* DATES */}
              <div className="flex flex-col items-center gap-1 w-full">
                <h3 className="w-11/12 ml-5">Arrival Date</h3>
                <InputTemplate
                  customWidth="inputStyle"
                  inputType="date"
                  methodOnChange={handleInputOnChange}
                  name="arrival_date"
                />
              </div>
              <div className="flex flex-col items-center gap-1 w-full">
                <h3 className="w-11/12 ml-5">Departure Date</h3>
                <InputTemplate
                  customWidth="inputStyle"
                  inputType="date"
                  methodOnChange={handleInputOnChange}
                  name="return_date"
                />
              </div>

              {/* CRITERIAS */}
              <div className="flex flex-col items-center gap-7 mt-5">
                {/* ALL SLIDERS */}
                <RangeInputTemplate
                  methodOnChange={handleInputOnChange}
                  score={review.weather}
                  name="weather"
                  idCriteria="weather"
                  criteria="Weather"
                  icon={<FaCloudSun className="iconColor text-xl" />}
                  tip="0 for a bad weather, 10 for a wonderful weather"
                />
                <RangeInputTemplate
                  methodOnChange={handleInputOnChange}
                  score={review.activities}
                  name="activities"
                  idCriteria="activities"
                  criteria="Activities"
                  icon={<FaSnowboarding className="iconColor text-xl" />}
                  tip="0 for few activities, 10 for many activities"
                />
                <RangeInputTemplate
                  methodOnChange={handleInputOnChange}
                  score={review.security}
                  name="security"
                  idCriteria="security"
                  criteria="Security"
                  icon={<FaShieldAlt className="iconColor text-xl" />}
                  tip="0 for unsafe, 10 for very safe"
                />
                <RangeInputTemplate
                  methodOnChange={handleInputOnChange}
                  score={review.cost_of_living}
                  name="cost_of_living"
                  idCriteria="cost_of_living"
                  criteria="Cost of Living"
                  icon={<FaCoins className="iconColor text-xl" />}
                  tip="0 for very expensive life, 10 for cheap life"
                />
                <RangeInputTemplate
                  methodOnChange={handleInputOnChange}
                  score={review.environement}
                  name="environement"
                  idCriteria="environement"
                  criteria="Environement"
                  icon={<FaTree className="iconColor text-xl" />}
                  tip="0 for poor environment, 10 for beautiful environment"
                />
                <RangeInputTemplate
                  methodOnChange={handleInputOnChange}
                  score={review.public_transportation}
                  name="public_transportation"
                  idCriteria="public_transportation"
                  criteria="Public transportation"
                  icon={<FaTrain className="iconColor text-xl" />}
                  tip="0 for a crappy transport network, 10 for a great one"
                />
                <RangeInputTemplate
                  methodOnChange={handleInputOnChange}
                  score={review.shops}
                  name="shops"
                  idCriteria="shops"
                  criteria="Shopping facilities"
                  icon={<FaShoppingBag className="iconColor text-xl" />}
                  tip="0 for very little shops and 10 for a lot"
                />
                <RangeInputTemplate
                  methodOnChange={handleInputOnChange}
                  score={review.nightlife}
                  name="nightlife"
                  idCriteria="nightlife"
                  criteria="Nightlife"
                  icon={<FaGlassMartiniAlt className="iconColor text-xl" />}
                  tip="0 if it sucked and 10 if you can had fun all night"
                />
              </div>

              {/* COMMENT */}
              <hr className="w-6/12 bg-gray-300" />
              <p className="w-9/12 text-center">
                For the next step, detail your pros and cons about your
                destination. Please be as precise and honest as possible, your
                opinion will interest everyone!
              </p>
              <div className="flex flex-col items-center w-full">
                <textarea
                  onChange={(e) =>
                    handleInputOnChange(e.target.name, e.target.value)
                  }
                  className="inputStyle"
                  name="comment"
                  rows="7"
                />
                <p className="text-xs">
                  Your comment must contain 80 to 1000 characters
                </p>
              </div>

              {/* SUBMIT FORM */}
              <ButtonTemplate
                buttonType="button"
                buttonText="Add Review"
                buttonStyle="buttonStyle"
                methodOnClick={handleCheckBeforePost}
              />
              {displayModal && (
                <ModalTemplate
                  setDisplayModal={setDisplayModal}
                  confirmPost={handleAddReview}
                  review={review}
                />
              )}
            </form>
          </>
        )}
      </div>
    </>
  );
}

export default PostReview;
