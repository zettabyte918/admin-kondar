import { memo, useMemo, useState } from "react";
import { division } from "./division";
import MyCombobox from "./combobox-devision";
import Search from "./search-input";
import { useSMSApi } from "../../../context/sms";
import { AnnotationIcon } from "@heroicons/react/outline";

const Filter = memo(({ setOpen }) => {
  const { students, setStudents } = useSMSApi();
  const div = useMemo(() => division, []);
  const [selected, setSelected] = useState(div[0]);

  return (
    <>
      <div className="flex flex-col space-y-2 md:flex-row py-2 justify-between">
        <div className="flex z-10 flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
          <Search students={students} setStudents={setStudents} />
          {/* to do soon :) */}
          {/* <MyCombobox
            students={students}
            setStudents={setStudents}
            division={div}
            selected={selected}
            setSelected={setSelected}
          /> */}
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <AnnotationIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
          Historique des messages
        </button>
      </div>
    </>
  );
});

Filter.displayName = "Filter";
export { Filter };
