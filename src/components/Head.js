import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toogleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search);

  useEffect(() => {
    //API call
    console.log(searchQuery);

    //make an api call after every key press
    //but if the difference between 2 api calls is <200ms then decline the api call.

    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setShowSuggestions(searchQuery);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    //this is getting called when component is getting unmounted
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  /**
   * key - i
   * - render the component
   * - useEffect();
   * - start timer => make api call after 200ms
   *
   * key - ip
   * - render the component
   * - useEffect()
   * - start timer => make api call after 200ms
   *
   *
   */
  const dispatch = useDispatch();

  const getSearchSuggestions = async () => {
    const searchSuggestions = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await searchSuggestions.json();
    //console.log(json[1]);
    setSuggestions(json[1]);
    dispatch(cacheResults({
      [searchQuery] :json[1]
    }));
  };
  const toogleMenuHandler = () => {
    dispatch(toogleMenu());
  };
  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex justify-start col-span-1">
        <img
          onClick={() => toogleMenuHandler()}
          className="h-6 mx-2 cursor-pointer"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII="
          alt="menu"
        />

        <img
          className="h-6 cursor-pointer"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
          alt=""
        />
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input placeholder="Search"
            className="w-1/2 border border-gray-400 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border border-grey-400 rounded-r-full p-2">
            Search
          </button>
          {showSuggestions && (
            <div className="absolute bg-white py-2 px-2 w-[33rem] shadow-lg rounded-lg border border-gray-100">
              <ul>
                {suggestions.map((s) => (
                      <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100 cursor-pointer">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-1">
        <img
          className="h-7"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Head;
