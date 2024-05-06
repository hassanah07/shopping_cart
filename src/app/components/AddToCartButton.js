"use client";
import { addToCart } from "@/redux/slice/CartSlice";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

const AddToCartButton = ({ product }) => {
  const dispatch = useDispatch();
  const cartButton = (e) => {
    dispatch(addToCart(product));
    console.log(product);
  };
  return (
    <>
      <div className="py-3">
        <button
          className="btn bg-red-500 font-semibold px-2 py-2 w-full my-2 hover:bg-red-700"
          onClick={cartButton}
        >
          Add To Cart
        </button>
        <button className="btn bg-yellow-500 hover:bg-yellow-700 text-slate-500 font-semibold px-2 py-2 w-full my-2">
          <Link href={`../cart/buyNow/${product.id}}`}>Buy Now</Link>
        </button>
      </div>
    </>
  );
};

export default AddToCartButton;
