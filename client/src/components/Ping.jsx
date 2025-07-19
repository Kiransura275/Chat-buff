import React from "react";

const Ping = ({ message, send }) => {
  return (
    <div
      className={`rounded-4xl  text-white text-[17px] w-fit px-5 max-w-[70%] py-1.5 ${!send ? "self-start  opacity-50 bg-black" : "self-end bg-green-500"}`}
    >
      {message}
    </div>
  );
};

export default Ping;
