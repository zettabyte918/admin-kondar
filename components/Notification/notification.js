import { Fragment, useMemo } from "react";
import { useNotification } from "./context/notification";
import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import { generateIcon } from "./generate";

export function Notification() {
  const { notifications, deleteNotification } = useNotification();

  const notifMemo = useMemo(() => notifications, [notifications]);

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="print:hidden fixed inset-0 flex items-end z-20 px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-3 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          {notifMemo.map((notification, index) => (
            <Transition
              appear={true}
              show={notification.show}
              as={Fragment}
              key={notification.id}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-200"
              leaveFrom="translate-x-0 opacity-100"
              leaveTo="translate-x-2 opacity-0"
            >
              <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {generateIcon(notification.type)}
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.header}
                      </p>
                      <div
                        className="mt-1 text-sm text-gray-500"
                        dangerouslySetInnerHTML={{
                          __html: notification.content,
                        }}
                      ></div>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                      <button
                        className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                        onClick={() => {
                          deleteNotification(notification);
                        }}
                      >
                        <span className="sr-only">Close</span>
                        <XIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          ))}
        </div>
      </div>
    </>
  );
}
