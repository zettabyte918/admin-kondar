import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useReducer, useEffect } from "react";
import {
  ArrowLeftIcon,
  CashIcon,
  PrinterIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useApi } from "../../../axios";
import { Packs, Divisions } from "../../../components/eleves/ajouter";
import { HeaderText } from "../../../components/layout";
import { Groupes } from "../../../components/eleves/ajouter/groupes";
import { UserSettingsAccess } from "../../../components/eleves/editer/modals";
import SubjectsStudent from "../../../components/slides/subject-student";

const AjouterEleve = () => {
  const [openDsactivateModal, setOpenDsactivateModal] = useState(false);

  const {
    getStudentById,
    updateStudentById,
    deactivateStudentById,
    deleteStudent,
    fetchSubjects,
  } = useApi();
  const router = useRouter();
  const { id } = router.query;

  const [student, setStudent] = useState({});
  const [selectedPack, setSelectedPack] = useState();
  const [selectedGroup, setSelectedGroup] = useState();

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

  const updateStudent = async () => {
    return updateStudentById({
      id,
      groupe: selectedGroup,
      pack: selectedPack,
      subjectsNew: subjects,
      ...inputValues,
    });
  };

  useEffect(() => {
    if (id) {
      const updateStudent = async () => {
        const student = await getStudentById(id);
        setStudent(student);
        setSelectedPack(student?.data?.pack?.id);
        setSelectedGroup(student?.data?.groupe?.id);
      };
      updateStudent();
    }
    return () => {
      setInputValues({});
      setStudent({});
      setSelectedPack({});
      setSelectedGroup({});
    };
  }, [id]);

  useEffect(() => {
    if (student && student?.data) {
      const studentSubjects = student.data.subjectsNew.map(
        (subject) => subject.name
      );
      console.log(studentSubjects);
      fetchSubjects().then((response) =>
        setSubjects(
          response.data.data.map((data) => ({
            ...data,
            selected: studentSubjects.includes(data.attributes.name),
          }))
        )
      );
    }
  }, [student]);

  return (
    <>
      <Head>
        <title>Ajouter un élève</title>
      </Head>
      <HeaderText text={"Modifier cet élève"} />
      <SubjectsStudent
        open={openSubjects}
        setOpen={setOpenSubjects}
        subjects={subjects}
        setSubjects={setSubjects}
      />
      <UserSettingsAccess
        id={id}
        student={student}
        open={openDsactivateModal}
        setOpen={setOpenDsactivateModal}
      />
      <div className="flex py-2 justify-between">
        <div className="space-x-2">
          <button
            onClick={() => router.back()}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Retour
          </button>
        </div>
        <div className="space-x-2">
          <Link href={`/eleves/editer/${id}/paiement`}>
            <a className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Paiement
              <CashIcon className="ml-1 h-5 w-5" aria-hidden="true" />
            </a>
          </Link>
          <button
            onClick={() => setOpenDsactivateModal(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Paramètre d&apos;accès
            <InformationCircleIcon
              className="ml-1 h-5 w-5"
              aria-hidden="true"
            />
          </button>
          <button
            onClick={() => {
              if (confirm("Êtes-vous sûr de vouloir supprimer cet élève ?")) {
                // Save it!
                deleteStudent(student?.data?.id);
              } else {
                // Do nothing!
                console.log("Thing was not saved to the database.");
              }
            }}
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Supprimer
            <XCircleIcon className="ml-1 h-5 w-5" aria-hidden="true" />
          </button>
          <Link href={`/eleves/imprimer/${id}`}>
            <a className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Imprimer
              <PrinterIcon className="ml-1 h-5 w-5" aria-hidden="true" />
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
                        htmlFor="name_parent"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nom complet des parents
                      </label>
                      <input
                        onChange={handleOnChange}
                        type="text"
                        defaultValue={student?.data?.name_parent || ""}
                        name="name_parent"
                        id="name_parent"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="name_eleve"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nom complet de l&apos;élève
                      </label>
                      <input
                        onChange={handleOnChange}
                        defaultValue={student?.data?.name_eleve || ""}
                        type="text"
                        name="name_eleve"
                        id="name_eleve"
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
                            Tous les matieres demandées
                          </button>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          les matières requises pour cet étudiant.
                        </p>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        onChange={handleOnChange}
                        defaultValue={student?.data?.email || ""}
                        type="text"
                        name="email"
                        id="email"
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
                        defaultValue={student?.data?.tel || ""}
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
                      <Divisions
                        selectedDivision={student?.data?.grade || ""}
                        handleOnChange={handleOnChange}
                      />
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
                            defaultValue={student?.data?.remarque_parents || ""}
                            id="remarque_parents"
                            name="remarque_parents"
                            rows={3}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="des remarques..."
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
                            defaultValue={student?.data?.remarque_center || ""}
                            id="remarque_center"
                            name="remarque_center"
                            rows={3}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="des remarques..."
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
                    onClick={updateStudent}
                    className="inline-flex w-full md:w-fit justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Enregistrer
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
