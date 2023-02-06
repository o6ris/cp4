import React from "react";

function GobackButtonTemplate() {
  return (
    <div className="absolute z-20">
      <button
        className="fixed bottom-[135px] right-0 bg-secondary font-semibold p-4 text-primary opacity-95 rounded-l-full"
        type="button"
      >
        Go back
      </button>
    </div>
  );
}

export default GobackButtonTemplate;
