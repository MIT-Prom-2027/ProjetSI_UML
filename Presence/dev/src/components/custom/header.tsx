"use client";
import Image from "next/image";
import Logo from "@/app/assets/logomisa-removebg-preview.png";
import { useContext } from "react";
import { UserContext } from "../context/Usercontext";
export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <header className="w-full h-[70px] pl-20 pr-20 border-gray-200 border-b-2 shadow-md">
      <div className=" mt-5 flex">
        <div className="flex">
          <Image src={Logo} alt="" className="w-10 h-10 mr-8 mt-[-5px]"></Image>
          <h2 className=" text-red-600 hidden md:block">MIT Presence App</h2>
        </div>
        {user ? (
          <div className="ml-20 md:ml-auto md:mt-2 mt-0">
            {user.nom} {user.prenom}
          </div>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
}
