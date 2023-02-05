/* eslint-disable react/prop-types */
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
import ButtonTemplate from "@components/ButtonTemplate";
import CardCriteriaTemplate from "@components/CardCriteriaTemplate";

function Modal({ setDisplayModal, confirmPost, review }) {
  const handleButtonCancel = () => {
    setDisplayModal(false);
  };

  return (
    <div>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex flex-col items-center w-full py-10 px-2">
          <div className="overflow-hidden rounded-lg bg-white shadow-xl transition-all max-w-lg">
            <div className="flex flex-col items-center p-4">
              <h3
                className="text-lg font-medium leading-6 text-gray-900"
                id="modal-title"
              >
                Hey mate! Here's the recap of your review
              </h3>
              <div className="grid grid-cols-2 gap-4 py-6">
                <CardCriteriaTemplate
                  icon={<FaCloudSun className="iconInCountainer" />}
                  criteria="Whether"
                  score={review.weather}
                />
                <CardCriteriaTemplate
                  icon={<FaShieldAlt className="iconInCountainer" />}
                  criteria="Security"
                  score={review.security}
                />
                <CardCriteriaTemplate
                  icon={<FaCoins className="iconInCountainer" />}
                  criteria="Cost of Living"
                  score={review.cost_of_living}
                />
                <CardCriteriaTemplate
                  icon={<FaTree className="iconInCountainer" />}
                  criteria="Environement"
                  score={review.environement}
                />
                <CardCriteriaTemplate
                  icon={<FaTrain className="iconInCountainer" />}
                  criteria="Public Transportation"
                  score={review.public_transportation}
                />
                <CardCriteriaTemplate
                  icon={<FaShoppingBag className="iconInCountainer" />}
                  criteria="Shops Facilities"
                  score={review.shops}
                />
                <CardCriteriaTemplate
                  icon={<FaSnowboarding className="iconInCountainer" />}
                  criteria="Activities"
                  score={review.activities}
                />
                <CardCriteriaTemplate
                  icon={<FaGlassMartiniAlt className="iconInCountainer" />}
                  criteria="Nightlife"
                  score={review.nightlife}
                />
              </div>
              <div className="mb-2 text-center">
                <p>Your comment:</p>
                <p>{review.comment}</p>
              </div>
              <div className="mt-2">
                <p className="text-md text-gray-500 text-center">
                  Are you sure you want to post this review?
                </p>
              </div>
            </div>
            <div className="flex justify-around space-x-8 pt-5 pb-5">
              <ButtonTemplate
                buttonType="button"
                buttonText="Nope"
                class="close"
                buttonStyle="buttonStyle"
                methodOnClick={handleButtonCancel}
              />
              <ButtonTemplate
                buttonType="button"
                buttonText="Sure!"
                buttonStyle="buttonStyle"
                methodOnClick={confirmPost}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
