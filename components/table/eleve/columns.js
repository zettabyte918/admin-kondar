import Link from "next/link";
import male from "../../../public/sexe/male-student.png";
import { PencilAltIcon } from "@heroicons/react/outline";

export const COLUMNS = [
  {
    Header: "Nom et prénom",
    accessor: (student) => [student.name_eleve, student.email],
    Cell: ({ value }) => {
      const [name_eleve, email] = value;
      return (
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {name_eleve}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    Header: "Grade",
    accessor: (student) => [student?.grade?.name],
    Cell: ({ value }) => {
      const [name] = value;
      return name;
    },
  },
  {
    Header: "Groupe",
    accessor: (student) => [student?.groupe?.nom, student?.groupe?.description],
    Cell: ({ value }) => {
      const [nom] = value;
      return (
        <>
          <div className="text-sm font-medium text-gray-900">
            {nom == "Pas de group" ? (
              <span className="text-red-500">{nom}</span>
            ) : (
              nom
            )}
          </div>
        </>
      );
    },
  },
  // {
  //   Header: "Statut",
  //   accessor: "confirmed",
  //   Cell: ({ value }) => {
  //     return (
  //       <>
  //         {value ? (
  //           <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
  //             confirmé
  //           </span>
  //         ) : (
  //           <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
  //             pas confirmé
  //           </span>
  //         )}
  //       </>
  //     );
  //   },
  // },
  {
    Header: "Pack",
    accessor: (student) => [student?.pack?.nom, student?.pack?.description],
    Cell: ({ value }) => {
      const [nom, description] = value;
      const [mot1, mot2, mot3] = description.split(" ");

      return (
        <>
          <div className="text-sm font-medium text-gray-900">
            {nom == "Pas de pack" ? (
              <span className="text-red-500">{nom}</span>
            ) : (
              nom
            )}
          </div>
        </>
      );
    },
  },
  {
    Header: "",
    accessor: "id",
    Cell: ({ value }) => {
      return (
        <div className="flex items-center space-x-1">
          {/* <Link href={`/eleves/imprimer/${value}`}>
            <a className="text-indigo-600 hover:text-indigo-900">Imprimer</a>
          </Link> */}
          <Link href={`/eleves/editer/${value}`}>
            <a className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Éditer
            </a>
          </Link>
        </div>
      );
    },
  },
];
