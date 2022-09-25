import Link from "next/link";
import { UserGroupIcon } from "@heroicons/react/solid";
import { PencilAltIcon } from "@heroicons/react/outline";
import { useList } from "../../slides/list";
import { useNotification } from "../../Notification";

export const COLUMNS = [
  {
    Header: "Nom",
    accessor: "nom",
  },
  {
    Header: "Description",
    accessor: "description",
    Cell: ({ value }) => {
      const [mot1, mot2, mot3, mot4, mot5] = value.split(" ");

      return <span title={value}>{`${mot1} ${mot2} ${mot3} ${mot4}...`}</span>;
    },
  },
  // {
  //   Header: "Eleves",
  //   accessor: ({ students }) => {
  //     return students?.map((student) => student.name_eleve) || "";
  //   },
  //   Cell: ({ value }) => {
  //     return (
  //       <span className="inline-flex items-center mr-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800">
  //         {value.length}
  //       </span>
  //     );
  //   },
  // },
  // {
  //   Header: "Eleves",
  //   accessor: "students",
  //   Cell: ({ value }) => {
  //     const { addNotification } = useNotification();
  //     const { setOpen, setStudents } = useList();
  //     return (
  //       <button
  //         type="button"
  //         onClick={() => {
  //           if (!value.length)
  //             return addNotification(
  //               "DANGER",
  //               "Groupe vide",
  //               "vous avez besoin d'au moins un élève dans ce groupe"
  //             );
  //           setStudents(value);
  //           setOpen(true);
  //         }}
  //         className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
  //       >
  //         <UserGroupIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
  //         afficher les élèves
  //       </button>
  //     );
  //   },
  // },
  {
    Header: "",
    accessor: "id",
    Cell: ({ value }) => {
      return (
        <div className="flex items-center space-x-1">
          {/* <Link href={`/eleves/imprimer/${value}`}>
            <a className="text-indigo-600 hover:text-indigo-900">Imprimer</a>
          </Link> */}
          <Link href={`/groupes/editer/${value}`}>
            <a className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Éditer
            </a>
          </Link>
        </div>
      );
    },
  },
];
