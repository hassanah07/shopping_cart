"use client";
import { addToCart, cartData } from "@/redux/slice/CartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import CartCount from "./CartCount";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddToCartButton = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toastOptions = {
    theme: "dark",
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  };
  const cartButton = async (e) => {
    e.preventDefault();
    const data = {
      productId: product.id,
      product: product,
      price: product.price
    };
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/products/addToCart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("userToken")
        },
        body: JSON.stringify(data)
      }
    );
    res = await res.json();
    console.log(res);
    if (res.status === true) {
      dispatch(cartData());
      toast.success(res.msg, toastOptions);
    }
  };
  const viewProduct = () => {
    router.push(`/productView/${product.id}`);
  };
  const [user, setUser] = useState();
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setUser(token);
  }, []);

  return (
    <>
      <div className="py-3">
        <ToastContainer />

        {!user && (
          <>
            <button className="btn bg-red-500 text-slate-700 font-semibold px-2 py-2 w-full my-2 hover:bg-red-700">
              <Link href="/login">Add To Cart</Link>
            </button>
          </>
        )}
        {user && (
          <>
            <button
              className="btn bg-red-500 text-slate-700 font-semibold px-2 py-2 w-full my-2 hover:bg-red-700"
              onClick={cartButton}
            >
              Add To Cart
            </button>
            {/* <button
              className="btn bg-yellow-500 hover:bg-yellow-700 text-slate-500 font-semibold px-2 py-2 w-full my-2"
              onClick={viewProduct}
            >
              View Product
            </button> */}
          </>
        )}
      </div>
    </>
  );
};

export default AddToCartButton;
