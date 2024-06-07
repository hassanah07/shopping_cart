"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// import icons from fontawesome/fontawesome
import {
  RiProfileFill,
  RiFileHistoryFill,
  RiLockPasswordFill
} from "react-icons/ri";
import { FaAddressCard } from "react-icons/fa";
import { MdLiveHelp } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { BiSolidDiscount } from "react-icons/bi";
import { BiPowerOff } from "react-icons/bi";

const ProfileNavBar = () => {
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);
  const logout = () => {
    localStorage.removeItem("userToken");
    setRefresh(true);
  };
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      router.push("/login");
    }
  }, [refresh]);

  return (
    <div>
      <section class="text-gray-400 bg-gray-900 body-font min-h-screen">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            <div class="p-2 sm:w-1/2 w-full">
              <div class="bg-gray-800 rounded flex p-4 h-full items-center">
                <span class="flex title-font font-medium text-white">
                  <RiProfileFill className="text-2xl" /> Profile Update
                </span>
              </div>
            </div>
            <div class="p-2 sm:w-1/2 w-full">
              <div class="bg-gray-800 rounded flex p-4 h-full items-center">
                <span class="flex title-font font-medium text-white">
                  <RiFileHistoryFill className="text-2xl" />
                  Order History
                </span>
              </div>
            </div>
            <div class="p-2 sm:w-1/2 w-full">
              <div class="bg-gray-800 rounded flex p-4 h-full items-center">
                <span class="flex title-font font-medium text-white">
                  <FaAddressCard className="text-2xl" /> Manage Address
                </span>
              </div>
            </div>
            <div class="p-2 sm:w-1/2 w-full">
              <div class="bg-gray-800 rounded flex p-4 h-full items-center">
                <span class="flex title-font font-medium text-white">
                  <RiLockPasswordFill className="text-2xl" />
                  Change Password
                </span>
              </div>
            </div>
            <div class="p-2 sm:w-1/2 w-full">
              <div class="bg-gray-800 rounded flex p-4 h-full items-center">
                <span class="flex title-font font-medium text-white">
                  <MdLiveHelp className="text-2xl" />
                  Create Ticket
                </span>
              </div>
            </div>
            <div class="p-2 sm:w-1/2 w-full">
              <div class="bg-gray-800 rounded flex p-4 h-full items-center">
                <span class="flex title-font font-medium text-white">
                  <TiMessages className="text-2xl" />
                  Message Center
                </span>
              </div>
            </div>
            <div class="p-2 sm:w-1/2 w-full">
              <div class="bg-gray-800 rounded flex p-4 h-full items-center">
                <span class="flex title-font font-medium text-white">
                  <BiSolidDiscount className="text-2xl" />
                  Report Issue
                </span>
              </div>
            </div>
            <div class="p-2 sm:w-1/2 w-full cursor-pointer" onClick={logout}>
              <div class="bg-gray-800 rounded flex p-4 h-full items-center">
                <span class="flex title-font font-medium text-white">
                  <BiPowerOff className="text-2xl" />
                  Logout
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileNavBar;
