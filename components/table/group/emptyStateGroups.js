import { FolderAddIcon } from "@heroicons/react/outline";

export function EmptyStateGroups() {
  return (
    <div className="w-auto text-center py-10">
      <FolderAddIcon
        className="mx-auto  h-12 w-12 text-gray-400"
        aria-hidden="true"
      />

      <h3 className="mt-2 text-sm font-medium text-gray-500">Pas de groupes</h3>
      <p className="mt-1 text-sm text-gray-500">
        Commencez par créer un nouveau groupe.
      </p>
    </div>
  );
}
