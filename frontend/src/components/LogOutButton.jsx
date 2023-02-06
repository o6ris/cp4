import React from "react";
import { FaPowerOff } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
function LogOutButton({ handleLogOut }) {
  return (
    <button
      onClick={handleLogOut}
      type="button"
      className="absolute z-20 right-5 top-5 text-xl"
    >
      <FaPowerOff />
    </button>
  );
}

export default LogOutButton;
