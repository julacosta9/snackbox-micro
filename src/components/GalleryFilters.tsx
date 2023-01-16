import React from "react";
import { buttonColors, buttonShapes, cases } from "../lib/constants";
import type { ButtonColors, ButtonShapes, CaseTypes } from "../lib/types";

type Props = {
  allOneButtonColor: boolean;
  selectedCaseType: CaseTypes;
  selectedButtonColors: ButtonColors;
  selectedButtonShapes: ButtonShapes;
  handleOnebuttonColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCaseChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleButtonColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleButtonShapeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const GalleryFilters: React.FC<Props> = ({
  allOneButtonColor,
  selectedCaseType,
  selectedButtonColors,
  selectedButtonShapes,
  handleOnebuttonColorChange,
  handleCaseChange,
  handleButtonColorChange,
  handleButtonShapeChange,
}) => {
  return (
    <div className="drawer-side overflow-y-auto">
      <label htmlFor="my-drawer" className="drawer-overlay backdrop-blur-sm" />
      <div className="fixed inset-0 right-auto z-20 w-[19.5rem] overflow-y-auto border-r border-base-200 bg-base-100 px-8 pb-10 shadow-lg lg:top-[5rem] lg:left-[max(0px,calc(50%-40rem))] lg:block lg:border-0 lg:shadow-none">
        <aside id="nav" className="relative pt-4 pb-2 lg:pt-0 lg:text-sm">
          <div className="flex w-full flex-col">
            <a
              href="https://docs.google.com/forms/d/1kVwaEt7gfim2iIifBDWO01t3vwriuuMXmt73ooYsMJk"
              target="_blank"
              rel="noreferrer"
              className="umami--click--submit-your-micro"
            >
              <button className="btn btn-primary mb-5 w-full">
                Submit your micro
              </button>
            </a>
            <form>
              <div className="form-control flex flex-col">
                <h3 className="rounded-lg bg-base-300 p-3 text-sm font-bold text-base-content">
                  Case type
                </h3>
                <div className="py-2 pl-2">
                  {cases.map((item, i: number) => (
                    <label
                      className="flex cursor-pointer select-none items-center gap-x-3 rounded-lg py-1 px-2 hover:bg-accent/10"
                      key={i}
                    >
                      <input
                        type="checkbox"
                        name={item.value}
                        className="checkbox checkbox-accent checkbox-xs rounded"
                        checked={selectedCaseType[`${item.value}`]}
                        onChange={handleCaseChange}
                      />
                      <span className="label-text">{item.name}</span>
                    </label>
                  ))}
                </div>
                <h3 className="rounded-lg bg-base-300 p-3 text-sm font-bold text-base-content">
                  Button color
                </h3>
                <div className="py-2 pl-2">
                  <label className="flex cursor-pointer select-none items-center gap-x-3 rounded-lg py-1 px-2 hover:bg-accent/10">
                    <input
                      type="checkbox"
                      className="toggle toggle-accent toggle-sm"
                      checked={allOneButtonColor}
                      onChange={handleOnebuttonColorChange}
                    />
                    <span className="label-text">All one button color</span>
                  </label>
                  <div className="my-3 text-xs font-bold text-base-content/70">
                    {allOneButtonColor ? "Select 1:" : "Select multiple:"}
                  </div>
                  {buttonColors.map((color, i: number) => (
                    <label
                      className="flex cursor-pointer select-none items-center gap-x-3 rounded-lg py-1 px-2 hover:bg-accent/10"
                      key={i}
                    >
                      <input
                        type="checkbox"
                        name={color.value}
                        checked={selectedButtonColors[`${color.value}`]}
                        onChange={handleButtonColorChange}
                        className={`checkbox checkbox-xs ${
                          allOneButtonColor
                            ? "rounded-full bg-base-200"
                            : "checkbox-accent"
                        } ${
                          selectedButtonColors[color.value]
                            ? "checkbox-accent rounded"
                            : "rounded"
                        }`}
                      />
                      <span className="label-text">{color.name}</span>
                    </label>
                  ))}
                </div>
                <h3 className="rounded-lg bg-base-300 p-3 text-sm font-bold text-base-content">
                  Button shape
                </h3>
                <div className="py-2 pl-2">
                  {buttonShapes.map((shape, i: number) => (
                    <label
                      className="flex cursor-pointer select-none items-center gap-x-3 rounded-lg py-1 px-2 hover:bg-accent/10"
                      key={i}
                    >
                      <input
                        type="checkbox"
                        name={shape.value}
                        checked={selectedButtonShapes[`${shape.value}`]}
                        onChange={handleButtonShapeChange}
                        className="checkbox checkbox-accent checkbox-xs rounded"
                      />
                      <span className="label-text">{shape.name}</span>
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
