import { AllStudentsCount } from "./countall";
import { AllUnpaidStudents } from "./unpaidstudents";
import { HeaderText } from "../../layout";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Stats({ count, unpaid }) {
  return (
    <div>
      <HeaderText text={"Dernières statistiques"} />
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AllStudentsCount count={count} />
        <AllUnpaidStudents unpaid={unpaid} />
      </dl>
    </div>
  );
}
