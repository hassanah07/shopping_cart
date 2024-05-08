"use client";
import { addToCart } from "@/redux/slice/CartSlice";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

const AddToCartButton = ({ product }) => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("userToken");
  const cartButton = async (e) => {
    dispatch(addToCart(product));
    // console.log(product);
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/products/addToCart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      }
    );
    res = await res.json();
    console.log(res);
  };
  return (
    <>
      <div className="py-3">
        {!user && (
          <>
            <button className="btn bg-red-500 font-semibold px-2 py-2 w-full my-2 hover:bg-red-700">
              <Link href="/login">Add To Cart</Link>
            </button>
            {/* <button className="btn bg-yellow-500 hover:bg-yellow-700 text-slate-500 font-semibold px-2 py-2 w-full my-2">
              <Link href="/login">Buy Now</Link>
            </button> */}
          </>
        )}
        {user && (
          <>
            <button
              className="btn bg-red-500 font-semibold px-2 py-2 w-full my-2 hover:bg-red-700"
              onClick={cartButton}
            >
              Add To Cart
            </button>
            <button className="btn bg-yellow-500 hover:bg-yellow-700 text-slate-500 font-semibold px-2 py-2 w-full my-2">
              <Link href={`../cart/buyNow/${product.id}}`}>Buy Now</Link>
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default AddToCartButton;
