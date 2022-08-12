import { useState, useEffect } from "react";
import { Dialog, Combobox } from "@headlessui/react";
import { SearchIcon, ChevronRightIcon } from "@heroicons/react/outline";

const people = [
  {
    id: 0,
    name: "Durward Reynolds",
    category: "Edit Mode",
    link: "google.com",
  },
  {
    id: 0,
    name: "Kenton Towne",
    category: "Edit Mode",
    link: "google.com",
  },
  {
    id: 0,
    name: "Therese Wunsch",
    category: "Edit Mode",
    link: "google.com",
  },
  {
    id: 0,
    name: "Benedict Kessler",
    category: "Input Mode",
    link: "google.com",
  },
  {
    id: 0,
    name: "Katelyn Rohan",
    category: "Input Mode",
    link: "google.com",
  },
];

type Props = {
  isOpen: boolean;
  setIsOpen: any;
};

const CommandPalette = ({ isOpen, setIsOpen }: Props) => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
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
  }, []);

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        // TODO ADD CLOSE ACTIONS
      }}
      className="fixed inset-0 overflow-y-auto p-4 lg:pt-[25vh]"
    >
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm" />
      <Combobox
        value={selectedPerson}
        onChange={() => {
          // navigate user to clicked page
        }}
        as="div"
        className="relative bg-white max-w-3xl mx-auto rounded-xl shadow-2xl w-full ring-1 ring-black/5 divide-y"
      >
        <div className="flex items-center px-4">
          <SearchIcon className="h-6 w-6 text-gray-500" />
          <Combobox.Input
            className="w-full bg-transparent border-0 focus:ring-0 text-sm text-gray-800 placeholder-gray-400 h-12 rounded-lg px-2 mx-2"
            placeholder="Search..."
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="kbd text-xs font-semibold text-gray-500">ESC</div>
        </div>
        <Combobox.Options className="py-4 text-sm max-h-96 overflow-y-auto">
          {filteredPeople.map((person) => (
            <Combobox.Option key={person.id} className="px-2 md:px-8 py-1">
              {({ active }) => (
                <div
                  className={`flex items-center px-4 py-3 gap-y-1 rounded-xl ${
                    active ? "bg-primary text-white" : "bg-slate-100"
                  }`}
                >
                  <div className={`flex flex-col`}>
                    <span className="text-xs">{person.category}</span>
                    <span className="text-lg">{person.name}</span>
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
      </Combobox>
    </Dialog>
  );
};

export default CommandPalette;
