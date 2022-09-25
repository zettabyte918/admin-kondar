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
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSMSApi } from "../../../context/sms";
import { filteredStudentsGloabl } from "./helper/filter";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TableEleveSMS = () => {
  const {
    balance,
    filteredStudents: students,
    searchInputQuery,
    selectedStudents,
    setSelectedStudents,
  } = useSMSApi();
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [filteredStudentsTable, setFilteredStudentsTable] = useState([]);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedStudents.length > 0 && selectedStudents.length < students.length;
    if (students.length)
      setChecked(selectedStudents.length === students.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedStudents, students]);

  function toggleAll() {
    setSelectedStudents(checked || indeterminate ? [] : filteredStudentsTable);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  useLayoutEffect(() => {
    setSelectedStudents([]);
  }, []);

  useEffect(() => {
    setFilteredStudentsTable(students);
  }, [students]);

  useEffect(() => {
    let filteredStudents = filteredStudentsGloabl(students, searchInputQuery);
    setFilteredStudentsTable(filteredStudents);
  }, [searchInputQuery]);

  return (
    <div className="flex flex-col space-y-0.5">
      <Information selectedStudents={selectedStudents} balance={balance} />
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            {/* {selectedStudents.length > 0 && (
              <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                <button
                  type="button"
                  className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Bulk edit
                </button>
                <button
                  type="button"
                  className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Delete all
                </button>
              </div>
            )} */}
            <table className="min-w-full table-fixed divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="relative w-12 px-6 sm:w-16 sm:px-8"
                  >
                    <input
                      type="checkbox"
                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                      ref={checkbox}
                      checked={checked}
                      onChange={toggleAll}
                    />
                  </th>
                  <th
                    scope="col"
                    className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Nom
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Niveau
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Téléphone
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredStudentsTable.length > 0 ? (
                  filteredStudentsTable.map((person, id) => (
                    <tr
                      key={id}
                      className={
                        selectedStudents.includes(person)
                          ? "bg-gray-50"
                          : undefined
                      }
                    >
                      <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                        {selectedStudents.includes(person) && (
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                        )}
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                          value={person.tel}
                          checked={selectedStudents.includes(person)}
                          onChange={(e) =>
                            setSelectedStudents(
                              e.target.checked
                                ? [...selectedStudents, person]
                                : selectedStudents.filter((p) => p !== person)
                            )
                          }
                        />
                      </td>
                      <td
                        className={classNames(
                          "whitespace-nowrap py-4 pr-3 text-sm font-medium",
                          selectedStudents.includes(person)
                            ? "text-indigo-600"
                            : "text-gray-900"
                        )}
                      >
                        {person.name_eleve}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {person?.grade?.name}
                        <span className="bg-indigo-100 text-indigo-800 ml-1 px-2 py-0.5 rounded text-xs font-medium">
                          {person?.pack?.nom}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {person.tel}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <div className="relative text-center cursor-default select-none py-2 px-4 text-gray-700">
                        rien n&apos;a été trouvé.
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

TableEleveSMS.displayName = "TableEleveSMS";
export { TableEleveSMS };

const Information = ({ selectedStudents, balance }) => {
  return (
    <div className="space-x-1">
      <span className="bg-indigo-100 text-indigo-800 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium">
        Élève sélectionné: {selectedStudents.length}
      </span>
      <span className="bg-cyan-100 text-cyan-800 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium">
        Messages disponibles: {balance}
      </span>
    </div>
  );
};
