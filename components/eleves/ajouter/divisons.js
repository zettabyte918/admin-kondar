import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useApi } from "../../../axios";
import { divisions } from "./divisions_attributes";

const Divisions = ({ selectedDivision, handleOnChange }) => {
  const { fetchGrades } = useApi();
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    fetchGrades().then((response) => setGrades(response.data.data));
  }, []);
  return (
    <select
      onChange={handleOnChange}
      defaultValue={-1}
      id="grade"
      name="grade"
      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option key={-1} disabled value={-1}>
        sélectionner un niveau
      </option>
      {grades.map((grade, id) => (
        <option
          key={id}
          selected={selectedDivision?.name == grade.attributes.name}
          value={grade.id}
        >
          {grade.attributes.name}
        </option>
      ))}
    </select>
  );
};

export { Divisions };
