import type { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  MenuIcon,
  DotsVerticalIcon,
  SearchIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/outline";

type NavProps = {
  isCommandPaletteOpen: boolean;
  setShowCommandPalette: React.Dispatch<React.SetStateAction<boolean>>;
};

const Nav: React.FC<NavProps> = ({
  isCommandPaletteOpen,
  setShowCommandPalette,
}: NavProps) => {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    // https://bobbyhadz.com/blog/typescript-element-implicitly-any-type-not-number
    let theme: any =
      document.documentElement.attributes["data-theme" as unknown as number];
    if (theme.value === "light") {
      theme.value = "dark";
      localStorage.theme = "dark";
      setDarkMode(true);
    } else {
      theme.value = "light";
      localStorage.theme = "light";
      setDarkMode(false);
    }
  };

  useEffect(() => {
    let theme: any =
      document.documentElement.attributes["data-theme" as unknown as number];
    if (theme.value === "light") {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  }, []);

  return (
    <>
      <div className="w-full fixed border-b-[1px] border-base-200 bg-base-100/60 backdrop-blur">
        <div className="max-w-7xl mx-auto justify-between flex items-center py-1 lg:py-2 px-1 sm:px-3 md:px-4 lg:px-8">
          <label
            htmlFor="my-drawer"
            tabIndex={0}
            className="lg:hidden btn btn-ghost btn-sm rounded-btn drawer-button"
          >
            <MenuIcon className="h-6 w-6" />
          </label>
          <Link href="/" aria-current="page" aria-label="Homepage" tabIndex={1}>
            <div className="flex-0 pr-2 inline-flex text-lg transition-all duration-200 lg:text-3xl leading-normal font-extrabold text-gray-700 cursor-pointer">
              <span className="lowercase text-secondary transition">
                sbmicro
              </span>{" "}
              <span className="capitalize text-base-content">hub</span>
            </div>
          </Link>
          <div className="hidden lg:flex gap-x-1">
            <a className="btn btn-ghost btn-sm bg-base-200 hover:bg-base-300 normal-case">
              Gallery
            </a>
            <a className="btn btn-ghost btn-sm bg-base-200 hover:bg-base-300 normal-case">
              About
            </a>
            <div className="divider divider-horizontal mx-0"></div>
            <label
              tabIndex={2}
              className="btn btn-ghost btn-sm bg-base-200 hover:bg-base-300 rounded-btn"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? (
                <MoonIcon className="h-5 w-5 text-indigo-600" />
              ) : (
                <SunIcon className="h-5 w-5 text-amber-500" />
              )}
            </label>
          </div>
          <div className="flex items-center lg:hidden gap-x-1">
            <label
              tabIndex={2}
              className="btn btn-ghost btn-sm rounded-btn"
              onClick={(e) => setShowCommandPalette(!isCommandPaletteOpen)}
            >
              <SearchIcon className="lg:hidden h-5 w-5" />
            </label>
            <div className="lg:hidden dropdown dropdown-end">
              <label tabIndex={3} className="btn btn-ghost btn-sm rounded-btn">
                <DotsVerticalIcon className="h-5 w-5" />
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4 border border-base-200"
              >
                <li>
                  <a className="normal-case">Gallery</a>
                </li>
                <li>
                  <a className="normal-case">About</a>
                </li>
                <li onClick={toggleDarkMode}>
                  <a>
                    {isDarkMode ? (
                      <>
                        Dark Mode
                        <MoonIcon className="h-5 w-5 text-indigo-600" />
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
