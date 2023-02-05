/* eslint-disable react/prop-types */
import React from "react";

function CardCriteriaTemplate({ icon, criteria, score }) {
  return (
    <div className="countainerCriteria">
      {icon}
      <h3 className="text-sm">{criteria}</h3>
      <h3 className="text-2xl">{score}</h3>
    </div>
  );
}

export default CardCriteriaTemplate;
