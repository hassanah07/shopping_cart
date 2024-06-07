import React from "react";
import { GiNightSleep } from "react-icons/gi";
import { BsSun } from "react-icons/bs";
import "./title/name.css";
import Link from "next/link";

const Title = () => {
  return (
    <nav className="py-4 flex">
      <Link href="/">
        <span className="text-3xl text-pink-800 font-extrabold">Beki</span>
        <span className="text-3xl text-pink-800 font-extrabold">Basket</span>
      </Link>
      <span className="font-extrabold text-pink-600 text-2xl shadow-2xl mx-3">
        <label class="switch relative">
          <input type="checkbox" />
          <span class="slider round"></span>
          <GiNightSleep className="absolute left-[4px] top-[6px] text-2xl text-black" />
          <BsSun className="absolute right-[5px] top-[6px] text-2xl text-black" />
        </label>
      </span>
    </nav>
  );
};

export default Title;
