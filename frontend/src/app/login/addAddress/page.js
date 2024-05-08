"use client";
import React, { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Page = ({ params }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      redirect("/admin/dashboard");
    }
  }, []);

  const [address, setAddress] = useState({
    addressLineOne: "",
    landMark: "",
    town: "",
    area: "",
    postOffice: "",
    pinCode: "",
    addressId: Math.round(Math.random() * 20000000000)
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/users/addAddress`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("userToken")
        },
        body: JSON.stringify(address)
      }
    );
    response = await response.json();
    if (response.status === true) {
      router.push("/");
    }
  };

  return (
    <div className="text-black body-font bg-white dark:bg-black dark:text-white flex items-center justify-center min-h-screen">
      {/* <ToastContainer /> */}
      <section className="text-black body-font relative md:w-[70%]">
        <div className="container px-5 mx-auto my-8 md:w-[50%] shadow-2xl shadow-popover-foreground">
          <div className="flex flex-col text-center w-full">
            <h1 className="sm:text-xl text-lg font-medium title-font my-4 text-gray-900 dark:text-slate-100">
              Add Your Shipping Address
            </h1>
          </div>
          <hr />
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2 py-2">
              <div className="p-0 w-full">
                <div className="relative">
                  <label
                    htmlFor="addressLineOne"
                    className="leading-7 text-sm text-gray-600 dark:text-slate-100"
                  >
                    Address line 1
                  </label>
                  <input
                    type="text"
                    name="addressLineOne"
                    value={address.addressLineOne}
                    onChange={handleChange}
                    placeholder="Address line 1"
                    className="w-full bg-transparent border border-gray-300 focus:border-transparent focus:bg-transparent focus:ring-2 focus:ring-pink-400 text-base outline-none text-yellow-500 font-semibold py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    autoComplete="off"
                    autoSave="off"
                    aria-autocomplete="none"
                  />
                </div>
              </div>
              <div className="p-0 w-full">
                <div className="relative">
                  <label
                    htmlFor="landMark"
                    className="leading-7 text-sm text-gray-600 dark:text-slate-100"
                  >
                    Landmark
                  </label>
                  <input
                    type="text"
                    name="landMark"
                    value={address.landMark}
                    onChange={handleChange}
                    placeholder="Enter Landmark"
                    className="w-full bg-transparent border border-gray-300 focus:border-transparent focus:bg-transparent focus:ring-2 focus:ring-pink-400 text-base outline-none text-yellow-500 font-semibold py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    autoComplete="off"
                    autoSave="off"
                    aria-autocomplete="none"
                  />
                </div>
              </div>
              <div className="p-0 w-full">
                <div className="relative">
                  <label
                    htmlFor="landMark"
                    className="leading-7 text-sm text-gray-600 dark:text-slate-100"
                  >
                    Town/Village
                  </label>
                  <input
                    type="text"
                    name="town"
                    value={address.town}
                    onChange={handleChange}
                    placeholder="Enter Twon/Village"
                    className="w-full bg-transparent border border-gray-300 focus:border-transparent focus:bg-transparent focus:ring-2 focus:ring-pink-400 text-base outline-none text-yellow-500 font-semibold py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    autoComplete="off"
                    autoSave="off"
                    aria-autocomplete="none"
                  />
                </div>
              </div>
              <div className="p-0 w-full">
                <div className="relative">
                  <label
                    htmlFor="area"
                    className="leading-7 text-sm text-gray-600 dark:text-slate-100"
                  >
                    Area
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={address.area}
                    onChange={handleChange}
                    placeholder="Enter Your Area"
                    className="w-full bg-transparent border border-gray-300 focus:border-transparent focus:bg-transparent focus:ring-2 focus:ring-pink-400 text-base outline-none text-yellow-500 font-semibold py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    autoComplete="off"
                    autoSave="off"
                    aria-autocomplete="none"
                  />
                </div>
              </div>
              <div className="p-0 w-full">
                <div className="relative">
                  <label
                    htmlFor="postOffice"
                    className="leading-7 text-sm text-gray-600 dark:text-slate-100"
                  >
                    Post Office
                  </label>
                  <input
                    type="text"
                    name="postOffice"
                    value={address.postOffice}
                    onChange={handleChange}
                    placeholder="Delivery Post Office"
                    className="w-full bg-transparent border border-gray-300 focus:border-transparent focus:bg-transparent focus:ring-2 focus:ring-pink-400 text-base outline-none text-yellow-500 font-semibold py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    autoComplete="off"
                    autoSave="off"
                    aria-autocomplete="none"
                  />
                </div>
              </div>
              <div className="p-0 w-full">
                <div className="relative">
                  <label
                    htmlFor="PINCode"
                    className="leading-7 text-sm text-gray-600 dark:text-slate-100"
                  >
                    PIN Number
                  </label>
                  <input
                    type="number"
                    name="pinCode"
                    value={address.pinCode.slice(0, 6)}
                    onChange={handleChange}
                    placeholder="Enter PIN Number"
                    className="w-full bg-transparent border border-gray-300 focus:border-transparent focus:bg-transparent focus:ring-2 focus:ring-pink-400 text-base outline-none text-yellow-500 font-semibold py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    autoComplete="off"
                    autoSave="off"
                    aria-autocomplete="none"
                  />
                </div>
              </div>
              <div className="py-2 w-full flex gap-4">
                <button
                  className="text-slate-700 dark:text-white border-2 bg-white dark:bg-black py-2 px-8 focus:outline-none hover:bg-slate-300 hover:text-pink-900 dark:hover:bg-slate-700 text-sm font-semibold shadow-2xl shadow-popover-foreground dark:shadow-white w-full justify-center"
                  onClick={handleSubmit}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
