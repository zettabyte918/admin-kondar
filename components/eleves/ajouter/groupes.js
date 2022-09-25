import { memo, useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useApi } from "../../../axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Groupes = memo(({ selected, setSelected }) => {
  const { getAllGroups } = useApi();
  const [groupes, setGroupes] = useState([]);

  const fetchGroupes = async () => {
    const gp = await getAllGroups();
    setGroupes(gp?.data);
  };

  useEffect(async () => {
    await fetchGroupes();
  }, []);

  const pasGroupId = groupes.filter((groupe) => groupe.nom == "Pas de group");

  return (
    <>
      <RadioGroup value={selected} onChange={setSelected}>
        <div className="bg-white rounded-md -space-y-px">
          {pasGroupId?.map((groupe, id) => (
            <RadioGroup.Option
              key={id}
              value={groupe.id}
              className={({ checked }) =>
                classNames(
                  id === 0 ? "rounded-tl-md rounded-tr-md" : "",
                  id === groupes?.length - 1
                    ? "rounded-bl-md rounded-br-md"
                    : "",
                  checked ? "bg-red-50 border-red-200 z-10" : "border-gray-200",
                  "relative border p-4 flex cursor-pointer focus:outline-none"
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <span
                    className={classNames(
                      checked
                        ? "bg-red-600 border-transparent"
                        : "bg-white border-gray-300",
                      active ? "ring-2 ring-offset-2 ring-red-500" : "",
                      "h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center"
                    )}
                    aria-hidden="true"
                  >
                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                  </span>
                  <div className="ml-3 w-full flex flex-col">
                    <div className="flex justify-between">
                      <RadioGroup.Label
                        as="span"
                        className={classNames(
                          checked ? "text-red-900" : "text-red-900",
                          "block text-sm font-medium"
                        )}
                      >
                        {groupe.nom}
                      </RadioGroup.Label>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {groupe?.students?.length} élèves
                      </span>
                    </div>
                    <RadioGroup.Description
                      as="span"
                      className={classNames(
                        checked ? "text-red-700" : "text-red-700",
                        "block text-sm"
                      )}
                    >
                      {groupe?.description}
                    </RadioGroup.Description>
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
          {groupes
            ?.filter((groupe) => groupe.nom != "Pas de group")
            .map((groupe, id) => (
              <RadioGroup.Option
                key={id}
                value={groupe.id}
                className={({ checked }) =>
                  classNames(
                    id === groupes?.length - 1
                      ? "rounded-bl-md rounded-br-md"
                      : "",
                    checked
                      ? "bg-indigo-50 border-indigo-200 z-10"
                      : "border-gray-200",
                    "relative border p-4 flex cursor-pointer focus:outline-none"
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <span
                      className={classNames(
                        checked
                          ? "bg-indigo-600 border-transparent"
                          : "bg-white border-gray-300",
                        active ? "ring-2 ring-offset-2 ring-indigo-500" : "",
                        "h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center"
                      )}
                      aria-hidden="true"
                    >
                      <span className="rounded-full bg-white w-1.5 h-1.5" />
                    </span>
                    <div className="ml-3 w-full flex flex-col">
                      <div className="flex justify-between">
                        <RadioGroup.Label
                          as="span"
                          className={classNames(
                            checked ? "text-indigo-900" : "text-gray-900",
                            "block text-sm font-medium"
                          )}
                        >
                          {groupe.nom}
                        </RadioGroup.Label>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {groupe?.students?.length} élèves
                        </span>
                      </div>
                      <RadioGroup.Description
                        as="span"
                        className={classNames(
                          checked ? "text-indigo-700" : "text-gray-500",
                          "block text-sm"
                        )}
                      >
                        {groupe?.description}
                      </RadioGroup.Description>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
        </div>
      </RadioGroup>
    </>
  );
});

Groupes.displayName = "Groupes";
export { Groupes };
