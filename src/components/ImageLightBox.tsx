import { Fragment, useState } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
  LinkIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

type Props = {
  image: any;
  isOpen: boolean;
  handleImageSelect: any;
};

const ImageLightBox = ({ isOpen, handleImageSelect, image }: Props) => {
  const [isLoading, setLoading] = useState(true);

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
          // TODO ADD CLOSE ACTIONS
        }}
        className="fixed inset-0 z-10 overflow-y-auto p-4 lg:pt-[10vh]"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm" />
        <Transition.Child
          enter="duration-100 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100 w-fit mx-auto"
          leave="duration-75 ease-in w-fit mx-auto"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="relative flex w-fit flex-col overflow-hidden rounded-lg bg-black shadow-2xl">
            <Image
              alt={`Photo of Snackbox Micro by ${image.credit}`}
              src={image.src}
              objectFit="contain"
              height="1000px"
              width="1000px"
              className={`touch-pinch-zoom duration-700 ease-in-out
              ${
                isLoading
                  ? "scale-110 blur-xl grayscale"
                  : "scale-100 blur-0 grayscale-0"
              }
              `}
              onLoadingComplete={() => setLoading(false)}
            />
            <div className="absolute top-5 right-5 flex gap-2">
              <div
                className="tooltip tooltip-left tooltip-accent"
                data-tip="copy link"
              >
                <button
                  onClick={() => console.log("clicked")}
                  className="btn right-20 top-5"
                >
                  <LinkIcon className="h-6 w-6" />
                </button>
              </div>
              <button
                onClick={() => handleImageSelect(null)}
                className="btn btn-primary"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <a href={image.creditUrl} target="_blank" rel="noreferrer">
              <div className="btn btn-sm absolute bottom-5 right-5 flex normal-case sm:btn-md">
                <span>{image.credit}</span>
                <ArrowTopRightOnSquareIcon className="ml-2 mb-1 h-5 w-5" />
              </div>
            </a>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default ImageLightBox;
