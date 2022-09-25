import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

export const TableFooter = ({
  previousPage,
  canPreviousPage,
  nextPage,
  canNextPage,
  pageIndex,
  pageSize,
  pageCount,
}) => {
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between sm:px-6">
      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Affichage de
            <span className="font-medium">{` ${pageIndex + 1} `}</span>à
            <span className="font-medium">{` ${pageSize} `}</span>
            sur
            <span className="font-medium">{` ${pageCount} `}</span>
            résultats
          </p>
        </div>
        <div className=" flex justify-between sm:justify-end">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            type="button"
            className="mr-2 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            {canPreviousPage ? (
              <span className=" text-gray-700">Précédent</span>
            ) : (
              <span className=" text-gray-200">Précédent</span>
            )}
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            {canNextPage ? (
              <span className=" text-gray-700">Suivant</span>
            ) : (
              <span className=" text-gray-200">Suivant</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
