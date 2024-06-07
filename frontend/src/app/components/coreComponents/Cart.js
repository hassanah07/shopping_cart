"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartData } from "@/redux/slice/CartSlice";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

const CartComponent = () => {
  const [user, setUser] = useState();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const status = useSelector((state) => state.cart.status);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setUser(token);
  }, []);

  useEffect(() => {
    if (status === "idle") {
      dispatch(cartData());
    }
  }, [status, dispatch]);

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  // if (status === "failed") {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div className="fixed flex right-7 bottom-5 z-50 text-red-200 font-bold">
      {user && (
        <>
          <Link href="/cart">
            <div className="flex relative">
              <FaShoppingCart className="text-5xl" />
              <span className="absolute top-2 right-[12px] text-black font-extrabold">
                {cart.cart?.length}
              </span>
            </div>
          </Link>
        </>
      )}
      {!user && (
        <Link href="/login">
          <div className="flex relative">
            <FaShoppingCart className="text-5xl" />
            <span className="absolute top-2 right-[12px] text-black font-extrabold">
              0
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default CartComponent;
