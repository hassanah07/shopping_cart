"use client";
import React, { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const ResetPasswordPage = ({ params }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      redirect("/admin/dashboard");
    }
  }, []);

  const [email] = useState(decodeURIComponent(params.username));
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
    const data = { email };
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/users/resetPassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );
    res = await res.json();
    if (res.status === true) {
      toast.success(res.msg, toastOptions);
      setTimeout(() => {
        router.push(`/login/login/${email}`);
      }, 3500);
    }
  };
  return (
    <div className="text-black body-font bg-white dark:bg-black dark:text-white flex items-center justify-center min-h-screen">
      <ToastContainer />
      <section className="text-black body-font relative md:w-[70%]">
        <div className="container mx-auto my-8 md:w-[60%] shadow-2xl shadow-popover-foreground">
          <div className="flex flex-col text-center w-full">
            <h1 className="sm:text-3xl text-2xl font-medium title-font my-4 text-gray-900 dark:text-slate-100">
              Re-Generate Password
            </h1>
          </div>
          <hr />
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600 dark:text-slate-100"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Mobile No/ Email Id"
                    className="w-full bg-transparent border border-gray-300 focus:border-transparent focus:bg-transparent focus:ring-2 focus:ring-pink-400 text-base outline-none text-yellow-500 font-semibold p-1 leading-8 transition-colors duration-200 ease-in-out"
                    autoComplete="off"
                    autoSave="off"
                    aria-autocomplete="none"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  className="text-slate-700 dark:text-white border-2 bg-white dark:bg-black p-1 focus:outline-none hover:bg-slate-300 hover:text-white dark:hover:bg-slate-700 text-lg font-semibold shadow-2xl shadow-popover-foreground dark:shadow-white w-full justify-center"
                  onClick={handleSubmit}
                >
                  Generate Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPasswordPage;
