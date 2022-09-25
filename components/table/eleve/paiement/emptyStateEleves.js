/* This example requires Tailwind CSS v2.0+ */
import Link from "next/link";
import { PlusIcon, UserAddIcon } from "@heroicons/react/outline";

export function EmptyStateEleves() {
  return (
    <div className="w-auto text-center py-10">
      <UserAddIcon
        className="mx-auto  h-12 w-12 text-gray-400"
        aria-hidden="true"
      />

      <h3 className="mt-2 text-sm font-medium text-gray-500">
        Pas d&apos;étudiants
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Commencez par créer un nouvel étudiant.
      </p>
    </div>
  );
}
