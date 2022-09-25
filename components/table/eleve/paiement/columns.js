import { useApi } from "../../../../axios";
import { useNotification } from "../../../Notification";

export const COLUMNS = [
  {
    Header: "Mois",
    accessor: (payment) =>
      new Date(payment?.debut).toLocaleString("fr-FR", {
        month: "long",
        year: "numeric",
      }),
    Cell: ({ value }) => {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
          {value}
        </span>
      );
    },
  },
  {
    Header: "Debut",
    accessor: "debut",
  },
  {
    Header: "Fin",
    accessor: "fin",
  },
  {
    Header: "",
    accessor: "id",
    Cell: ({ value }) => {
      const { deletePaymentById } = useApi();
      const { addNotification } = useNotification();

      const handleClick = (val) => {
        deletePaymentById(val);
      };
      return (
        <button
          type="button"
          onClick={() => handleClick(value)}
          className="flex justify-end items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Effacer
        </button>
      );
    },
  },
];
