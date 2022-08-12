import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import {
  MenuIcon,
  DotsVerticalIcon,
  SearchIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/outline";

type NavProps = {
  toggleCommandPalette: any;
};

const Nav: React.FC = ({ toggleCommandPalette }: NavProps) => {
  const [isDarkMode, setDarkMode] = useState(false);

  return (
    <>
      <div className="w-full fixed border-b-[1px] border-gray-100 bg-white/30 backdrop-blur">
        <div className="max-w-7xl mx-auto justify-between flex items-center py-1 lg:py-2 px-1 sm:px-3 md:px-4 lg:px-8">
          <label
            htmlFor="my-drawer"
            tabIndex="0"
            className="lg:hidden btn btn-ghost btn-sm rounded-btn drawer-button"
          >
            <MenuIcon className="h-6 w-6" />
          </label>
          <Link href="/" aria-current="page" aria-label="Homepage" tabIndex="1">
            <div className="flex-0 pr-2 inline-flex text-lg transition-all duration-200 lg:text-3xl leading-normal font-extrabold text-gray-700 cursor-pointer">
              <span className="lowercase text-secondary transition">
                sbmicro
              </span>{" "}
              <span className="capitalize">hub</span>
            </div>
          </Link>
          <div className="hidden lg:flex gap-x-1">
            <a className="btn btn-ghost btn-sm normal-case">Gallery</a>
            <a className="btn btn-ghost btn-sm normal-case">About</a>
            <div className="divider divider-horizontal mx-0 bg-"></div>
            <label
              tabIndex="2"
              className="btn btn-ghost btn-sm rounded-btn"
              onClick={() => setDarkMode(!isDarkMode)}
            >
              {isDarkMode ? (
                <MoonIcon className="h-5 w-5 text-indigo-700" />
              ) : (
                <SunIcon className="h-5 w-5 text-amber-500" />
              )}
            </label>
          </div>
          <div className="flex items-center lg:hidden gap-x-1">
            <label
              tabIndex="2"
              className="btn btn-ghost btn-sm rounded-btn"
              onClick={toggleCommandPalette}
            >
              <SearchIcon className="lg:hidden h-5 w-5" />
            </label>
            <div className="lg:hidden dropdown dropdown-end">
              <label tabIndex="3" className="btn btn-ghost btn-sm rounded-btn">
                <DotsVerticalIcon className="h-5 w-5" />
              </label>
              <ul
                tabIndex="0"
                className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
              >
                <li>
                  <a className="normal-case">Gallery</a>
                </li>
                <li>
                  <a className="normal-case">About</a>
                </li>
                <li onClick={() => setDarkMode(!isDarkMode)}>
                  <a>
                    {isDarkMode ? (
                      <>
                        Dark Mode
                        <MoonIcon className="h-5 w-5 text-indigo-700" />
                      </>
                    ) : (
                      <>
                        Light Mode
                        <SunIcon className="h-5 w-5 text-amber-500" />
                      </>
                    )}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
