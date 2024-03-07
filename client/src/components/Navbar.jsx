import React from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  LogOutIcon,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";


export function Navbar() {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <div className="relative w-full bg-white my-1 shadow-md">
      <div className=" flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <Image src={"/main.svg"} width={100} height={100} alt="logo" />
          </span>
          {/* <span className="font-bold">Desol Int</span> */}
        </div>
        <div className=" grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8"></ul>
        </div>
        <div className=" space-x-2 lg:block">
          {currentPath === "/dashboard" ? (
            <>
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <Link
                  href={"/dashboard/add"}
                  className="flex justify-center items-centers gap-2"
                >
                  <Plus /> <span>Add Cars</span>
                </Link>
              </button>
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <span
                  onClick={() => {
                    localStorage.clear();
                    router.push("/");
                  }}
                  className="flex justify-center items-centers gap-2"
                >
                  <LogOutIcon /> <span>LogOut</span>
                </span>
              </button>
            </>
          ) : (
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <Link
                href={"/dashboard"}
                className="flex justify-center items-centers gap-2"
              >
                <LogOutIcon /> <span>Exit</span>
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
