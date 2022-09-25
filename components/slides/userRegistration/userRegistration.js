/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useUserRegistration } from "./context";
import { XIcon } from "@heroicons/react/outline";
import { divisions } from "./divisions";
import { packs } from "./packs";

import { RadioGroup } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function UserRegistration() {
  const { open, setOpen } = useUserRegistration();
  const [selected, setSelected] = useState(packs[0]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-hidden"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-700 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-2xl">
                <div className="h-full flex flex-col py-6 bg-gray-100 shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Ajouter un nouvel étudiant
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 relative flex-1 md:px-4 sm:px-6">
                    <div className="md:grid md:grid-cols-2 md:gap-6">
                      <div className="mt-5 md:mt-0 md:col-span-2">
                        <form action="#" method="POST">
                          <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                              <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    htmlFor="first-name-parents"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Nom parents
                                  </label>
                                  <input
                                    type="text"
                                    name="first-name-parents"
                                    id="first-name-parents"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    htmlFor="last-name-parents"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Prénom parents
                                  </label>
                                  <input
                                    type="text"
                                    name="last-name-parents"
                                    id="last-name-parents"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    htmlFor="first-name-student"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Nom élève
                                  </label>
                                  <input
                                    type="text"
                                    name="first-name-student"
                                    id="first-name-student"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    htmlFor="last-name-student"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Prénom élève
                                  </label>
                                  <input
                                    type="text"
                                    name="last-name-student"
                                    id="last-name-student"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  />
                                </div>

                                <div className="col-span-6">
                                  <div>
                                    <label
                                      htmlFor="about"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Les matières demandées
                                    </label>
                                    <div className="mt-1">
                                      <textarea
                                        id="subjects"
                                        name="subjects"
                                        rows={3}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                        placeholder="math - anglais ..."
                                        defaultValue={""}
                                      />
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">
                                      les matières requises pour cet étudiant.
                                    </p>
                                  </div>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    htmlFor="email-address"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Email address
                                  </label>
                                  <input
                                    type="text"
                                    name="email-address"
                                    id="email-address"
                                    autoComplete="email"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    htmlFor="email-address"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Numéro téléphone
                                  </label>
                                  <input
                                    type="number"
                                    name="tel"
                                    id="tel"
                                    autoComplete="email"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                  <label
                                    htmlFor="country"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Niveau
                                  </label>
                                  <select
                                    id="niveau"
                                    name="niveau"
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  >
                                    {divisions.map((division, id) => (
                                      <option key={id} value={division.name}>
                                        {division.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="col-span-6">
                                  <div>
                                    <label
                                      htmlFor="about"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Remarque des parents
                                    </label>
                                    <div className="mt-1">
                                      <textarea
                                        id="subjects"
                                        name="remarque-parents"
                                        rows={3}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                        placeholder="des remarques..."
                                        defaultValue={""}
                                      />
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">
                                      les remarques des parents requises pour
                                      cet étudiant.
                                    </p>
                                  </div>
                                </div>

                                <div className="col-span-6">
                                  <div>
                                    <label
                                      htmlFor="about"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Remarque du center
                                    </label>
                                    <div className="mt-1">
                                      <textarea
                                        id="subjects"
                                        name="remarque-center"
                                        rows={3}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                        placeholder="des remarques..."
                                        defaultValue={""}
                                      />
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">
                                      les remarques du center requises pour cet
                                      étudiant.
                                    </p>
                                  </div>
                                </div>

                                <div className="col-span-6">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                      Pack
                                    </label>
                                    <div className="mt-1">
                                      <RadioGroup
                                        value={selected}
                                        onChange={setSelected}
                                      >
                                        <RadioGroup.Label className="sr-only">
                                          Privacy setting
                                        </RadioGroup.Label>
                                        <div className="bg-white rounded-md -space-y-px">
                                          {packs.map((setting, settingIdx) => (
                                            <RadioGroup.Option
                                              key={settingIdx}
                                              value={setting}
                                              className={({ checked }) =>
                                                classNames(
                                                  settingIdx === 0
                                                    ? "rounded-tl-md rounded-tr-md"
                                                    : "",
                                                  settingIdx ===
                                                    packs.length - 1
                                                    ? "rounded-bl-md rounded-br-md"
                                                    : "",
                                                  checked
                                                    ? "bg-indigo-50 border-indigo-200 z-10"
                                                    : "border-gray-200",
                                                  "relative border p-4 flex cursor-pointer focus:outline-none"
                                                )
                                              }
                                            >
                                              {({ active, checked }) => (
                                                <>
                                                  <span
                                                    className={classNames(
                                                      checked
                                                        ? "bg-indigo-600 border-transparent"
                                                        : "bg-white border-gray-300",
                                                      active
                                                        ? "ring-2 ring-offset-2 ring-indigo-500"
                                                        : "",
                                                      "h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center"
                                                    )}
                                                    aria-hidden="true"
                                                  >
                                                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                                                  </span>
                                                  <div className="ml-3 flex flex-col">
                                                    <RadioGroup.Label
                                                      as="span"
                                                      className={classNames(
                                                        checked
                                                          ? "text-indigo-900"
                                                          : "text-gray-900",
                                                        "block text-sm font-medium"
                                                      )}
                                                    >
                                                      {setting.name}
                                                    </RadioGroup.Label>
                                                    <RadioGroup.Description
                                                      as="span"
                                                      className={classNames(
                                                        checked
                                                          ? "text-indigo-700"
                                                          : "text-gray-500",
                                                        "block text-sm"
                                                      )}
                                                    >
                                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                                                        {setting.description}
                                                      </span>
                                                    </RadioGroup.Description>
                                                  </div>
                                                </>
                                              )}
                                            </RadioGroup.Option>
                                          ))}
                                        </div>
                                      </RadioGroup>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5">
                      <div className="border-t border-gray-200" />
                    </div>
                  </div>

                  <div className="mt-10 md:px-4 sm:mt-0">
                    <div className="md:grid md:grid-cols-2 md:gap-6">
                      <div className="mt-5 md:mt-0 md:col-span-2">
                        <form action="#" method="POST">
                          <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-3 bg-gray-200 text-right sm:px-6">
                              <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Ajouter un étudiant
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
