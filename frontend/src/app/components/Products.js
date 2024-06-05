import Image from "next/image";
import React from "react";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";

const Products = async () => {
  let response = await fetch("https://fakestoreapi.com/products");
  response = await response.json();

  return (
    <>
      <section className="text-gray-600 body-font bg-gradient-to-r from-emerald-400 from-5% via-teal-400 to-teal-200">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 text-black dark:text-slate-300 h-[100%]">
            {Object.keys(response).map((elem, index) => {
              return (
                <div
                  // href={`/productView/${response[elem].id}`}
                  className="xl:w-1/5 lg:w-1/4 md:w-1/3 p-4"
                  key={index}
                >
                  <div className="border border-gray-200 p-6 rounded-lg backdrop-blur-3xl z-10 shadow-2xl shadow-purple-400">
                    <h2 className="font-semibold title-font mb-2 text-slate-700 h-16">
                      {response[elem].title.slice(0, 40)}...
                    </h2>
                    <p className="leading-relaxed text-base flex">
                      <img
                        src={response[elem].image}
                        alt={response[elem].title}
                        className="h-[200px] items-center"
                      />
                    </p>
                    <div className="py-3">
                      <p className="leading-relaxed font-semibold text-slate-500">
                        MRP: <strike>₹{response[elem].price}</strike>
                      </p>
                      <p className="leading-relaxed font-semibold text-slate-500">
                        Price: ₹{response[elem].price}
                      </p>
                    </div>
                    <AddToCartButton product={response[elem]} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
