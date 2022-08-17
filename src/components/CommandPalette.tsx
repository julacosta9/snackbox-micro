import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import { SearchIcon, ChevronRightIcon } from "@heroicons/react/outline";
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
        className="fixed inset-0 overflow-y-auto p-4 lg:pt-[25vh] transi"
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
            className="relative bg-base-100 max-w-3xl mx-auto rounded-xl shadow-2xl w-full ring-1 ring-base-300/5 divide-y divide-base-200"
          >
            <div className="flex items-center px-4 py-2">
              <SearchIcon className="h-6 w-6 text-base-content/40" />
              <Combobox.Input
                className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none text-base-content placeholder-base-content/40 h-12 rounded-lg px-2 mx-2"
                placeholder="Search..."
                onChange={(event) => setQuery(event.target.value)}
              />
              <button
                onClick={(e) => setIsOpen(false)}
                className="ml-auto flex-none text-xs font-semibold kbd text-base-content/60 hover:ring-1 hover:ring-primary"
              >
                ESC
              </button>
            </div>
            {results.length > 0 && (
              <Combobox.Options className="py-4 text-sm max-h-96 overflow-y-auto">
                {results.map((result, i) => (
                  <Combobox.Option
                    value={result}
                    key={i}
                    className="px-2 md:px-8 py-1"
                  >
                    {({ active }) => (
                      <div
                        className={`flex items-center px-4 py-3 gap-y-1 rounded-xl ${
                          active
                            ? "bg-primary text-primary-content"
                            : "bg-base-300 text-base-content"
                        }`}
                      >
                        <div className="flex flex-col truncate">
                          <span className="text-xs truncate">
                            {result.pathSegments.sectionPathName
                              .replace("-", " ")
                              .toUpperCase()}
                          </span>
                          <span className="text-lg truncate">
                            {result.title}
                          </span>
                        </div>
                        <ChevronRightIcon className="w-5 h-5 ml-auto" />
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
            {query && results.length === 0 && (
              <p className="px-2 md:px-14 py-5 text-base-content">
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
