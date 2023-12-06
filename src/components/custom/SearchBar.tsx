import { Button } from "@components/common/Button";
import {
  FontAwesomeIcon,
  faClose,
  faMagnifyingGlass,
} from "@components/common/Icons";
import { useRef, useState } from "react";

const SearchBar = ({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: (text: string) => void;
}) => {
  const [search, setSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (inputRef.current!.value === "") return;
    setSearchText(inputRef.current!.value);
    setSearch(true);
  };

  const handleCancelSearch = () => {
    setSearchText("");
    inputRef.current!.value = "";
    setSearch(false);
  };

  const handleKeyStrokes = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
    if (e.key === "Escape" || e.key === "Backspace" && inputRef.current!.value.length<=1) {
      handleCancelSearch();
    }
  };

  return (
    <div
      className="flex items-center justify-center bg-background outline outline-1 outline-outline rounded-lg w-60 px-4 py-3 gap-2 group"
      onClick={() => inputRef.current?.focus()}
    >
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="text-[#999999] text-sm"
      />
      <input
        id="search"
        ref={inputRef}
        className="w-full text-sm text-[#999999] placeholder-[#999999] border-none outline-none bg-background"
        type="text"
        placeholder="Find Player"
        defaultValue={searchText}
        onKeyDown={handleKeyStrokes}
      />
      {!search ? (
        <Button variant="link" className="p-0 h-fit" onClick={handleSearch}>
          Search
        </Button>
      ) : (
        <FontAwesomeIcon
          icon={faClose}
          className="text-[#999999] text-sm cursor-pointer"
          onClick={handleCancelSearch}
        />
      )}
    </div>
  );
};
export default SearchBar;
