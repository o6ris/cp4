import React, { useContext } from "react";
import SearchBar from "@components/SearchbarTemplate";

import User from "../contexts/UserContext";

function SearchCity() {
  const { user } = useContext(User.UserContext);
  // const [cities, setCities] = useState([]);
  return (
    <div className="w-full flex flex-col gap-5 items-center mt-20">
      <p>Hello {user.alias}!</p>
      <SearchBar
        // reset={reset}
        // data={myCategories}
        customWidth="inputStyle"
        searchBarContainer="flex flex-col items-center w-full relative"
        textPlaceholder="Find a City!"
        textButton="Show Cities"
        // methodOnClick={handleOneCategory}
      />
    </div>
  );
}

export default SearchCity;
