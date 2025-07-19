import React from "react";
import { Search } from "../assets/assets";

const SearchBar = () => {
  return (
    <>
      <nav className="flex items-center justify-between px-6 py-7 ">
        <h3 className="text-white sm:text-3xl text-2xl ">ChatBuff</h3>
        <img src={Search} className="w-6 cursor-pointer" />
      </nav>

      <div className=" bg-neutral-900 mx-5 rounded-3xl ">
        <input
          type="text"
          placeholder="search"
          className=" text-neutral w-full outline-0 py-3 text-neutral-500 px-6 text-sm"
        />
      </div>
    </>
  );
};

export default SearchBar;
