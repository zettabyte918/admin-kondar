/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useAsyncDebounce } from "react-table";
import { CheckIcon, SelectorIcon, XIcon } from "@heroicons/react/solid";
import { divisions } from "../../eleves/ajouter/divisions_attributes";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDownFilter({ setFilter }) {
  const divs = useMemo(() => divisions, []);

  const [selected, setSelected] = useState(divs[0]);

  const onChanges = useAsyncDebounce((value) => {
    setSelected(value);
    if (value.id === 100) return setFilter(undefined);
    setFilter(value.name || undefined);
  }, 50);

  return (
    <div className="flex space-x-2">
      <Listbox value={selected} onChange={onChanges}>
        {({ open }) => (
          <>
            <div className="relative min-w-fit w-72">
              <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span className="block truncate">{selected.name}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {divs.map((person) => (
                    <Listbox.Option
                      key={person.id}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-indigo-600" : "text-gray-900",
                          "cursor-default select-none relative py-2 pl-3 pr-9"
                        )
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {person.name}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      <div
        onClick={() => {
          onChanges(divisions[0]);
        }}
        className={classNames(
          selected?.id === 100
            ? "hidden"
            : "hover:bg-indigo-100 rounded-md p-2 cursor-pointer text-indigo-700"
        )}
      >
        <XIcon className="h-5 w-5" aria-hidden="true" />
      </div>
    </div>
  );
}
