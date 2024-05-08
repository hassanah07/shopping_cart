"use client";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";

const NavBar = () => {
  const cartData = useSelector((data) => data.cart.cart);
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center backdrop-blur-lg fixed z-40">
          <h1 className="text-red-700 hover:text-slate-900 font-semibold text-lg">
            GroupShopper
          </h1>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link
              href="/"
              className="mr-5 text-red-700 hover:text-slate-900 capitalize font-semibold"
            >
              🏠Home
            </Link>
            <Link
              href="/ladies"
              className="mr-5 text-red-700 hover:text-slate-900 capitalize font-semibold"
            >
              💃ladies section
            </Link>
            <Link
              href="/gents"
              className="mr-5 text-red-700 hover:text-slate-900 capitalize font-semibold"
            >
              🤵Men's Section
            </Link>
            <Link
              href="/leds"
              className="mr-5 text-red-700 hover:text-slate-900 capitalize font-semibold"
            >
              🔦Led Lights
            </Link>
            <Link
              href="/electronics"
              className="mr-5 text-red-700 hover:text-slate-900 capitalize font-semibold"
            >
              📱Electronics
            </Link>
          </nav>
          <button className="w-14">
            <Link
              href="/cart"
              className="w-full h-fit text-red-700 hover:text-slate-900 capitalize"
            >
              <div className="flex relative">
                <span>
                  <FaCartPlus className="font-semibold text-red-600 text-2xl" />
                </span>
                <span className="absolute top-0 right-0 font-semibold text-sm text-red-500 bg-white rounded-full px-2 py-1">
                  {cartData.length}
                </span>
              </div>
            </Link>
          </button>
        </div>
      </header>
    </>
  );
};

export default NavBar;
