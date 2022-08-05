import type { NextPage } from "next";
import Link from "next/link";

const Nav: React.FC = () => {
  return (
    <>
      <div className="flex flex-col min-h-full">
        <div className="grow-0 shrink-0">
          <div className="max-w-7xl mx-auto justify-between flex items-center py-2 px-4 sm:px-6 md:px-0">
            <Link href="/" aria-current="page" aria-label="Homepage">
              <div className="flex-0 px-2 inline-flex text-lg transition-all duration-200 md:text-3xl leading-normal font-extrabold text-gray-700 group cursor-pointer">
                <span className="lowercase group-hover:text-secondary transition">
                  sbmicro
                </span>{" "}
                <span className="capitalize">hub</span>
              </div>
            </Link>
            <div className="flex gap-x-1">
              <a className="btn btn-ghost btn-sm normal-case">Gallery</a>
              <a className="btn btn-ghost btn-sm normal-case">About</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
