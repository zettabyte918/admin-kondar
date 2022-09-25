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
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
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
        <div className="flex-1 flex justify-between sm:justify-end">
          <a
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            href="#"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Précédent
          </a>
          <a
            onClick={() => nextPage()}
            disabled={!canNextPage}
            href="#"
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Suivant
          </a>
        </div>
      </div>
    </div>
  );
};
