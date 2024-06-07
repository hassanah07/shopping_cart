import React from "react";
import { gridProductImageLinks } from "../api/GrindApi";
import Link from "next/link";

const HomeGrid = () => {
  return (
    <section className="text-gray-400 body-font bg-gray-900">
      <div className="container px-5 py-12 mx-auto w-full md:w-[90%]">
        <div className="flex flex-wrap -m-4">
          {gridProductImageLinks.map((item, index) => {
            return (
              <div className="xl:w-1/4 md:w-1/4 w-1/2 p-4" key={index}>
                <Link href={`/${item.link}`}>
                  <div className="border border-gray-700 border-opacity-75 p-6 rounded-lg">
                    <img
                      src={`${item.image}.png`}
                      alt={item.title}
                      className="h-80 w-full"
                    />

                    <h2 className="text-lg text-white font-medium title-font mb-2 text-center capitalize">
                      {item.title}
                    </h2>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeGrid;
