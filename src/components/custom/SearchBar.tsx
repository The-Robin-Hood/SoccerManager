import { useRef, useState } from "react";

import { Button } from "@components/common/Button";
import { FontAwesomeIcon, faClose, faMagnifyingGlass } from "@components/common/Icons";

const SearchBar = ({ searchText, setSearchText }: { searchText: string; setSearchText: (text: string) => void }) => {
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
    if (e.key === "Escape" || (e.key === "Backspace" && inputRef.current!.value.length <= 1)) {
      handleCancelSearch();
    }
  };

  return (
    <div
      className='group flex w-60 items-center justify-center gap-2 rounded-lg bg-background px-4 py-3 outline outline-1 outline-outline'
      onClick={() => inputRef.current?.focus()}>
      <FontAwesomeIcon icon={faMagnifyingGlass} className='text-sm text-[#999999]' />
      <input
        id='search'
        ref={inputRef}
        className='w-full border-none bg-background text-sm text-[#999999] placeholder-[#999999] outline-none'
        type='text'
        placeholder='Find Player'
        defaultValue={searchText}
        onKeyDown={handleKeyStrokes}
      />
      {!search ? (
        <Button variant='link' className='h-fit p-0' onClick={handleSearch}>
          Search
        </Button>
      ) : (
        <FontAwesomeIcon
          icon={faClose}
          className='cursor-pointer text-sm text-[#999999]'
          onClick={handleCancelSearch}
        />
      )}
    </div>
  );
};
export default SearchBar;
