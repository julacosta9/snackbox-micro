import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import { SearchIcon, ChevronRightIcon } from "@heroicons/react/outline";

const people = [
  {
    id: 0,
    name: "Durward Reynolds",
    category: "Edit Mode",
    link: "google.com",
  },
  {
    id: 1,
    name: "Kenton Towne",
    category: "Edit Mode",
    link: "google.com",
  },
  {
    id: 2,
    name: "Therese Wunsch",
    category: "Edit Mode",
    link: "google.com",
  },
  {
    id: 3,
    name: "Benedict Kessler",
    category: "Input Mode",
    link: "google.com",
  },
  {
    id: 4,
    name: "Katelyn Rohan",
    category: "Input Mode",
    link: "google.com",
  },
];

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CommandPalette = ({ isOpen, setIsOpen }: Props) => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filteredPeople =
    query === ""
      ? []
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

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
            className="relative bg-white max-w-3xl mx-auto rounded-xl shadow-2xl w-full ring-1 ring-black/5 divide-y"
          >
            <div className="flex items-center px-4 py-2">
              <SearchIcon className="h-6 w-6 text-gray-500" />
              <Combobox.Input
                className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none text-sm text-gray-800 placeholder-gray-400 h-12 rounded-lg px-2 mx-2 "
                placeholder="Search..."
                onChange={(event) => setQuery(event.target.value)}
              />
              <div className="kbd text-xs font-semibold text-gray-500">ESC</div>
            </div>
            {filteredPeople.length > 0 && (
              <Combobox.Options className="py-4 text-sm max-h-96 overflow-y-auto">
                {filteredPeople.map((person) => (
                  <Combobox.Option
                    value={person}
                    key={person.id}
                    className="px-2 md:px-8 py-1"
                  >
                    {({ active }) => (
                      <div
                        className={`flex items-center px-4 py-3 gap-y-1 rounded-xl ${
                          active ? "bg-primary text-white" : "bg-slate-100"
                        }`}
                      >
                        <div className="flex flex-col truncate">
                          <span className="text-xs truncate">
                            {person.category}
                          </span>
                          <span className="text-lg truncate">
                            {person.name}
                          </span>
                        </div>
                        <ChevronRightIcon
                          className={`w-5 h-5 ml-auto ${
                            active ? "text-white" : "text-base-content"
                          }`}
                        />
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
            {query && filteredPeople.length === 0 && (
              <p className="px-2 md:px-14 py-5 text-gray-500">
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
