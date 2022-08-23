import React, { useState, useEffect } from "react";

type Case = {
  name: string;
  value: string;
};

type Button = {
  name: string;
  value: string;
};

type ButtonShape = {
  name: string;
  value: string;
};

const cases: Case[] = [
  {
    name: "Black",
    value: "black",
  },
  {
    name: "Red",
    value: "red",
  },
  {
    name: "Blue",
    value: "blue",
  },
  {
    name: "White",
    value: "white",
  },
  {
    name: "Evo",
    value: "evo",
  },
  {
    name: "Artwork / Clear",
    value: "artwork-clear",
  },
  {
    name: "Artwork / Smoke",
    value: "artwork-smoke",
  },
  {
    name: "Artwork / Red",
    value: "artwork-red",
  },
  {
    name: "Artwork / Blue",
    value: "artwork-blue",
  },
  {
    name: "Artwork / Green",
    value: "artwork-green",
  },
  {
    name: "Artwork / Yellow",
    value: "artwork-yellow",
  },
];

const buttonColors: Button[] = [
  {
    name: "Black",
    value: "black",
  },
  {
    name: "White",
    value: "white",
  },
  {
    name: "Red",
    value: "red",
  },
  {
    name: "Light Blue",
    value: "blue-light",
  },
  {
    name: "Royal Blue",
    value: "blue-royal",
  },
  {
    name: "Aqua",
    value: "aqua",
  },
  {
    name: "Purple",
    value: "purple",
  },
  {
    name: "Light Pink",
    value: "pink-light",
  },
  {
    name: "Yellow",
    value: "Yellow",
  },
];

const buttonShapes: ButtonShape[] = [
  {
    name: "Both",
    value: "both",
  },
  {
    name: "Concave",
    value: "concave",
  },
  {
    name: "Convex",
    value: "convex",
  },
];

const GalleryFilters: React.FC = () => {
  const [allOneButtonColor, setAllOneButtonColor] = useState<boolean>(false);

  useEffect(() => {}, []);

  return (
    <div className="fixed inset-0 top-[5rem] left-[max(0px,calc(50%-40rem))] right-auto z-20 hidden w-[19.5rem] overflow-y-auto px-8 pb-10 lg:block">
      <nav id="nav" className="relative lg:text-sm lg:leading-6">
        <div className="flex w-full flex-col">
          <form>
            <div className="form-control flex flex-col">
              <h3 className="rounded-lg bg-base-300 p-3 text-sm font-bold text-base-content">
                Case type
              </h3>
              <div className="py-2 pl-4">
                {cases.map((item: Case, i: number) => (
                  <label
                    className="label cursor-pointer rounded-lg px-2 hover:bg-accent/10"
                    key={i}
                  >
                    <span className="label-text">{item.name}</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent checkbox-xs rounded"
                    />
                  </label>
                ))}
              </div>
              <h3 className="rounded-lg bg-base-300 p-3 text-sm font-bold text-base-content">
                Button color
              </h3>
              <div className="py-2 pl-4">
                <label className="label cursor-pointer rounded-lg px-2 hover:bg-accent/10">
                  <span className="label-text">All one button color</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-accent toggle-sm"
                    checked={allOneButtonColor}
                    onChange={(e) => setAllOneButtonColor(!allOneButtonColor)}
                  />
                </label>
                <div className="my-3 text-xs font-bold text-base-content/70">
                  {allOneButtonColor ? "Select 1:" : "Select multiple:"}
                </div>
                {buttonColors.map((color: Button, i: number) => (
                  <label
                    className="label cursor-pointer rounded-lg px-2 hover:bg-accent/10"
                    key={i}
                  >
                    <span className="label-text">{color.name}</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent checkbox-xs rounded"
                    />
                  </label>
                ))}
              </div>
              <h3 className="rounded-lg bg-base-300 p-3 text-sm font-bold text-base-content">
                Button shape
              </h3>
              <div className="py-2 pl-4">
                {buttonShapes.map((shape: ButtonShape, i: number) => (
                  <label
                    className="label cursor-pointer rounded-lg px-2 hover:bg-accent/10"
                    key={i}
                  >
                    <span className="label-text">{shape.name}</span>
                    <input
                      type="radio"
                      name="radio-1"
                      className="radio radio-accent radio-xs"
                    />
                  </label>
                ))}
              </div>
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default GalleryFilters;
