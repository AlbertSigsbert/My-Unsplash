import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { useSearchContext } from "../../hooks/useSearchContext";
function Search(props) {
  const [searchQuery, setSearchQuery] = useState("");

  const { dispatch } = useSearchContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_QUERY", payload: searchQuery.toLowerCase() });
    setSearchQuery("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-4">
          <HiSearch className="fill-[#BDBDBD] h-5 w-5" />
        </span>
        <input
          className="placeholder:text-[#BDBDBD] placeholder:font-medium placeholder:leading-5 block bg-white shadow-custom w-[300px] md:w-96 h-[55px] border border-[#BDBDBD] rounded-xl py-2 pl-12 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Search by label"
          type="text"
          name="search"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </div>
    </form>
  );
}

export default Search;
