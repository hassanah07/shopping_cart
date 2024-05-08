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

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const handleChange = (e) => {
    if (e.target.name == "oldPassword") {
      setOldPassword(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "confPassword") {
      setConfPassword(e.target.value);
    }
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
    if (password !== confPassword) {
      console.log("please confirm password");
    } else {
      const data = { oldPassword, password };
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/users/changePassword`,
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
        if (res.user.addressAdded !== true) {
          router.push("/login/addAddress");
        } else {
          router.push("/");
        }
      }
    }
  };
  const handleSkip = async (e) => {
    e.preventDefault();
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/users/skipChangePassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("userToken")
        }
      }
    );
    res = await res.json();
    console.log(res);
    if (res.status === true) {
      if (res.user.addressAdded !== true) {
        router.push("/login/addAddress");
      } else {
        router.push("/");
      }
    }
  };
  return (
    <div className="text-black body-font bg-white dark:bg-black dark:text-white flex items-center justify-center min-h-screen">
      {/* <ToastContainer /> */}
      <section className="text-black body-font relative md:w-[70%]">
        <div className="container px-5 mx-auto my-8 md:w-[50%] shadow-2xl shadow-popover-foreground">
          <div className="flex flex-col text-center w-full">
            <h1 className="sm:text-xl text-lg font-medium title-font my-4 text-gray-900 dark:text-slate-100">
              Change Generated Password
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
                    Old Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={handleChange}
                    placeholder="Enter Old Password"
                    className="w-full bg-transparent border border-gray-300 focus:border-transparent focus:bg-transparent focus:ring-2 focus:ring-pink-400 text-base outline-none text-yellow-500 font-semibold py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    autoComplete="off"
                    autoSave="off"
                    aria-autocomplete="none"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600 dark:text-slate-100"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="password"
                    className="w-full bg-transparent border border-gray-300 focus:border-transparent focus:bg-transparent focus:ring-2 focus:ring-pink-400 text-base outline-none text-yellow-500 font-semibold py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    autoComplete="off"
                    autoSave="off"
                    aria-autocomplete="none"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600 dark:text-slate-100"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confPassword"
                    name="confPassword"
                    value={confPassword}
                    onChange={handleChange}
                    placeholder="Confirm New Password"
                    className="w-full bg-transparent border border-gray-300 focus:border-transparent focus:bg-transparent focus:ring-2 focus:ring-pink-400 text-base outline-none text-yellow-500 font-semibold py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    autoComplete="off"
                    autoSave="off"
                    aria-autocomplete="none"
                  />
                </div>
              </div>
              <div className="p-2 w-full flex gap-4">
                <button
                  className="text-slate-700 dark:text-white border-2 bg-white dark:bg-black py-2 px-8 focus:outline-none hover:bg-slate-300 hover:text-pink-900 dark:hover:bg-slate-700 text-sm font-semibold shadow-2xl shadow-popover-foreground dark:shadow-white w-full justify-center"
                  onClick={handleSkip}
                >
                  Skip
                </button>
                <button
                  className="text-slate-700 dark:text-white border-2 bg-white dark:bg-black py-2 px-8 focus:outline-none hover:bg-slate-300 hover:text-pink-900 dark:hover:bg-slate-700 text-sm font-semibold shadow-2xl shadow-popover-foreground dark:shadow-white w-full justify-center"
                  onClick={handleSubmit}
                >
                  Change
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
