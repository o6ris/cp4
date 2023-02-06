/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
/* 
data : les données qu'on reçoit
textPlaceholder : infos à mettre dans les placeholder des inputs
textButton : texte à mettre dans le bouton
searchBarContainer : la classe CSS qu'on attribue à la searchBar
customWidth : la classe CSS qui gère la largeur des input
methodOnClick : les fonctions associées aux boutons qu'on reçoit en props
*/
function SearchBar({
  data,
  textPlaceholder,
  textButton,
  searchBarContainer,
  customWidth,
  methodOnClick,
}) {
  const ref = useRef();
  const [displayData, setDisplayData] = useState(false);
  const [searchData, setSearchData] = useState("");

  // useEffect qui gère la fermeture du menu quand on clique à l'exterieur du menu
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // Si le menu est ouvert et qu'on clique à l'ext du menu, il se ferme
      if (displayData && ref.current && !ref.current.contains(e.target)) {
        setDisplayData(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Retire l'eventListsenner
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [displayData]);

  const handleDisplayData = () => {
    if (searchData.length > 0) {
      setSearchData("");
    }
    setDisplayData(!displayData);
  };

  // eslint-disable-next-line no-shadow
  const updateSearchBar = (data) => {
    setSearchData(data.name);
    methodOnClick(data);
    setDisplayData(false);
  };

  return (
    <div className={searchBarContainer} ref={ref}>
      <label className={`cstm_styleInput ${customWidth} relative`}>
        <input
          onChange={(e) => setSearchData(e.target.value)}
          className="focus:outline-none"
          type="text"
          placeholder={textPlaceholder}
          value={searchData.toLowerCase()}
        />
        <button
          onClick={handleDisplayData}
          className={`buttonStyle absolute right-1 bottom-1 ${
            displayData && "focus:bg-secondary focus:text-primary"
          }`}
          type="button"
        >
          {textButton}
        </button>
      </label>
      {(displayData || searchData.length > 0) && (
        <div
          className={`${customWidth} bg-secondary rounded-md absolute z-10 top-12 overflow-y-auto h-96`}
        >
          <ul className="flex flex-col">
            {data
              .filter((myData) =>
                myData.name.toLowerCase().startsWith(searchData)
              )
              .map((myData) => (
                <button
                  onClick={() => updateSearchBar(myData)}
                  type="button"
                  key={myData.id}
                  className="text-white text-base self-start py-3 pl-5 hover:text-primary hover:font-semibold hover:bg-white hover:bg-opacity-5 w-full flex"
                >
                  {myData.name}
                </button>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
