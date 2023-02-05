/* eslint-disable react/prop-types */
import React from "react";

function RangeInputTemplate({
  methodOnChange,
  criteria,
  icon,
  idCriteria,
  score,
  name,
  tip,
}) {
  /**
   * Cette fonction gère la couleur de fond de la barre du slider
   */
  const rangeInput = document.getElementById(idCriteria);
  rangeInput?.addEventListener("input", () => {
    const val = rangeInput.value;
    const percentage = val / 10;
    const color = `linear-gradient(to right, #d46a6a ${
      percentage * 100
    }%, grey ${percentage * 100}%)`;
    rangeInput.style.background = color;
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center ml-2">
        {icon}
        <h3 className="text-xl">{criteria}</h3>
      </div>
      <div className="w-full">
        <div className="flex relative w-[22rem] rounded-md overflow-hidden bg-gray-300 p-5 gap-4 items-center justify-between">
          <input
            onChange={(e) => methodOnChange(e.target.name, e.target.value)}
            name={name}
            type="range"
            min="0"
            max="10"
            value={score}
            className="w-10/12 custom-slider bg-red-500 rounded-sm"
            id={idCriteria}
          />
          <p className="text-3xl">{score}</p>
        </div>
        <p className="text-xs ml-1">{tip}</p>
      </div>
    </div>
  );
}

export default RangeInputTemplate;
