import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { allArticles } from "contentlayer/generated";
import Fuse from "fuse.js";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CommandPalette = ({ isOpen, setIsOpen }: Props) => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const fuse = new Fuse(allArticles, {
    keys: ["title", "tags"],
  });

  const results =
    query === "" ? [] : fuse.search(query).map((result) => result.item);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((isOpen) => !isOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setIsOpen]);

  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}
      afterLeave={() => {
        setQuery("");
      }}
    >
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
          <Combobox
            value={selectedPerson}
            onChange={(person) => {
              setSelectedPerson(person);
              setIsOpen(false);
              // TODO: redirect to article url
              router.push(`/`);
            }}
            as="div"
            className="relative mx-auto w-full max-w-3xl divide-y divide-base-200 rounded-xl bg-base-100 shadow-2xl ring-1 ring-base-300/5"
          >
            <div className="flex items-center px-4 py-2">
              <MagnifyingGlassIcon className="h-6 w-6 text-base-content/40" />
              <Combobox.Input
                className="mx-2 h-12 w-full rounded-lg border-0 bg-transparent px-2 text-base-content placeholder-base-content/40 focus:outline-none focus:ring-0"
                placeholder="Search..."
                onChange={(event) => setQuery(event.target.value)}
              />
              <button
                onClick={(e) => setIsOpen(false)}
                className="kbd ml-auto flex-none text-xs font-semibold text-base-content/60 hover:ring-1 hover:ring-primary"
              >
                ESC
              </button>
            </div>
            {results.length > 0 && (
              <Combobox.Options className="max-h-96 overflow-y-auto py-4 text-sm">
                {results.map((result, i) => (
                  <Combobox.Option
                    value={result}
                    key={i}
                    className="px-2 py-1 md:px-8"
                  >
                    {({ active }) => (
                      <div
                        className={`flex items-center gap-y-1 rounded-xl px-4 py-3 ${
                          active
                            ? "bg-primary text-primary-content"
                            : "bg-base-200 text-base-content"
                        }`}
                      >
                        <div className="flex flex-col truncate">
                          <span
                            className={`truncate text-xs uppercase ${
                              active ? "" : "text-base-content/70"
                            }`}
                          >
                            {result.pathSegments.sectionPathName.replace(
                              "-",
                              " "
                            )}
                          </span>
                          <span className="truncate text-lg">
                            {result.title}
                          </span>
                        </div>
                        <ChevronRightIcon className="ml-auto h-5 w-5" />
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
            {query && results.length === 0 && (
              <p className="px-2 py-5 text-base-content md:px-14">
                No results found.
              </p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default CommandPalette;
