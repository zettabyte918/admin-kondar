import { XIcon } from "@heroicons/react/solid";
import { useSMSApi } from "../../../context/sms";

export default function Search() {
  const { searchInputQuery, setSearchInputQuery } = useSMSApi();

  function handleChange(event) {
    setSearchInputQuery(event.target.value);
  }

  function deleteInputQuery() {
    setSearchInputQuery("");
  }
  return (
    <div>
      <div className="relative flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          value={searchInputQuery}
          onChange={handleChange}
          placeholder="Rechercher"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          {searchInputQuery == "" ? (
            <kbd className="inline-flex items-center border border-gray-200 rounded px-2 text-sm font-sans font-medium text-gray-400">
              Global
            </kbd>
          ) : (
            <button
              onClick={deleteInputQuery}
              className="inline-flex items-center text-indigo-600 bg-indigo-50 rounded-sm px-1 hover:bg-indigo-100 hover:cursor-pointer focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <XIcon className=" h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
