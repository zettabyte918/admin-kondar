import Head from "next/head";
import { useState, useReducer, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useApi } from "../../../axios";
import { Packs, Divisions } from "../../../components/eleves/ajouter";
import { HeaderText } from "../../../components/layout";
import { Groupes } from "../../../components/eleves/ajouter/groupes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SubjectsStudent from "../../../components/slides/subject-student";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AjouterEleve = () => {
  const { addStudent, fetchSubjects } = useApi();

  const [selectedPack, setSelectedPack] = useState();
  const [selectedGroup, setSelectedGroup] = useState();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  //subject students slide to select subjects (matieres)
  const [subjects, setSubjects] = useState([]);
  const [openSubjects, setOpenSubjects] = useState(false);

  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {}
  );
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ [name]: value });
  };

  const createStudent = async () => {
    await addStudent(
      selectedPack,
      selectedGroup,
      inputValues,
      dateRange,
      subjects
    );
  };

  useEffect(() => {
    fetchSubjects().then((response) =>
      setSubjects(
        response.data.data.map((data) => ({ ...data, selected: false }))
      )
    );
  }, []);

  return (
    <>
      <Head>
        <title>Ajouter un élève</title>
      </Head>
      <SubjectsStudent
        open={openSubjects}
        setOpen={setOpenSubjects}
        subjects={subjects}
        setSubjects={setSubjects}
      />
      <HeaderText text={"Ajouter un nouvel élève"} />
      <div className="flex py-2 justify-start">
        <div className="">
          <Link href="/eleves">
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
      <div className=" relative flex-1 ">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className=" md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last_name_parents"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nom parents
                      </label>
                      <input
                        onChange={handleOnChange}
                        type="text"
                        name="last_name_parents"
                        id="last_name_parents"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first_name_parents"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Prénom parents
                      </label>
                      <input
                        onChange={handleOnChange}
                        type="text"
                        name="first_name_parents"
                        id="first_name_parents"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last_name_student"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nom élève
                      </label>
                      <input
                        onChange={handleOnChange}
                        type="text"
                        name="last_name_student"
                        id="last_name_student"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first_name_student"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Prénom élève
                      </label>
                      <input
                        onChange={handleOnChange}
                        type="text"
                        name="first_name_student"
                        id="first_name_student"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6">
                      <div>
                        <label
                          htmlFor="subjects"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Les matières demandées
                        </label>
                        <div className="mt-1">
                          <button
                            onClick={() => setOpenSubjects(true)}
                            id="subjects"
                            type="button"
                            className="text-center w-full items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Sélectionner tous les matieres demandées
                          </button>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          les matières requises pour cet étudiant.
                        </p>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email_address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        onChange={handleOnChange}
                        type="text"
                        name="email_address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email_address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Numéro téléphone
                      </label>
                      <input
                        onChange={handleOnChange}
                        type="number"
                        name="tel"
                        id="tel"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="niveau"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Niveau
                      </label>
                      <Divisions handleOnChange={handleOnChange} />
                    </div>

                    <div className="col-span-6">
                      <div>
                        <label
                          htmlFor="remarque_parents"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Remarque des parents
                        </label>
                        <div className="mt-1">
                          <textarea
                            onChange={handleOnChange}
                            id="remarque_parents"
                            name="remarque_parents"
                            rows={3}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="des remarques..."
                            defaultValue={""}
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          les remarques des parents requises pour cet étudiant.
                        </p>
                      </div>
                    </div>

                    <div className="col-span-6">
                      <div>
                        <label
                          htmlFor="remarque_center"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Remarque du center
                        </label>
                        <div className="mt-1">
                          <textarea
                            onChange={handleOnChange}
                            id="remarque_center"
                            name="remarque_center"
                            rows={3}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="des remarques..."
                            defaultValue={""}
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          les remarques du center requises pour cet étudiant.
                        </p>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Pack
                        </label>
                        <div className="mt-1">
                          <Packs
                            selected={selectedPack}
                            setSelected={setSelectedPack}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Groupe
                        </label>
                        <div className="mt-1">
                          <Groupes
                            selected={selectedGroup}
                            setSelected={setSelectedGroup}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-6">
                      <div className="flex justify-between items-center border-4 border-dashed border-gray-200 rounded-lg p-2">
                        <div>
                          <label className="block text-sm font-medium text-red-700 mb-1">
                            Date de payment:
                          </label>
                          <DatePicker
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => {
                              setDateRange(update);
                            }}
                            withPortal
                          />
                          <p className="mt-2 text-sm text-red-500">
                            Remplir si le paiement est effectué et validé.
                          </p>
                        </div>
                        <div className="px-4 py-3 text-right sm:px-6">
                          <button
                            type="button"
                            disabled={!dateRange[0] || !dateRange[1]}
                            onClick={() => setDateRange([null, null])}
                            className={classNames(
                              dateRange[0] || dateRange[0]
                                ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                                : "bg-gray-200 focus:ring-gray-300",
                              "inline-flex w-full md:w-fit justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                            )}
                          >
                            Réinitialiser cette date
                          </button>
                        </div>
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

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-3 bg-gray-200 text-right sm:px-6">
                  <button
                    type="button"
                    onClick={createStudent}
                    className="inline-flex w-full md:w-fit justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Ajouter cet élève
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

AjouterEleve.layout = "GlobalLayout";
export default AjouterEleve;
