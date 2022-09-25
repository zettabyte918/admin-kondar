/* This example requires Tailwind CSS v2.0+ */
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/solid";

export function EmptyStateEleves() {
  return (
    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mt-20 md:mt-24 h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          Pas d&apos;étudiants
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Commencez par créer un nouvel étudiant.
        </p>
        <div className="mt-6">
          <Link href="/eleves/ajouter">
            <a
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Nouvel étudiant
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
