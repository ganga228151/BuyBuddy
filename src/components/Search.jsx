import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaSearch } from "react-icons/fa";
import { WiMoonAltWaningCrescent6 } from "react-icons/wi";
import { MdWbSunny } from "react-icons/md";
import { SearchContext } from "../context/SearchContext";

export const Search = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  return (
    <>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setTheme(theme == "light" ? "dark" : "light")}
          className="cursor-pointer"
        >
          {theme == "light" ? (
            <WiMoonAltWaningCrescent6 size={28} />
          ) : (
            <MdWbSunny size={28} />
          )}
        </button>

        <form
          className="flex gap-2 items-center justify-center bg-gray-100 border-2 border-gray-300 rounded px-3 py-2"
          // onSubmit={handleSubmit}
        >
          <button className="text-gray-500" type="submit">
            <FaSearch />
          </button>
          <input
            type="text"
            placeholder="Search here..."
            className="outline-none bg-transparent text-gray-700 placeholder-gray-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
    </>
  );
};
