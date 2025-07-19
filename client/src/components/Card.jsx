import React from "react";

const Card = ({
  image = "https://placehold.co/100",
  online = true,
  name = "unknown ",
  onClick = () => {
    console.log("hi");
  },
}) => {
  console.log(image, online, name);

  return (
    <div
      className="w-full flex px-4 py-3 hover:bg-neutral-900  hover:rounded-2xl cursor-pointer"
      onClick={onClick}
    >
      <img src={image} className="w-14 h-14 rounded-full object-cover" />
      <div className="flex flex-col ml-6">
        <h5 className="text-white text-[18px]">{name}</h5>
        <span
          className={`text-sm ${online ? "text-green-500" : "text-gray-500"}`}
        >
          {online ? "online" : "offline"}
        </span>
      </div>
    </div>
  );
};

export default Card;
