import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowTopRightOnSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LinkIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

type Props = {
  image: any;
  isOpen: boolean;
  handleImageSelect: any;
  handleNextImg: any;
  handlePrevImg: any;
};

const ImageLightBox = ({
  isOpen,
  handleImageSelect,
  image,
  handleNextImg,
  handlePrevImg,
}: Props) => {
  const [isLoading, setLoading] = useState(true);

  const handleKeyDown = (e: any) => {
    if (!isOpen) return;

    if (e.keyCode === 37) handlePrevImg();
    if (e.keyCode === 39) handleNextImg();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}
      afterLeave={() => {
        // do something
      }}
    >
      <Dialog
        onClose={() => {
          handleImageSelect(null);
        }}
        className="fixed inset-0 z-10 overflow-y-auto md:p-4"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md" />
        <div className="flex min-h-full items-center justify-center text-center md:p-4">
          <Transition.Child
            enter="duration-100 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100 w-fit mx-auto"
            leave="duration-75 ease-in w-fit mx-auto"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative flex w-fit transform flex-col overflow-hidden bg-black shadow-2xl will-change-auto md:rounded-lg">
              {image && (
                <Image
                  alt={`Photo of Snackbox Micro by ${image.credit}`}
                  src={image.src}
                  objectFit="contain"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  height={720}
                  width={1280}
                  className={`touch-pinch-zoom duration-700 ease-in-out
              ${
                isLoading
                  ? "scale-110 blur-xl grayscale"
                  : "scale-100 blur-0 grayscale-0"
              }
              `}
                  onLoadingComplete={() => setLoading(false)}
                />
              )}
              <div className="absolute top-5 right-5 flex gap-2">
                <div
                  className="tooltip tooltip-left tooltip-accent"
                  data-tip="Copy link"
                >
                  <button
                    onClick={() => navigator.clipboard.writeText(document.URL)}
                    className="btn btn-sm right-20 top-5 sm:btn-md"
                  >
                    <LinkIcon className="h-4 w-4 sm:h-6 sm:w-6" />
                  </button>
                </div>
                <button
                  onClick={() => handleImageSelect(null)}
                  className="btn btn-sm sm:btn-md"
                >
                  <XMarkIcon className="h-4 w-4 sm:h-6 sm:w-6" />
                </button>
              </div>
              <div className="absolute top-[50%] flex w-full -translate-y-1/2 transform justify-between px-6">
                <button
                  onClick={handlePrevImg}
                  onKeyDown={handleKeyDown}
                  className="btn btn-primary btn-sm bg-opacity-25 sm:btn-md"
                >
                  <ChevronLeftIcon className="h-4 w-4 sm:h-6 sm:w-6" />
                </button>
                <button
                  onClick={handleNextImg}
                  className="btn btn-primary btn-sm bg-opacity-25 sm:btn-md"
                >
                  <ChevronRightIcon className="h-4 w-4 sm:h-6 sm:w-6" />
                </button>
              </div>
              {image && (
                <a href={image.creditUrl} target="_blank" rel="noreferrer">
                  <div className="btn btn-sm absolute bottom-5 right-5 flex normal-case sm:btn-md">
                    <span>{image.credit}</span>
                    <ArrowTopRightOnSquareIcon className="ml-2 mb-1 h-5 w-5" />
                  </div>
                </a>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ImageLightBox;
