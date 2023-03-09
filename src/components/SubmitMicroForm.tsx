import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { buttonColors, buttonShapes, cases } from "../lib/constants";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubmitMircoForm = ({ isOpen, setIsOpen }: Props) => {
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {});

  return (
    <Transition.Root show={isOpen} as={Fragment} afterLeave={() => {}}>
      <Dialog
        onClose={() => {
          setIsOpen(false);
          // TODO ADD CLOSE ACTIONS
        }}
        className="fixed inset-0 z-10 overflow-y-auto p-4 lg:pt-[25vh]"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm" />
        <Transition.Child
          enter="duration-100 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-75 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="relative mx-auto w-full max-w-3xl divide-y divide-base-200 rounded-lg bg-base-100 shadow-2xl ring-1 ring-base-300/5">
            <div className="flex items-center px-4 py-4">
              <div className="form-control w-full gap-y-3">
                <div>
                  <label className="label">
                    <span className="label-text text-lg font-bold">
                      Upload image
                    </span>
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full"
                  />
                </div>

                <div className="flex gap-x-2">
                  <div className="w-1/2">
                    <label className="label">
                      <span className="label-text text-lg font-bold">
                        Case type
                      </span>
                    </label>
                    <select className="select select-bordered w-full">
                      {cases.map((item) => (
                        <option key={item.value}>{item.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="w-1/2">
                    <label className="label">
                      <span className="label-text text-lg font-bold">
                        Button shape
                      </span>
                    </label>
                    <select className="select select-bordered w-full">
                      {buttonShapes.map((shape) => (
                        <option key={shape.value}>{shape.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text text-lg font-bold">
                      Buttons color(s)
                    </span>
                  </label>
                  <div className="flex flex-wrap">
                    {buttonColors.map((color) => (
                      <div className="w-1/3" key={color.value}>
                        <label className="flex cursor-pointer select-none items-center gap-x-3 rounded-lg py-2 px-2 hover:bg-accent/10">
                          <input
                            type="checkbox"
                            name={color.value}
                            // checked={}
                            // onChange={}
                            className="checkbox checkbox-accent"
                          />
                          <span className="label-text">{color.name}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-x-2">
                  <div className="w-1/2">
                    <label className="label">
                      <span className="label-text text-lg font-bold">
                        Image credit
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="@twitterName or DiscordName#1234"
                      className="input input-bordered w-full placeholder:text-slate-400/50"
                    />
                  </div>

                  <div className="w-1/2">
                    <label className="label">
                      <span className="label-text text-lg font-bold">
                        Image credit URL (not required)
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="twitter.com/junkfoodarcades"
                      className="input input-bordered w-full placeholder:text-slate-400/50"
                    />
                  </div>
                </div>

                <button className="btn btn-primary mt-4 h-14 w-full text-lg">
                  Submit your micro
                </button>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default SubmitMircoForm;
