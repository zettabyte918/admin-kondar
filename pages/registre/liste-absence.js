import Link from "next/link";
import Head from "next/head";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { HeaderText } from "../../components/layout";
import { useEffect, useState } from "react";
import { useApi } from "../../axios/api";

const AbsencesList = () => {
  return (
    <>
      <Head>
        <title>Liste des absences</title>
      </Head>
      <HeaderText text={"Liste des absences"} />
      <div className="flex py-2 justify-start">
        <div className="">
          <Link href="/registre">
            <a
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <ArrowLeftIcon
                className="-ml-1 mr-2 h-5 w-5"
                aria-hidden="true"
              />
              Retour
            </a>
          </Link>
        </div>
      </div>
      <TableList />
    </>
  );
};

AbsencesList.layout = "GlobalLayout";

export default AbsencesList;

/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

const options = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};

function TableList() {
  const { getAllAbsents, deleteAbsents } = useApi();

  const [absents, setAbsents] = useState([]);
  const [meta, setMeta] = useState([]);

  const next = () => {
    getAbsentsBypage(meta.page + 1);
  };
  const back = () => {
    getAbsentsBypage(meta.page - 1);
  };

  const deleteAbsent = (id) => {
    deleteAbsents(id).then(() => {
      setAbsents((absents) => {
        return absents.filter((absent) => absent.id != id);
      });
    });
  };

  const getAbsentsBypage = (page = 1) => {
    getAllAbsents(page).then(({ data }) => {
      setAbsents(data.data);
      setMeta(data.meta.pagination);
    });
  };

  useEffect(() => {
    getAbsentsBypage(1);
  }, []);

  return (
    <>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Nom
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Matiere
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">supprimer</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {absents?.length > 0 &&
                    absents?.map((absent) => (
                      <tr
                        key={absent.id}
                        className="hover:bg-gray-100 cursor-pointer"
                      >
                        <Link
                          href={`/eleves/editer/${absent?.attributes?.student?.data?.id}`}
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900  sm:pl-6">
                            {
                              absent?.attributes?.student?.data?.attributes
                                ?.name_eleve
                            }
                          </td>
                        </Link>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {absent?.attributes?.subject?.data?.attributes?.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(
                            absent?.attributes?.date
                          ).toLocaleDateString("fr-FR", options)}
                        </td>
                        <td className=" z-50 relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => deleteAbsent(absent.id)}
                            className="text-red-700 bg-red-50 px-2 py-1 rounded-md hover:bg-red-900 hover:text-red-50"
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  <tr>
                    <td colSpan={4}>
                      <div className="bg-white px-4 py-3 flex items-center justify-between sm:px-6">
                        <div className="flex-1 flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-700">
                              Affichage de
                              <span className="font-medium">{` ${meta.page} `}</span>
                              à
                              <span className="font-medium">
                                {` ${meta.pageSize} `}
                              </span>
                              sur
                              <span className="font-medium">
                                {` ${meta.pageCount} `}
                              </span>
                              résultats
                            </p>
                          </div>
                          <div className=" flex justify-between sm:justify-end">
                            <button
                              onClick={() => back()}
                              disabled={meta.page == 1}
                              type="button"
                              className="mr-2 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              {meta.page == 1 ? (
                                <span className=" text-gray-200">
                                  Précédent
                                </span>
                              ) : (
                                <span className=" text-gray-700">
                                  Précédent
                                </span>
                              )}
                            </button>
                            <button
                              onClick={() => next()}
                              disabled={meta.page >= meta.pageCount}
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                              {meta.page >= meta.pageCount ? (
                                <span className=" text-gray-200">Suivant</span>
                              ) : (
                                <span className=" text-gray-700">Suivant</span>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
