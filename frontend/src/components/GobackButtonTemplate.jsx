import React from "react";

// eslint-disable-next-line react/prop-types
function GobackButtonTemplate({ navigate }) {
  return (
    <div className="absolute z-20">
      <button
        onClick={navigate}
        className="fixed bottom-[135px] right-0 bg-secondary font-semibold p-4 text-primary opacity-95 rounded-l-full"
        type="button"
      >
        Go back
      </button>
    </div>
  );
}

export default GobackButtonTemplate;
