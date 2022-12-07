import { HiSearch } from "react-icons/hi";
function Search(props) {
  return (
    <label className="relative block mx-4">
      <span className="sr-only">Search</span>
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <HiSearch className="fill-[#BDBDBD] h-[17px] w-[17px]" />
      </span>
      <input
        className="placeholder:text-[#BDBDBD] placeholder:font-medium placeholder:leading-5 block bg-white shadow-custom w-[300px] h-[55px] border border-[#BDBDBD] rounded-xl py-2 pl-9 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="Search by name"
        type="text"
        name="search"
      />
    </label>
  );
}

export default Search;
