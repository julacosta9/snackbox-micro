import React, { useState } from "react";

type Case = {
  name: string;
  value: string;
};

type CaseTypes = {
  // added string type to be able to reference an object string/variable
  [black: string]: boolean;
  red: boolean;
  blue: boolean;
  white: boolean;
  evo: boolean;
  artworkClear: boolean;
  artworkSmoke: boolean;
  artworkRed: boolean;
  artworkBlue: boolean;
  artworkGreen: boolean;
  artworkYellow: boolean;
};

type ButtonColors = {
  [black: string]: boolean;
  white: boolean;
  red: boolean;
  blueRoyal: boolean;
  blueLight: boolean;
  aqua: boolean;
  purple: boolean;
  pinkLight: boolean;
  yellow: boolean;
};

type ButtonShapes = {
  [both: string]: boolean;
  concave: boolean;
  convex: boolean;
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
    value: "artworkClear",
  },
  {
    name: "Artwork / Smoke",
    value: "artworkSmoke",
  },
  {
    name: "Artwork / Red",
    value: "artworkRed",
  },
  {
    name: "Artwork / Blue",
    value: "artworkBlue",
  },
  {
    name: "Artwork / Green",
    value: "artworkGreen",
  },
  {
    name: "Artwork / Yellow",
    value: "artworkYellow",
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
    value: "blueLight",
  },
  {
    name: "Royal Blue",
    value: "blueRoyal",
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
    value: "pinkLight",
  },
  {
    name: "Yellow",
    value: "yellow",
  },
];

const buttonShapes: ButtonShape[] = [
  {
    name: "Concave",
    value: "concave",
  },
  {
    name: "Convex",
    value: "convex",
  },
  {
    name: "Mixed",
    value: "mixed",
  },
];

const GalleryFilters: React.FC = () => {
  const [allOneButtonColor, setAllOneButtonColor] = useState<boolean>(false);
  const [selectedButtonStore, setSelectedButtonStore] =
    useState<ButtonColors | null>();
  const [selectedCaseType, setSelectedCaseType] = useState<CaseTypes>({
    black: false,
    red: false,
    blue: false,
    white: false,
    evo: false,
    artworkClear: false,
    artworkSmoke: false,
    artworkRed: false,
    artworkBlue: false,
    artworkGreen: false,
    artworkYellow: false,
  });
  const [selectedButtonColors, setSelectedButtonColors] =
    useState<ButtonColors>({
      black: false,
      white: false,
      red: false,
      blueRoyal: false,
      blueLight: false,
      aqua: false,
      purple: false,
      pinkLight: false,
      yellow: false,
    });

  const [selectedButtonShapes, setSelectedButtonShapes] =
    useState<ButtonShapes>({
      both: false,
      concave: false,
      convex: false,
    });

  const handleCaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCaseType({
      ...selectedCaseType,
      [e.target.name]: e.target.checked,
    });
  };

  const handleOnebuttonColorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (allOneButtonColor && selectedButtonStore) {
      setSelectedButtonColors(selectedButtonStore);
    }

    if (!allOneButtonColor) {
      // save currently selected colors
      setSelectedButtonStore(selectedButtonColors);
      // set selected colors all false
      setSelectedButtonColors({
        black: false,
        white: false,
        red: false,
        blueRoyal: false,
        blueLight: false,
        aqua: false,
        purple: false,
        pinkLight: false,
        yellow: false,
      });
    }

    setAllOneButtonColor(!allOneButtonColor);
  };

  const handleButtonColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!allOneButtonColor) {
      setSelectedButtonColors({
        ...selectedButtonColors,
        [e.target.name]: e.target.checked,
      });

      return;
    }

    // create array of colors selected
    const arr = Object.keys(selectedButtonColors).filter(
      (color) => selectedButtonColors[color] === true
    );

    // if no colors are selected or the clicked color is no checked
    if (arr.length === 0 || !e.target.checked) {
      setSelectedButtonColors({
        ...selectedButtonColors,
        [e.target.name]: e.target.checked,
      });
    }

    return;
  };

  const handleButtonShapeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedButtonShapes({
      ...selectedButtonShapes,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className="drawer-side overflow-y-auto">
      <label htmlFor="my-drawer" className="drawer-overlay backdrop-blur-sm" />
      <div className="fixed inset-0 right-auto z-20 w-[19.5rem] overflow-y-auto border-r border-base-200 bg-base-100 px-8 pb-10 shadow-lg lg:top-[5rem] lg:left-[max(0px,calc(50%-40rem))] lg:block lg:border-0 lg:shadow-none">
        <aside id="nav" className="relative pt-4 pb-2 lg:pt-0 lg:text-sm">
          <div className="flex w-full flex-col">
            <button className="btn btn-primary mb-5">Submit your micro</button>
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
                        name={item.value}
                        className="checkbox checkbox-accent checkbox-xs rounded"
                        checked={selectedCaseType[`${item.value}`]}
                        onChange={handleCaseChange}
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
                      onChange={handleOnebuttonColorChange}
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
                        name={color.value}
                        checked={selectedButtonColors[`${color.value}`]}
                        onChange={handleButtonColorChange}
                        className={`${
                          allOneButtonColor
                            ? "rounded-full bg-base-200"
                            : "checkbox-accent"
                        } ${
                          selectedButtonColors[color.value]
                            ? "checkbox-accent rounded"
                            : "rounded"
                        } checkbox checkbox-xs`}
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
                        type="checkbox"
                        name={shape.value}
                        checked={selectedButtonShapes[`${shape.value}`]}
                        onChange={handleButtonShapeChange}
                        className="checkbox checkbox-accent checkbox-xs rounded"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default GalleryFilters;
