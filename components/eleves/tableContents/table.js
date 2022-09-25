import Link from "next/link";
import { useMemo } from "react";
import { EmptyStateEleves } from "../layout/emptyStateEleves";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { PlusIcon } from "@heroicons/react/solid";
import { GlobalFilter } from "./filter";
import { TableFooter } from "./tableFooter";

export function Table({ datas, COLUMNS }) {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => datas, [datas]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 3, pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );
  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      {data.length === 0 ? (
        <EmptyStateEleves />
      ) : (
        <>
          <div className="flex py-2 justify-between">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <div className="">
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
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table
                    {...getTableProps()}
                    className="min-w-full divide-y divide-gray-200"
                  >
                    <thead className="bg-gray-50">
                      {headerGroups.map((headerGroup, id) => (
                        <tr key={id} {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column, id) => (
                            <th
                              key={id}
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              {...column.getHeaderProps()}
                            >
                              {column.render("Header")}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody
                      {...getTableBodyProps()}
                      className="bg-white divide-y divide-gray-200"
                    >
                      {page.map((row, id) => {
                        prepareRow(row);
                        return (
                          <tr key={id} {...row.getRowProps()}>
                            {row.cells.map((cell, id) => {
                              return (
                                <td
                                  key={id}
                                  className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                  {...cell.getCellProps()}
                                >
                                  {cell.render("Cell")}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}

                      <tr>
                        <td colSpan={5}>
                          <TableFooter
                            previousPage={previousPage}
                            canPreviousPage={canPreviousPage}
                            nextPage={nextPage}
                            canNextPage={canNextPage}
                            pageIndex={pageIndex}
                            pageSize={pageSize}
                            pageCount={pageCount}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
