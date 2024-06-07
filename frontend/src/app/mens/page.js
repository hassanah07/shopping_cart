import React from "react";
import Link from "next/link";
import CartComponent from "../components/coreComponents/Cart";
import AddToCartButton from "../components/AddToCartButton";


const MensPage = async () => {
  let res = await fetch("https://fakestoreapi.com/products");
  res = await res.json();
  return (
    <div>
      <CartComponent />
      <section className="text-gray-400 body-font bg-gray-900">
        <div className="container px-5 py-10 mx-auto w-[100%] md:w-[90%]">
          <div className="flex flex-wrap -m-4">
            {res.map((elem, index) => {
              return (
                <div className="w-[100%] xl:w-1/4 md:w-1/3 p-4" key={index}>
                  <div className="border border-gray-700 border-opacity-75 p-6 rounded-xl shadow-2xl hover:shadow-blue-700">
                    <Link href={`/productView/${elem.id}`} title={elem.title}>
                      <img
                        src={elem.image}
                        alt={elem.title}
                        className="h-[200px] items-center"
                      />
                      <h2 className="text-lg text-white font-medium title-font mb-2">
                        {elem.category}
                      </h2>
                      <p className="leading-relaxed text-base text-wrap h-16">
                        {elem.title.slice(0, 42)}
                      </p>
                      <p className="leading-relaxed text-base">
                        ₹{(Math.round(elem.price * 100 * 80) / 100).toFixed(2)}
                        {/* decimal place given as 2 */}
                      </p>
                    </Link>
                    <AddToCartButton product={elem} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MensPage;
