const Enseignants = () => {
  const [open, setOpen] = useState(false);
  const [openc, setOpenC] = useState(false);
  return (
    <>
      <AddEnseignants open={open} setOpen={setOpen} />
      <AddCalenderModal open={openc} setOpen={setOpenC} />

      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Enseignants</h1>
          <p className="text-sm text-gray-700">
            Une liste de tous les Enseignants dans le center.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Ajouter un enseignant
          </button>
        </div>
      </div>
      <EnseignantsTable />
      <div className="sm:flex mt-10 sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Calendrier</h1>
          <p className="mt-2 text-sm text-gray-700">
            Une liste de tous les calendriers
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setOpenC(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Ajouter un nouveau calendrier
          </button>
        </div>
      </div>
      <AddCalender />
    </>
  );
};

Enseignants.layout = "GlobalLayout";
export default Enseignants;

const EnseignantsTable = () => {
  const { data: session } = useSession();
  const [profs, setProfs] = useState([]);

  const getAllprof = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/experts-users/prof/profs`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${session?.accessToken}`,
          },
        }
      )
      .then((response) => setProfs(response.data));
  };

  useEffect(() => {
    getAllprof();
  }, []);
  return (
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
                    Identifier
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Mots de passe
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {profs.map((prof) => (
                  <tr key={prof.username}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {prof.name_eleve}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className="text-indigo-50 font-medium bg-indigo-600 py-0.5 px-2 rounded-md">
                        {prof.username}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className="text-indigo-50 font-medium bg-indigo-600 py-0.5 px-2 rounded-md">
                        les-experts-{prof.tel}
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        onClick={() => {
                          axios
                            .delete(
                              `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/users/${prof.id}`,
                              {
                                headers: {
                                  Accept: "application/json",
                                  "Content-Type": "application/json",
                                  Authorization: `bearer ${session?.accessToken}`,
                                },
                              }
                            )
                            .then((response) =>
                              setProfs((prev) =>
                                prev.filter((prf) => prf.id != prof.id)
                              )
                            );
                        }}
                        className="text-red-600 font-medium hover:text-red-700"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { useNotification } from "../../components/Notification";
import axios from "axios";
import Link from "next/link";

const AddEnseignants = ({ open, setOpen }) => {
  const { data: session } = useSession();
  const { addNotification } = useNotification();

  const name = useRef();
  const tel = useRef();

  const handelProfCreation = async () => {
    if (!name.current.value)
      return addNotification(
        "DANGER",
        "Erreur de validation",
        "Le nom est requis"
      );
    if (!tel.current.value || tel?.current?.value?.length < 8)
      return addNotification(
        "DANGER",
        "Erreur de validation",
        "Le numéro de téléphone est requis"
      );
    const data = {
      name: name.current.value,
      tel: tel.current.value,
    };
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/experts-users/create-prof`,
        JSON.stringify(data),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${session?.accessToken}`,
          },
        }
      )
      .then(() => {
        window.location.reload();
      })
      .catch(() =>
        addNotification(
          "DANGER",
          "Erreur de validation",
          "Le nom doit être unique"
        )
      );
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => setOpen(true)}
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
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Créer un compte enseignant
                  </Dialog.Title>
                  <div className="mt-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nom
                      </label>
                      <div className="mt-1">
                        <input
                          ref={name}
                          type="email"
                          name="name"
                          id="name"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Numéro de téléphone
                      </label>
                      <div className="mt-1">
                        <input
                          ref={tel}
                          type="text"
                          name="tel"
                          id="tel"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 flex justify-end space-x-2">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={handelProfCreation}
                >
                  Créer
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

function AddCalender() {
  const { data: session } = useSession();

  const [calenders, setCalenders] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/calendries?populate[0]=calendrie&populate[1]=prof`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${session?.accessToken}`,
          },
        }
      )
      .then((response) => setCalenders(response.data.data));
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
                      Calendrier
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {calenders.map((calender, i) => (
                    <tr key={i}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {
                          calender?.attributes?.prof?.data?.attributes
                            ?.name_eleve
                        }
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Link
                          href={`${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}${calender?.attributes?.calendrie?.data?.attributes?.url}`}
                          passHref
                        >
                          <a target="_blank" rel="noopener noreferrer">
                            Ouvrir le calendrier
                          </a>
                        </Link>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => {
                            axios
                              .delete(
                                `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/calendries/${calender?.id}`,
                                {
                                  headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                    Authorization: `bearer ${session?.accessToken}`,
                                  },
                                }
                              )
                              .then((response) =>
                                setCalenders((prev) =>
                                  prev.filter((cld) => cld.id != calender.id)
                                )
                              );
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* This example requires Tailwind CSS v2.0+ */

function AddCalenderModal({ open, setOpen }) {
  const { data: session } = useSession();
  const { addNotification } = useNotification();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
  };

  const [profs, setProfs] = useState([]);
  const selectedProf = useRef();
  const [selectedFile, setSelectedFile] = useState([]);

  const getAllprof = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/experts-users/prof/profs`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${session?.accessToken}`,
          },
        }
      )
      .then((response) => setProfs(response.data));
  };

  const handelUpload = () => {
    if (selectedFile.length == 0)
      return addNotification(
        "DANGER",
        "Erreur de validation",
        "Vous devez d'abord ajouter un ou plusieurs fichiers"
      );
    if (selectedProf.current.value == -1)
      return addNotification(
        "DANGER",
        "Erreur de validation",
        "Données de formulaire invalides"
      );

    const formData = new FormData();
    formData.append("files.calendrie", selectedFile[0], selectedFile[0].name);

    const data = {
      prof: selectedProf.current.value,
    };

    formData.append("data", JSON.stringify(data));

    axios
      .post(
        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/calendries/`,
        formData,
        { ...config }
      )
      .then(() => window.location.reload());
  };

  useEffect(() => {
    getAllprof();
  }, []);
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
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div className="text-left">
                <div className="mt-3 sm:mt-5">
                  <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files)}
                    className="block cursor-pointer w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
                  />
                </div>
                <div className="mt-3 sm:mt-5">
                  <label
                    htmlFor="prof"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Prof
                  </label>
                  <select
                    id="prof"
                    name="prof"
                    ref={selectedProf}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option disabled value={-1} selected>
                      Sélectionner un prof
                    </option>
                    {profs.map((prof) => (
                      <option key={prof.id} value={prof.id}>
                        {prof.name_eleve}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => handelUpload()}
                >
                  Envoyer
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
