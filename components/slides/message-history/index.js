/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import axios from "axios";

const options = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};

export default function MessagesHistory({ open, setOpen }) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);

  const getMessages = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/messages?pagination[limit]=10&sort[0]=id:desc`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer  ${session?.accessToken}`,
          },
        }
      )
      .then((response) => {
        setMessages(response.data.data);
      });
  };

  console.log(messages);

  useEffect(() => {
    if (open) getMessages();
  }, [open]);
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

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
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
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Historique des messages
                      </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-6 flex-1">
                    {/* Replace with your content */}
                    <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
                      {messages?.map((message) => (
                        <Disclosure as="div" key={message.id} className="mt-2">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-indigo-100 px-4 py-2 text-left text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                                <span>
                                  {new Date(
                                    message.attributes.createdAt
                                  ).toLocaleDateString("fr-FR", options)}
                                </span>
                                <ChevronUpIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-indigo-500`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                <div className="flex flex-col space-y-2">
                                  <div className="text-xs">
                                    {message.attributes.message}
                                  </div>
                                  <div className="space-x-1">
                                    {message.attributes.students
                                      .split("-")
                                      .map((student) => (
                                        <span
                                          key={student}
                                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-900"
                                        >
                                          {student}
                                        </span>
                                      ))}
                                  </div>
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </div>
                    {/* /End replace */}
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
