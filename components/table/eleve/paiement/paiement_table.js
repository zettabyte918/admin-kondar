import { Transition } from "@headlessui/react";
import { useMemo, useEffect, useState, Fragment, memo } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { COLUMNS } from "./columns";
import { PlusIcon } from "@heroicons/react/solid";
import { EmptyStateEleves } from "./emptyStateEleves";
import { GlobalFilter } from "./filter";
import { TableFooter } from "./tableFooter";
import { AddPayment, useAddPayment } from "../../../slides/addpayment";

const TablePaiement = memo(({ datas }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => datas, [datas]);
  const [open, setOpen] = useState(false);
  const { setOpenSlide } = useAddPayment();

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
      initialState: { pageSize: 5, pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );
  const { globalFilter, pageIndex, pageSize } = state;

  useEffect(() => {
    setOpen(true);
    return () => {
      setOpen(false);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row py-2 justify-between">
        <Transition
          appear={true}
          show={open}
          as={Fragment}
          enter="transform ease-out duration-500 transition"
          enterFrom="-translate-x-4 opacity-0"
          enterTo="-translate-x-0 opacity-100"
          leave="transition ease-in duration-200"
          leaveFrom="translate-x-0 opacity-100"
          leaveTo="translate-x-2 opacity-0"
        >
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
        </Transition>
        <Transition
          appear={true}
          show={open}
          as={Fragment}
          enter="transform ease-out duration-500 transition"
          enterFrom="translate-x-4 opacity-0"
          enterTo="translate-x-0 opacity-100"
          leave="transition ease-in duration-200"
          leaveFrom="translate-x-0 opacity-100"
          leaveTo="translate-x-2 opacity-0"
        >
          <div className="flex justify-end  md:flex-1 w-full mb-2 md:mb-0">
            <button
              type="button"
              onClick={() => setOpenSlide(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Ajouter un paiement
            </button>
          </div>
        </Transition>
      </div>
      <Transition
        appear={true}
        show={!!pageCount || open}
        as={Fragment}
        enter="transform ease-out duration-500 transition"
        enterFrom="translate-y-2 blur-sm opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition ease-in duration-200"
        leaveFrom="translate-x-0 opacity-100"
        leaveTo="translate-x-2 opacity-0"
      >
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 rounded-md">
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
                    {pageCount ? (
                      <>
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
                      </>
                    ) : (
                      <tr>
                        <td colSpan={5}>
                          <EmptyStateEleves />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
});

TablePaiement.displayName = "TablePaiement";
export { TablePaiement };
