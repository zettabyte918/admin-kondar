import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useAddPayment } from "./context";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";
import { useApi } from "../../../axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function AddPayment() {
  const router = useRouter();
  const { id } = router.query;

  const { addPayment } = useApi();

  const { open, setOpenSlide } = useAddPayment();
  const [ready, setReady] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);

  const [startDate, endDate] = dateRange;

  const addpayment = async () => {
    await addPayment(startDate, endDate, id);
  };

  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-20 inset-0 overflow-hidden"
        onClose={setOpenSlide}
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
                            Ajouter un nouvel paiement:
                          </Dialog.Title>
                        </div>
                      </Transition>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => setOpenSlide(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    <div className="flow-root">
                      <div>
                        <label className="block text-sm font-medium text-red-700 mb-1">
                          Date de payment:
                        </label>
                        <DatePicker
                          fixedHeight
                          selectsRange={true}
                          startDate={startDate}
                          endDate={endDate}
                          onChange={(update) => {
                            setDateRange(update);
                          }}
                          withPortal
                        />
                        <p className="mt-2 text-sm text-red-500">
                          Remplir si le paiement est effectué et validé.
                        </p>
                      </div>
                      <div className="py-3 text-left">
                        <button
                          type="button"
                          disabled={!dateRange[0]}
                          onClick={() => setDateRange([null, null])}
                          className={classNames(
                            dateRange[0] || dateRange[0]
                              ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                              : "bg-gray-200 focus:ring-gray-300",
                            "inline-flex w-full md:w-fit justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                          )}
                        >
                          Réinitialiser cette date
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3">
                    <button
                      type="button"
                      onClick={addpayment}
                      className="inline-flex w-full  justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Ajouter cet paiement
                    </button>
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

export { AddPayment };
