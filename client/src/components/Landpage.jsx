import React from "react";
import { Light, Code_Icon, Chat, Frds, Hand, More } from "../assets/assets.js";
import { useNavigate } from "@tanstack/react-router";

const Landpage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full md:flex md:items-center  justify-center sm:justify-start">
      {/* left section */}
      <section className="sm:w-1/2 w-full  md:ml-20 border  px-10 md:px-0  pt-25  pb-7 sm:py-0">
        <div className="w-full ">
          <h1 className=" text-5xl  sm:text-7xl text-white text-shadow-white my-5 ">
            ChatBuff
          </h1>
          <p className="text-white opacity-90 text-shadow-white text-xl ">
            Enjoy flawless chat with your buddies
          </p>
        </div>
        <p className="text-neutral-500  my-6 ">
          A chat app powered by Ychatt with the powerof seamless Experience
          messages !<span className="text-white"> just have a Trail run </span>
        </p>

        <div className=" flex gap-6 mt-8">
          <button className=" flex justify-center items-center gap-3 text-white py-2 px-10 rounded-full cursor-pointer border border-white bg-transparent  duration-150 transition-all hover:border-green-400 hover:text-green-500">
            Login With Google
          </button>
          <button
            onClick={() => {
              navigate({ to: "/register" });
              console.log("oops");
            }}
            className="bg-white flex justify-center items-center gap-3 text-black py-2 px-10 rounded-full cursor-pointer border border-white hover:bg-transparent hover:text-white duration-200 transition-all"
          >
            Register
            <img src={Code_Icon} className="w-7" />
          </button>
        </div>
      </section>
      {/* right section */}
      <section className="md:w-1/3 w-full md:absolute md:right-3 md:bottom-14 flex justify-center  bg-black">
        <img src={Chat} className="bg-cover w-[70%] sm:w-full" />
      </section>
    </div>
  );
};

export default Landpage;
