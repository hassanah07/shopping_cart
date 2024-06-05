import React from "react";

const CartProduct = ({ elem }) => {
  //   console.log(elem);
  //   const qtyReduce = {};
  return (
    <div className="py-8 flex flex-wrap md:flex-nowrap" key={index}>
      <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
        <span className="font-semibold title-font text-gray-700 capitalize">
          {elem.data.category}
        </span>
        <img src={elem.data.image} alt="elemImage" className="w-[50px]" />
        {elem.data.category}
      </div>
      <div className="md:flex-grow">
        <h2 className="text-lg caption-top font-medium text-red-400 title-font mb-2">
          {elem.data.title}
        </h2>
        <p className="leading-relaxed flex justify-around">
          <p className="w-1/4">MRP:{elem.data.price}</p>
          <p className="w-1/4">Price:{elem.data.price}</p>
        </p>
        <div className="remBtn mt-10 relative">
          <button className="absolute right-0 bottom-0">
            <FaTrashAlt className="text-red-500 text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
