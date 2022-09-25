import { useState } from "react";
import { useNotification } from "../../Notification";
import { UserRemoveIcon } from "@heroicons/react/outline";

const AllUnpaidStudents = ({ unpaid }) => {
  const [open, setOpen] = useState(false);
  const { addNotification } = useNotification();

  return (
    <>
      <ModalUnpaidStudents open={open} setOpen={setOpen} unpaid={unpaid} />
      <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
        <dt>
          <div className="absolute bg-red-500 rounded-md p-3">
            <UserRemoveIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <p className="ml-16 text-sm font-medium text-gray-500 truncate">
            Les impayés
          </p>
        </dt>
        <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
          <p className="text-2xl font-semibold text-gray-900">
            {unpaid.length}
          </p>
          <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm text-right">
              <button
                onClick={() => {
                  if (unpaid.length > 0) return setOpen(true);
                  addNotification(
                    "DANGER",
                    "Les impayés",
                    "il n'y a pas d'élèves impayés"
                  );
                }}
                className="font-medium text-red-600 hover:text-red-500"
              >
                Voir tout
              </button>
            </div>
          </div>
        </dd>
      </div>
    </>
  );
};

export { AllUnpaidStudents };

/* Modal */
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";

const ModalUnpaidStudents = ({ open, setOpen, unpaid }) => {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(true)}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div>
                <Dialog.Title
                  as="h3"
                  className="inline-block text-lg bg-red-600 text-gray-50 ml-6 sm:ml-4 leading-6 font-medium px-2 py-1 rounded-md hover:bg-red-700"
                >
                  Les impayés
                </Dialog.Title>
                <div className="mt-2">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Nom
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Niveau
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Telephone
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {unpaid &&
                        unpaid.map((student) => (
                          <tr key={student.email}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {student.name_eleve}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {student.niveau}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {student.tel}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <Link href={`/eleves/editer/${student.id}`}>
                                <a className="text-red-600 hover:text-red-900">
                                  Éditer
                                </a>
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 flex justify-end mx-2">
                <button
                  type="button"
                  className="  w-full mt-3  inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-gray-50 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
