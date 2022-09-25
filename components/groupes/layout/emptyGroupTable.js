/* This example requires Tailwind CSS v2.0+ */
import { XCircleIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";

const EmptyGroupTable = () => {
  return (
    <Transition
      appear={true}
      show={true}
      as={Fragment}
      enter="transform ease-out duration-500 transition"
      enterFrom="translate-y-4 opacity-0"
      enterTo="translate-y-0 opacity-100"
    >
      <div className="rounded-md bg-indigo-200 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon
              className="h-5 w-5 text-indigo-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-indigo-800">
              Aucun groupe trouvé
            </h3>
            <div className="mt-2 text-sm text-indigo-700">
              <p>
                il n&apos;y a pas de groupes dans la base de données, vous
                pouvez commencer à les ajouter maintenant !.
              </p>
            </div>
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                <Link href={"/groupes/ajouter"}>
                  <a className="bg-indigo-300 px-2 py-1.5 rounded-md text-sm font-medium text-indigo-800 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-50 focus:ring-indigo-600">
                    Nouvel groupe
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export { EmptyGroupTable };
