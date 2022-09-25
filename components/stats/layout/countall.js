import { UserGroupIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

const AllStudentsCount = ({ count }) => {
  const router = useRouter();

  return (
    <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
      <dt>
        <div className="absolute bg-indigo-500 rounded-md p-3">
          <UserGroupIcon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <p className="ml-16 text-sm font-medium text-gray-500 truncate">
          Nombre total d&apos;élèves
        </p>
      </dt>
      <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
        <p className="text-2xl font-semibold text-gray-900">{count}</p>
        <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
          <div className="text-sm text-right">
            <a
              href="#"
              onClick={() => router.push("/eleves")}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Voir tout
            </a>
          </div>
        </div>
      </dd>
    </div>
  );
};

export { AllStudentsCount };
