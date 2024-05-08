"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaTrashAlt,
  FaCaretSquareLeft,
  FaCaretSquareRight
} from "react-icons/fa";
import { deleteItem, increaseQty, reduceQty } from "@/redux/slice/CartSlice";

const Cart = () => {
  const cartData = useSelector((data) => data.cart.cart);
  const dispatch = useDispatch();

  const handleQtyReduce = (id) => {
    dispatch(reduceQty(id));
  };

  const handleQtyIncrease = (id) => {
    dispatch(increaseQty(id));
  };
  const handleItemdelete = (id) => {
    dispatch(deleteItem(id));
  };

  // Calculate total price
  const totalPrice = cartData.reduce((total, item) => {
    return total + item.qty * Math.round(item.data.price);
  }, 0);

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden bg-gradient-to-r from-emerald-400 from-5% via-teal-400 to-teal-200 min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-100">
            {cartData.map((elem, index) => {
              return (
                <div
                  className="py-8 flex flex-wrap md:flex-nowrap backdrop-blur-xl border-spacing-2 rounded"
                  key={index}
                >
                  <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <span className="font-semibold title-font text-gray-700 capitalize">
                      {elem.data.category}
                    </span>
                    <img
                      src={elem.data.image}
                      alt="ProductImage"
                      className="w-[50px]"
                    />
                    {elem.data.category}
                  </div>
                  <div className="md:flex-grow">
                    <h2 className="text-lg caption-top font-semibold text-red-800 title-font mb-2">
                      {elem.data.title}
                    </h2>
                    <p className="leading-relaxed flex justify-around">
                      <p className="w-1/4">
                        <div className="flex">
                          Qty:
                          <button onClick={() => handleQtyReduce(elem.data.id)}>
                            <FaCaretSquareLeft className="text-red-500 text-xl" />
                          </button>
                          <p className="mx-2">{elem.qty}</p>
                          <button
                            onClick={() => {
                              handleQtyIncrease(elem.data.id);
                            }}
                          >
                            <FaCaretSquareRight className="text-red-500 text-xl" />
                          </button>
                        </div>
                      </p>
                      <p className="w-1/4">
                        MRP: <strike>{elem.data.price}</strike>
                      </p>
                      <p className="w-1/4 flex text-sm font-semibold">
                        Price:{" "}
                        <u className="text-red-500">
                          {elem.qty * Math.round(elem.data.price)}
                        </u>
                      </p>
                    </p>
                    <div className="remBtn mt-10 relative">
                      <button className="absolute right-0 bottom-0">
                        <FaTrashAlt
                          className="text-red-500 text-2xl"
                          onClick={() => {
                            handleItemdelete(elem.data.id);
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Display total price */}
            <div className="py-4 text-right">
              <p className="text-lg font-semibold">
                Total Price:{" "}
                <span className="text-red-500">{Math.round(totalPrice)}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
