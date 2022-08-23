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
      <div className="fixed w-full border-b-[1px] border-base-200 bg-base-100/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center py-2 px-1 sm:px-3 md:px-4 lg:justify-between lg:px-8">
          <label
            htmlFor="my-drawer"
            tabIndex={0}
            className="btn btn-ghost btn-sm drawer-button rounded-btn mr-1 lg:hidden"
          >
            <MenuIcon className="h-6 w-6" />
          </label>
          <Link href="/" aria-current="page" aria-label="Homepage" tabIndex={1}>
            <div className="flex-0 inline-flex cursor-pointer text-lg font-extrabold leading-normal text-gray-700 transition-all duration-200 lg:text-3xl">
              <span className="lowercase text-secondary transition">
                sbmicro
              </span>{" "}
              <span className="capitalize text-base-content">hub</span>
            </div>
          </Link>
          <div className="hidden gap-x-1 lg:flex">
            <Link href={"/gallery"}>
              <a className="btn btn-ghost btn-sm bg-base-200 normal-case hover:bg-base-300">
                Gallery
              </a>
            </Link>
            <Link href={"/about"}>
              <a className="btn btn-ghost btn-sm bg-base-200 normal-case hover:bg-base-300">
                About
              </a>
            </Link>
            <div className="divider divider-horizontal mx-0"></div>
            <label
              tabIndex={2}
              className="btn btn-ghost btn-sm rounded-btn bg-base-200 hover:bg-base-300"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5 text-amber-500" />
              ) : (
                <MoonIcon className="h-5 w-5 text-indigo-600" />
              )}
            </label>
          </div>
          <div className="ml-auto flex items-center gap-x-1 lg:hidden">
            <label
              tabIndex={2}
              className="btn btn-ghost btn-sm rounded-btn"
              onClick={(e) => setShowCommandPalette(!isCommandPaletteOpen)}
            >
              <SearchIcon className="h-5 w-5 lg:hidden" />
            </label>
            <div className="dropdown dropdown-end lg:hidden">
              <label tabIndex={3} className="btn btn-ghost btn-sm rounded-btn">
                <DotsVerticalIcon className="h-5 w-5" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box mt-4 w-52 border border-base-200 bg-base-100 p-2 shadow"
              >
                <li>
                  <Link href={"/gallery"}>
                    <a className="normal-case">Gallery</a>
                  </Link>
                </li>
                <li>
                  <Link href={"/about"}>
                    <a className="normal-case">About</a>
                  </Link>
                </li>
                <li onClick={toggleDarkMode}>
                  <a>
                    {isDarkMode ? (
                      <>
                        Light Mode
                        <SunIcon className="h-5 w-5 text-amber-500" />
                      </>
                    ) : (
                      <>
                        Dark Mode
                        <MoonIcon className="h-5 w-5 text-indigo-600" />
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
