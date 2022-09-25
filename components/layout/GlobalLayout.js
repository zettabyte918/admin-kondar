import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  LogoutIcon,
  UserCircleIcon,
  FolderIcon,
  HomeIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
  ChatAltIcon,
  UploadIcon,
  DocumentSearchIcon,
  AcademicCapIcon,
  CalendarIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function GlobalLayout({ children }) {
  const { status, data } = useSession();
  const router = useRouter();
  const { pathname } = router;

  const navigation = [
    {
      name: "Dashboard",
      role: ["admin"],
      href: "/stats",
      icon: HomeIcon,
      current: pathname === "/stats",
    },
    {
      name: "Registre",
      role: ["admin", "prof"],
      href: "/registre",
      icon: DocumentSearchIcon,
      current: pathname.startsWith("/registre"),
    },
    {
      name: "Groups",
      role: ["admin"],
      href: "/groupes",
      icon: FolderIcon,
      current: pathname.startsWith("/groupes"),
    },
    {
      name: "Eleves",
      role: ["admin"],
      href: "/eleves",
      icon: UsersIcon,
      current: pathname.startsWith("/eleves"),
    },
    {
      name: "Messagerie",
      role: ["admin"],
      href: "/sms",
      icon: ChatAltIcon,
      current: pathname.startsWith("/sms"),
    },
    {
      name: "Pièces jointes",
      role: ["admin", "prof"],
      href: "/fichier",
      icon: UploadIcon,
      current: pathname.startsWith("/fichier"),
    },
    {
      name: "Enseignants",
      role: ["admin"],
      href: "/enseignants",
      icon: AcademicCapIcon,
      current: pathname.startsWith("/enseignants"),
    },
    {
      name: "Calendrier",
      role: ["prof"],
      href: "/calendrier",
      icon: CalendarIcon,
      current: pathname.startsWith("/calendrier"),
    },
  ];
  const adminNavigation = [{ name: "se déconnecter", href: "#" }];

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  });
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex flex-col px-4">
                <span className=" font-bold text-indigo-200 text-2xl">
                  KONDAR SCHOOL
                </span>
                <span className="font-semibold text-gray-300 text-xs">
                  CENTER DE FORMATION SCOLAIRE
                </span>
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {navigation.map((item) => {
                    if (item.role.includes(data?.user?.role?.name))
                      return (
                        <Link key={item.name} href={item.href}>
                          <a
                            className={classNames(
                              item.current
                                ? "bg-indigo-800 text-white"
                                : "text-indigo-100 hover:bg-indigo-600",
                              "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                            )}
                          >
                            <item.icon
                              className="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        </Link>
                      );
                  })}
                </nav>
              </div>
              <div className="flex bottom-0 bg-indigo-900 p-4 -mb-4">
                <div className="flex-shrink-0 w-full group block">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-sm font-medium text-white">
                          {status === "authenticated"
                            ? data.user.name_eleve
                            : ""}
                        </p>
                        <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                          {status === "authenticated"
                            ? data.user.role.name
                            : ""}
                        </p>
                      </div>
                    </div>
                    <div>
                      <LogoutIcon
                        onClick={() => {
                          signOut();
                        }}
                        className="mr-4 flex-shrink-0 h-7 w-7 text-indigo-300"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden bg-indigo-700 md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <div className="flex flex-col flex-shrink-0 pb-4 px-4">
              <Transition
                appear={true}
                show={ready}
                as={Fragment}
                enter="transform ease-out duration-500 transition"
                enterFrom="-translate-x-4 opacity-0"
                enterTo="-translate-x-0 opacity-100"
              >
                <span className=" font-bold text-gray-200 text-2xl">
                  KONDAR SCHOOL
                </span>
              </Transition>

              <Transition
                appear={true}
                show={ready}
                as={Fragment}
                enter="transform ease-out duration-500 transition"
                enterFrom="-translate-y-2 opacity-0"
                enterTo="translate-y-0 opacity-100"
              >
                <span className="font-semibold text-indigo-300 text-xs">
                  CENTER DE FORMATION SCOLAIRE
                </span>
              </Transition>
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <Transition
                appear={true}
                show={ready}
                as={Fragment}
                enter="transform ease-out duration-500 transition"
                enterFrom="-translate-y-2 opacity-0"
                enterTo="translate-y-0 opacity-100"
              >
                <nav className="flex-1 px-2 space-y-1">
                  {navigation?.map((item, id) => {
                    if (item.role.includes(data?.user?.role?.name))
                      return (
                        <Link key={id} href={item.href}>
                          <a
                            className={classNames(
                              item.current
                                ? "bg-indigo-800 text-white"
                                : "text-indigo-100 hover:bg-indigo-600",
                              "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                            )}
                          >
                            <item.icon
                              className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        </Link>
                      );
                  })}
                </nav>
              </Transition>
              <div className="flex bottom-0 bg-indigo-900 p-4 -mb-4">
                <div className="flex-shrink-0 w-full group block">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-sm font-medium text-white">
                          {status === "authenticated"
                            ? data.user.name_eleve
                            : ""}
                        </p>
                        <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                          {status === "authenticated"
                            ? data.user.role.name
                            : ""}
                        </p>
                      </div>
                    </div>
                    <div>
                      <button>
                        <LogoutIcon
                          onClick={() => {
                            signOut();
                          }}
                          className="mr-4 flex-shrink-0 h-7 w-7 text-indigo-300"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow md:hidden">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 "
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            {/* todo title <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                Dashboard
              </h1>
            </div> */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {status === "authenticated" ? children : null}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
