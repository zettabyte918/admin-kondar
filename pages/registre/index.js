import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useApi } from "../../axios";
import { useNotification } from "../../components/Notification";
import { HeaderText } from "../../components/layout";
import { ViewListIcon } from "@heroicons/react/solid";

const Absences = () => {
  const { addNotification } = useNotification();
  const rounter = useRouter();

  const [groups, setGroups] = useState([]);
  const { getAllGroups } = useApi();

  useEffect(async () => {
    getAllGroups().then((response) => setGroups(response.data));
  }, []);
  return (
    <>
      <div className="flex mb-4 justify-between text-center align-middle">
        <HeaderText text={"Liste avec tous les groupes"} />
        <Link href="/registre/liste-absence">
          <a
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ViewListIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Liste des absences
          </a>
        </Link>
      </div>

      <div>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {groups.map((groupe) => (
            <li
              key={groupe.id}
              className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <div className="flex-1 flex flex-col p-8">
                <h3 className="mt-6 text-gray-900 text-sm font-medium">
                  {groupe.nom}
                </h3>
                <dl className="mt-1 flex-grow flex flex-col justify-between">
                  <dt className="sr-only">Title</dt>
                  <dd className="text-gray-500 truncate text-sm">
                    {groupe.description}
                  </dd>
                  <dt className="sr-only">Role</dt>
                  <dd className="mt-3">
                    <span className="px-2 py-1 text-indigo-800 text-xs font-medium bg-indigo-100 rounded-full">
                      {groupe.students.length} élèves
                    </span>
                  </dd>
                </dl>
              </div>
              <div>
                <div className="-mt-px flex divide-x bg-indigo-50 hover:bg-indigo-100 divide-gray-200">
                  <div className="-ml-px w-0 flex-1 flex">
                    <button
                      onClick={() => {
                        if (!groupe.students.length) {
                          addNotification(
                            "DANGER",
                            "Groupe vide",
                            "Il n'y a pas d'élèves dans ce groupe"
                          );
                        } else {
                          rounter.push(`/registre/${groupe.id}`);
                        }
                      }}
                      className="relative disabled:bg- w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-indigo-800"
                    >
                      <span className="ml-3">Ouvrir</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

Absences.layout = "GlobalLayout";
export default Absences;
