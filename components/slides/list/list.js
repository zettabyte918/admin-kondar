import Link from "next/link";
import { CheckIcon, ThumbUpIcon, UserIcon } from "@heroicons/react/solid";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useList } from "./context";

function ListStudents() {
  const { students = [], open, setOpen } = useList();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-20 inset-0 overflow-hidden"
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
            <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Transition
                        appear={true}
                        show={ready}
                        as={Fragment}
                        enter="transform delay-500 ease-out de duration-500 transition"
                        enterFrom="-translate-y-4 opacity-0"
                        enterTo="translate-y-0 opacity-100"
                      >
                        <div>
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Liste de tous les élève dans ce groupe:
                          </Dialog.Title>
                        </div>
                      </Transition>
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
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    <div className="flow-root">
                      <Transition
                        appear={true}
                        show={ready}
                        as={Fragment}
                        enter="transform delay-700 ease-out de duration-500 transition"
                        enterFrom="translate-y-4 opacity-0"
                        enterTo="translate-y-0 opacity-100"
                      >
                        <ul role="list" className="-mb-8">
                          {students?.map((student, id) => (
                            <li key={id}>
                              <div className="relative pb-3">
                                <div className="relative flex space-x-3">
                                  <div>
                                    <span className="bg-gray-400 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white">
                                      <UserIcon
                                        className="h-5 w-5 text-white"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </div>
                                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <div>
                                      <p className="text-sm text-gray-500">
                                        <span className="text-gray-400 text-xs">
                                          {id + 1}.
                                        </span>
                                        {student?.name_eleve}
                                      </p>
                                    </div>
                                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                      <span className="inline-flex flex-shrink-0  items-center px-2.5 mr-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                        {student?.pack?.nom}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </Transition>
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

export { ListStudents };
