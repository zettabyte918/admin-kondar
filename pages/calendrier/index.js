import { DownloadIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useNotification } from "../../components/Notification";

const Calendrier = () => {
  const { data: session } = useSession();
  const { addNotification } = useNotification();
  const [calender, setCalender] = useState({});

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/user/calenders/me`,
        { ...config }
      )
      .then((response) => setCalender(response.data));
  }, []);
  return (
    <>
      {calender?.calendries && calender?.calendries[0]?.calendrie?.url ? (
        <a
          href={`${process.env.NEXT_PUBLIC_STRAPI_BACKEND_URL}${calender?.calendries[0]?.calendrie?.url}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <DownloadIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
          Télécharger le calendrier
        </a>
      ) : (
        "Il n'y a pas de calendriers"
      )}
    </>
  );
};

Calendrier.layout = "GlobalLayout";

export default Calendrier;
