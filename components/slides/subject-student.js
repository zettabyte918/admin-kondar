import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { useApi } from "../../axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SubjectsStudent({
  open,
  setOpen,
  subjects,
  setSubjects,
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-30 overflow-hidden"
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

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Les matières demandées
                      </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-gray-200"></div>
                  <ul
                    role="list"
                    className="flex-1 divide-y divide-gray-200 overflow-y-auto"
                  >
                    {subjects?.map((subject, indexId) => (
                      <li key={subject.id}>
                        <div className="group relative flex items-center py-3 px-5">
                          <div
                            className="absolute inset-0 hover:bg-gray-50"
                            aria-hidden="true"
                          />
                          <div className="relative flex min-w-0 flex-1 items-center">
                            <div className="ml-4 truncate">
                              <p className="truncate text-sm font-medium text-gray-900">
                                {subject.attributes.name}
                              </p>
                            </div>
                          </div>
                          <div className="">
                            <SwitchInput
                              subject={subject}
                              subjects={subjects}
                              indexId={indexId}
                              setSubjects={setSubjects}
                            />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

/* This example requires Tailwind CSS v2.0+ */
import { Switch } from "@headlessui/react";

function SwitchInput({ subject, indexId, subjects, setSubjects }) {
  const [enabled, setEnabled] = useState(false);

  const handelchange = () => {
    let NewSubjects = [...subjects];
    NewSubjects[indexId].selected = !NewSubjects[indexId].selected;
    setSubjects(NewSubjects);
  };
  return (
    <Switch
      checked={subject.selected}
      onChange={handelchange}
      className={classNames(
        subject.selected ? "bg-indigo-600" : "bg-gray-200",
        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      )}
    >
      <span
        aria-hidden="true"
        className={classNames(
          subject.selected ? "translate-x-5" : "translate-x-0",
          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
        )}
      />
    </Switch>
  );
}
