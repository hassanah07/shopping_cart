"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaTrashAlt,
  FaCaretSquareLeft,
  FaCaretSquareRight
} from "react-icons/fa";
import { cartData } from "@/redux/slice/CartSlice";
// import {
//   deleteItem,
//   increaseQty,
//   reduceQty,
//   CartSlice
// } from "@/redux/slice/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const [update, setUpdate] = useState(0);
  const cartDataItems = async (e) => {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/products/findCart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("userToken")
        }
      }
    );
    res = await res.json();
    setCart(res.cart);
    // console.log(res.cart);
  };
  const cartIncrement = async (cartId) => {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/products/itemIncrement`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("userToken")
        },
        body: JSON.stringify({ id: cartId })
      }
    );
    res = await res.json();
    setUpdate(Math.round(Math.random() * 21215555855));
  };
  const cartDecrement = async (cartId) => {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/products/itemDecrement`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("userToken")
        },
        body: JSON.stringify({ id: cartId })
      }
    );
    res = await res.json();
    setUpdate(Math.round(Math.random() * 56546451548));
    // if (res.status === true) {
    //   dispatch(cartData());
    // }
  };
  const cartDelete = async (cartId) => {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/products/itemDelete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("userToken")
        },
        body: JSON.stringify({ id: cartId })
      }
    );
    res = await res.json();
    setUpdate(Math.round(Math.random() * 564864522500));
    // if (res.status === true) {
    //   dispatch(cartData());
    // }
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    return total + item.qty * Math.round(item.price);
  }, 0);

  useEffect(() => {
    cartDataItems();
    dispatch(cartData());
  }, [update]);

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden bg-gradient-to-r from-emerald-400 from-5% via-teal-400 to-teal-200 min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-100">
            {cart.length === 0 && (
              <h1 className="text-center text-3xl py-32">
                Add a Product to make your cart Beautiful
              </h1>
            )}
            {cart.length >= 1 &&
              cart.map((item, index) => {
                return (
                  <div
                    className="py-2 flex flex-wrap md:flex-nowrap backdrop-blur-xl border-spacing-2 rounded"
                    key={index}
                  >
                    <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                      <span className="font-semibold title-font text-gray-700 capitalize">
                        {item.product[0].category}
                      </span>
                      <img
                        src={item.product[0].image}
                        alt="ProductImage"
                        className="w-[50px]"
                      />
                      {item.category}
                    </div>
                    <div className="md:flex-grow">
                      <h2 className="text-lg caption-top font-semibold text-red-800 title-font mb-2">
                        {item.product[0].title}
                      </h2>
                      <p className="leading-relaxed flex justify-around">
                        <p className="w-1/4">
                          <div className="flex">
                            Qty:
                            {item.qty <= 1 ? (
                              <button className="cursor-not-allowed">
                                <FaCaretSquareLeft className="text-red-400 text-xl" />
                              </button>
                            ) : (
                              <button onClick={() => cartDecrement(item._id)}>
                                <FaCaretSquareLeft className="text-red-500 text-xl" />
                              </button>
                            )}
                            <p className="mx-2">{item.qty}</p>
                            <button
                              onClick={() => {
                                cartIncrement(item._id);
                              }}
                            >
                              <FaCaretSquareRight className="text-red-500 text-xl" />
                            </button>
                          </div>
                        </p>
                        <p className="w-1/4">
                          MRP: <strike>{item.price}</strike>
                        </p>
                        <p className="w-1/4 flex text-sm font-semibold">
                          Price:{" "}
                          <u className="text-red-500">
                            {item.qty * Math.round(item.price)}
                          </u>
                        </p>
                      </p>
                      <div className="remBtn mt-10 relative">
                        <button className="absolute right-0 bottom-0">
                          <FaTrashAlt
                            className="text-red-500 text-2xl"
                            onClick={() => {
                              cartDelete(item._id);
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            <div className="min-h-full py-4 text-right">
              <p className="text-lg font-semibold">
                Total Price:
                <span className="text-red-500">{totalPrice}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
