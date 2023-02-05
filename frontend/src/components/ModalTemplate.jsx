/* eslint-disable react/prop-types */
import ButtonTemplate from "@components/ButtonTemplate";

function Modal({ setDisplayModal, confirmPost }) {
  const handleButtonCancel = () => {
    setDisplayModal(false);
  };

  return (
    <div>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex flex-col items-center w-full pt-20 gap-y-7">
          <div className="overflow-hidden rounded-lg bg-white shadow-xl transition-all max-w-lg">
            <div className="px-4 pt-5 pb-4">
              <div className="mt-3 text-center ml-4 sm:text-left">
                <h3
                  className="text-lg font-medium leading-6 text-gray-900"
                  id="modal-title"
                >
                  Hey mate!
                </h3>
                <div className="mt-2">
                  <p className="text-md text-gray-500">
                    Are you sure you want to post this review?
                  </p>
                </div>
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
