"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartData } from "@/redux/slice/CartSlice";
import Link from "next/link";

const CartCount = () => {
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

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="fixed flex right-5 top-5 z-50 text-red-700 font-bold">
      {user && (
        <>
          <Link href="/profile">
            <span className="text-xl mx-6 rounded-[100%] bg-slate-700">🤵</span>
          </Link>
          <Link href="/cart">
            <div className="flex relative">
              <span className="text-xl">🛒</span>
              <span> ({cart.cart?.length})</span>
            </div>
          </Link>
        </>
      )}
      {!user && (
        <Link href="/login">
          <div className="flex relative">
            <span className="text-xl">🛒</span>
            <span> (0)</span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default CartCount;
