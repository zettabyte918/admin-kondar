import { ArrowLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useState } from "react";
import { useApi } from "../../axios";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

const GroupStudent = () => {
  const {
    query: { id },
  } = useRouter();

  const [groupe, setGroupe] = useState([]);

  const { getAllStudentsFromGroupId } = useApi();

  useEffect(() => {
    if (id)
      getAllStudentsFromGroupId(id).then((response) =>
        setGroupe(response.data)
      );
  }, [id]);

  return id && groupe && groupe?.students ? (
    <>
      <div className="mb-4">
        <Link href={"/registre"}>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:w-auto"
          >
            <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Retour
          </button>
        </Link>
      </div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">{groupe.nom}</h1>
          <p className="mt-2 text-sm text-gray-700">{groupe.description}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <StudentsTable students={groupe.students} />
          </div>
        </div>
      </div>
    </>
  ) : null;
};

GroupStudent.layout = "GlobalLayout";
export default GroupStudent;

/*
  This example requires Tailwind CSS v3.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useLayoutEffect, useRef } from "react";
import { PaperClipIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function StudentsTable({ students }) {
  const { data: session } = useSession();
  const { addNotification } = useNotification();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
  };
  const SubjectsValue = useRef();
  const RemarqueValue = useRef();
  const [openAbsent, setOpenAbsent] = useState(false);
  const [openAbsentId, setOpenAbsentId] = useState(false);
  const [openRemarque, setOpenRemarque] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);
  console.log(selectedPeople);
  useLayoutEffect(() => {
    const isIndeterminate =
      selectedPeople.length > 0 && selectedPeople.length < students?.length;
    setChecked(selectedPeople.length === students?.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedPeople]);

  function toggleAll() {
    setSelectedPeople(checked || indeterminate ? [] : students || []);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const AddOneDay = (date) => {
    if (!date) return null;
    let d = new Date(date);
    return d.setDate(d.getDate() + 1);
  };

  // create new absent record in database
  const addAbsentRecord = async () => {
    if (SubjectsValue.current.value == -1)
      return addNotification("DANGER", "Error", "Sélectionner un matière");
    const data = {
      date: startDate,
      student: selectedPeople.id,
      subject: parseInt(SubjectsValue.current.value),
    };

    axios
      .post(
        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/user/absents`,
        data,
        {
          ...config,
        }
      )
      .then((response) => {
        addNotification("SUCCESS", "SUCCESS", "Absent ajouté avec succès");
        setOpenAbsent(false);
        setSelectedPeople([]);
      });
  };

  // create new remarque record in database
  const addRemarqueRecord = async () => {
    if (RemarqueValue.current.value == "")
      return addNotification("DANGER", "Error", " Ajoutez votre remarque");
    const data = {
      remarque: RemarqueValue.current.value,
      student: selectedPeople.id,
    };

    axios
      .post(
        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/user/remarques`,
        data,
        {
          ...config,
        }
      )
      .then((response) => {
        addNotification("SUCCESS", "SUCCESS", "Remarque ajouté avec succès");
        setOpenRemarque(false);
        setSelectedPeople([]);
      });
  };

  const [studentAbsent, setStudentAbsent] = useState([]);
  const getStudentAbsents = (id) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/user/absents/${id}`,
        { ...config }
      )
      .then((response) => {
        setStudentAbsent(response.data);
        setOpenAbsentId(true);
      });
  };

  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return (
    <>
      <Modal open={openAbsentId} setOpen={setOpenAbsentId}>
        {studentAbsent?.length > 0 ? (
          <>
            <h1 className=" w-96 py-2 ml-2 font-medium">
              {studentAbsent[0]?.student?.name_eleve}:
            </h1>
            <ul
              role="list"
              className="border border-gray-200 rounded-md divide-y divide-gray-200"
            >
              {studentAbsent.map((absent, i) => (
                <li
                  key={i}
                  className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                >
                  <div className=" flex-1 flex items-center">
                    <span className="ml-2 flex-1">
                      {new Date(absent.date).toLocaleDateString(
                        "fr-FR",
                        options
                      )}
                      <span className="ml-2 bg-indigo-600 text-indigo-50 py-0.5 px-2 rounded-md font-medium">
                        {absent.subject.name}
                      </span>
                    </span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button
                      onClick={() => {
                        axios
                          .delete(
                            `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/absents/${absent.id}`,
                            { ...config }
                          )
                          .then((response) =>
                            setStudentAbsent((prev) =>
                              prev.filter((abs) => abs.id != absent.id)
                            )
                          );
                      }}
                      className="font-medium text-red-600 hover:text-red-500"
                    >
                      Effacer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <span className="px-10 py-10">
            Il n&apos;y a pas d&apos;absence enregistrée
          </span>
        )}
      </Modal>
      <Modal open={openAbsent} setOpen={setOpenAbsent}>
        <div className="p-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            fixedHeight
            inline
            minTime={setHours(setMinutes(new Date(), 0), 7)}
            maxTime={setHours(setMinutes(new Date(), 0), 23)}
          />
          <SubjectsInput SubjectsValue={SubjectsValue} config={config} />
          <div className="mt-4">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={addAbsentRecord}
            >
              Confirmer
            </button>
          </div>
        </div>
      </Modal>
      <Modal open={openRemarque} setOpen={setOpenRemarque}>
        <div className="p-4">
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              Ajoutez votre remarque
            </label>
            <div className="mt-1">
              <textarea
                rows={4}
                ref={RemarqueValue}
                name="comment"
                id="comment"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                defaultValue={""}
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={addRemarqueRecord}
            >
              Confirmer
            </button>
          </div>
        </div>
      </Modal>
      <div className="flex mt-2 justify-end space-x-2">
        <button
          disabled={!selectedPeople?.id}
          onClick={() => setOpenRemarque(true)}
          className="disabled:bg-gray-300  inline-flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:w-auto"
        >
          Envoyer des remarques
        </button>{" "}
        <button
          onClick={() => setOpenAbsent(true)}
          disabled={!selectedPeople?.id}
          className=" disabled:bg-indigo-300 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Marquer {selectedPeople.length == 0 ? "" : selectedPeople.length}{" "}
          comme absent
        </button>
      </div>
      <div className="overflow-hidden my-4 shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full table-fixed divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
                <input
                  type="checkbox"
                  className="absolute  hidden left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                  ref={checkbox}
                  checked={checked}
                  onChange={toggleAll}
                />
              </th>
              <th
                scope="col"
                className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
              >
                Name
              </th>
              <th
                scope="col"
                className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
              >
                Historique
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {students?.map((student, index) => (
              <tr
                key={index}
                className={
                  selectedPeople?.id == student.id ? "bg-gray-50" : undefined
                }
              >
                <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                  {selectedPeople?.id == student.id && (
                    <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                  )}
                  <input
                    type="checkbox"
                    id={`check-${index}`}
                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                    value={student.name_eleve}
                    checked={selectedPeople?.id == student.id}
                    onChange={(e) =>
                      setSelectedPeople(e.target.checked ? student : [])
                    }
                  />
                </td>
                <td
                  className={classNames(
                    "whitespace-nowrap py-4 pr-3 text-sm font-medium",
                    selectedPeople?.id == student.id
                      ? "text-indigo-600"
                      : "text-gray-900"
                  )}
                >
                  <label className="space-x-2" htmlFor={`check-${index}`}>
                    <span className="px-2 py-0.5 bg-indigo-600 text-gray-50 rounded">
                      {index + 1}
                    </span>
                    <span>{student.name_eleve}</span>s
                  </label>
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <button
                    onClick={() => getStudentAbsents(student.id)}
                    className="text-indigo-600 hover:text-indigo-700 font-medium hover:bg-indigo-50 py-1 px-2 rounded-md"
                  >
                    Historique des absents
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useNotification } from "../../components/Notification";

function Modal({ children, open, setOpen }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

const SubjectsInput = memo(({ SubjectsValue, config }) => {
  const [subjects, setSubjects] = useState([]);

  const fetchSubjects = useCallback(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/subjects`, {
        ...config,
      })
      .then((response) => setSubjects(response.data.data));
  }, []);

  console.log(subjects);

  useEffect(() => {
    fetchSubjects();
  }, []);
  return (
    <div>
      <label
        htmlFor="subjects"
        className="block text-sm font-medium text-gray-700"
      >
        Matiere
      </label>
      <select
        ref={SubjectsValue}
        defaultValue={-1}
        id="subjects"
        name="subjects"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value={-1} disabled>
          Choisir la matiere:
        </option>
        {subjects?.map((sub) => (
          <option key={sub.id} value={sub.id}>
            {sub.attributes.name}
          </option>
        ))}
      </select>
    </div>
  );
});

SubjectsInput.displayName = "SubjectsInput";
