import { useEffect, useReducer, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  ArrowLeftIcon,
  CashIcon,
  CheckIcon,
  UsersIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";
import { HeaderText } from "../../../components/layout";
import { useApi } from "../../../axios";
import AllStudentsList from "../../../components/slides/group-slides/all";
import axios from "axios";
import AllAbsences from "../../../components/slides/group-slides/absences";

const AjouterGroupes = () => {
  const {
    getGroupById,
    updateGroupById,
    deleteGroupById,
    getAllStudentsByGroupeId,
    getAllAbsencesByGroupeId,
  } = useApi();
  const router = useRouter();
  const { id } = router.query;

  const [group, setGroup] = useState({});
  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {}
  );
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ [name]: value });
  };

  const updateGroup = async () => {
    return updateGroupById({
      id,
      ...inputValues,
    });
  };

  const deleteGroup = async () => {
    return await deleteGroupById(id);
  };

  useEffect(() => {
    if (id) {
      const fetchGroupByid = async () => {
        const group = await getGroupById(id);
        setGroup(group.data.data.attributes);
      };
      fetchGroupByid();
    }
  }, [id]);

  // groups slides
  // all students data
  const [openSlideAllStudents, setOpenAllStudents] = useState(false);
  const [students, setAllStudents] = useState([]);

  // all students absences
  const [openSlideAllAbsences, setOpenAllAbsences] = useState(false);
  const [absences, setAllAbsences] = useState([]);

  useEffect(() => {
    getAllStudentsByGroupeId(id).then(({ data }) => setAllStudents(data));
    getAllAbsencesByGroupeId(id).then(({ data }) => setAllAbsences(data));
  }, []);

  return (
    <>
      <Head>
        <title>Ajouter un groupe</title>
      </Head>
      <HeaderText text={"Ajouter un nouveau groupe"} />
      <AllStudentsList
        open={openSlideAllStudents}
        setOpen={setOpenAllStudents}
        users={students}
        title="liste des élèves dans ce groupe"
      />
      <AllAbsences
        open={openSlideAllAbsences}
        setOpen={setOpenAllAbsences}
        absences={absences}
        title="liste des élèves absents dans ce groupe"
      />
      <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 py-2 justify-between">
        <div>
          <div className="">
            <Link href="/groupes">
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
        <div className="space-x-1 md:space-x-2">
          {/* <button>
            <a
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <CashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Impayé
            </a>
          </button>
          <button>
            <a
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Payé
            </a>
          </button> */}
          <button>
            <a
              type="button"
              onClick={() => setOpenAllAbsences(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <InformationCircleIcon
                className="-ml-1 mr-2 h-5 w-5"
                aria-hidden="true"
              />
              Absents
            </a>
          </button>
          <button>
            <a
              type="button"
              onClick={() => setOpenAllStudents(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <UsersIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Tous
            </a>
          </button>
        </div>
      </div>
      <div className=" relative flex-1 ">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className=" md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="nom"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nom du groupe
                      </label>
                      <input
                        onChange={handleOnChange}
                        defaultValue={group?.nom || ""}
                        type="text"
                        name="nom"
                        id="nom"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description du groupe
                        </label>
                        <div className="mt-1">
                          <textarea
                            onChange={handleOnChange}
                            defaultValue={group?.description || ""}
                            id="description"
                            name="description"
                            rows={3}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="description..."
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          brève description simple pour ce groupe.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10  sm:mt-0">
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="flex justify-between px-4 py-3 bg-gray-200 text-right sm:px-6 space-x-2">
            <button
              type="button"
              onClick={deleteGroup}
              className="inline-flex justify-center w-full md:w-fit py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Supprimer ce group
            </button>
            <button
              type="button"
              onClick={updateGroup}
              className="inline-flex justify-center w-full md:w-fit py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

AjouterGroupes.layout = "GlobalLayout";
export default AjouterGroupes;
