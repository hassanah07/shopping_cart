"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { ModeToggle } from "@/components/ModeToggle";

// import icons from fontawesome/fontawesome
import { FaBars, FaHome, FaWindowClose } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { LuPackageOpen } from "react-icons/lu";
import { RxAvatar } from "react-icons/rx";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import Title from "./Title";

const Navigation = () => {
  const router = useRouter();
  const [user, setUser] = useState({ value: null });
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUser({ value: token });
    }
  }, [router.query]);
  const [toggleNav, setToggleNav] = useState(true);
  const ref = useRef();
  return (
    <div className="">
      {user.value && (
        <div className="flex bg-white dark:bg-gray-900 backdrop-blur-lg h-16">
          <Title />

          <nav
            ref={ref}
            className={
              toggleNav === true
                ? "absolute top-0 right-0  z-40 md:bg-transparent md:block hidden"
                : "absolute top-0 right-0  z-40 md:bg-transparent md:block"
            }
          >
            <ul className="py-14 md:py-4 md:flex px-2 md:bg-transparent dark:md:bg-transparent dark:bg-black bg-purple-100 md:w-auto w-48">
              <Link
                href="/"
                className="px-2"
                onClick={() => {
                  setToggleNav(true);
                }}
              >
                <li className="flex font-bold mx-3 md:ml-auto capitalize text-slate-600 dark:text-white py-2 md:py-auto">
                  {/* {currElen.name} */}
                  <FaHome className="text-xl" title="Home" />
                  <span className="">home</span>
                </li>
                <hr className="md:hidden" />
              </Link>
              <Link
                href="/"
                className="px-2"
                onClick={() => {
                  setToggleNav(true);
                }}
              >
                <li className="flex font-bold mx-3 md:ml-auto capitalize text-slate-600 dark:text-white py-2 md:py-auto">
                  {/* {currElen.name} */}
                  <LuPackageOpen className="text-xl" title="Products" />
                  <span className="">Products</span>
                </li>
                <hr className="md:hidden" />
              </Link>
              <Link
                href="/"
                className="px-2"
                onClick={() => {
                  setToggleNav(true);
                }}
              >
                <li className="flex font-bold mx-3 md:ml-auto capitalize text-slate-600 dark:text-white py-2 md:py-auto">
                  {/* {currElen.name} */}
                  <LiaHandsHelpingSolid className="text-xl" title="Help" />
                  <span className="">Help</span>
                </li>
                <hr className="md:hidden" />
              </Link>
              <Link
                href="/profile"
                className="px-2"
                onClick={() => {
                  setToggleNav(true);
                }}
              >
                <li className="flex font-bold mx-3 md:ml-auto capitalize text-slate-600 dark:text-white py-2 md:py-auto">
                  <RxAvatar className="text-xl" title="Profile" />
                  <span className="">Profile</span>
                </li>
                <hr className="md:hidden" />
              </Link>
            </ul>
            <FaWindowClose
              className="absolute top-3 right-3 text-3xl text-white cursor-pointer md:hidden"
              onClick={() => {
                setToggleNav(true);
              }}
            />
          </nav>

          <div
            className="hamburgerManu absolute top-2 right-2 z-20 cursor-pointer md:hidden"
            onClick={() => {
              setToggleNav(false);
            }}
          >
            <FaBars className="text-5xl text-pink-800" />
          </div>
        </div>
      )}
      {!user.value && (
        <div className="flex bg-white dark:bg-gray-900 backdrop-blur-lg h-16">
          <Title />
          <nav
            ref={ref}
            className={
              toggleNav === true
                ? "absolute top-0 right-0  z-40 md:bg-transparent md:block hidden"
                : "absolute top-0 right-0  z-40 md:bg-transparent md:block"
            }
          >
            <ul className="py-14 md:py-4 md:flex px-2 md:bg-transparent dark:md:bg-transparent dark:bg-black bg-purple-100 md:w-auto w-48">
              <Link
                href="/"
                className="px-2"
                onClick={() => {
                  setToggleNav(true);
                }}
              >
                <li className="flex font-bold mx-3 md:ml-auto capitalize text-slate-600 dark:text-white py-2 md:py-auto">
                  {/* {currElen.name} */}
                  <FaHome className="text-xl" title="Home" />
                  <span className="">home</span>
                </li>
                <hr className="md:hidden" />
              </Link>
              <Link
                href="/"
                className="px-2"
                onClick={() => {
                  setToggleNav(true);
                }}
              >
                <li className="flex font-bold mx-3 md:ml-auto capitalize text-slate-600 dark:text-white py-2 md:py-auto">
                  {/* {currElen.name} */}
                  <LuPackageOpen className="text-xl" title="Products" />
                  <span className="">Products</span>
                </li>
                <hr className="md:hidden" />
              </Link>
              <Link
                href="/login"
                className="px-2"
                onClick={() => {
                  setToggleNav(true);
                }}
              >
                <li className="flex font-bold mx-3 md:ml-auto capitalize text-slate-600 dark:text-white py-2 md:py-auto">
                  {/* {currElen.name} */}
                  <LiaHandsHelpingSolid className="text-xl" title="Help" />
                  <span className="">Help</span>
                </li>
                <hr className="md:hidden" />
              </Link>
              <Link
                href="/login"
                className="px-2"
                onClick={() => {
                  setToggleNav(true);
                }}
              >
                <li className="flex font-bold mx-3 md:ml-auto capitalize text-slate-600 dark:text-white py-2 md:py-auto">
                  {/* {currElen.name} */}
                  <FiLogOut className="text-xl" title="Profile" />

                  <span className="">Login</span>
                </li>
                <hr className="md:hidden" />
              </Link>
            </ul>
            <FaWindowClose
              className="absolute top-3 right-3 text-3xl text-white cursor-pointer md:hidden"
              onClick={() => {
                setToggleNav(true);
              }}
            />
          </nav>

          <div
            className="hamburgerManu absolute top-2 right-2 z-20 cursor-pointer md:hidden"
            onClick={() => {
              setToggleNav(false);
            }}
          >
            <FaBars className="text-5xl text-pink-800" />
          </div>
        </div>
      )}

      {/* <div className="fixed bottom-2 right-2 z-20 cursor-pointer dark:border-white border-2 border-black rounded-lg">
        <ModeToggle />
      </div> */}
      {/* <div className="fixed bottom-16 right-2 z-40 cursor-pointer">
        <Link href="/careerfeed/feed.xml" target="_hassan">
          <FaSquareRss className="text-5xl text-yellow-400 hover:text-purple-300" />
        </Link>
      </div> */}
    </div>
  );
};

export default Navigation;
