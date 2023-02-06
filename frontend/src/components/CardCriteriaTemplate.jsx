/* eslint-disable react/prop-types */
import React from "react";

function CardCriteriaTemplate({ icon, criteria, score }) {
  return (
    <div className="countainerCriteria">
      {icon}
      <h3 className="text-sm font-semibold">{criteria}</h3>
      <h3 className="text-2xl text-[#6A8D92] font-bold">{score}</h3>
    </div>
  );
}

export default CardCriteriaTemplate;
