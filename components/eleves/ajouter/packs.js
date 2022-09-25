import { memo, useEffect, useState } from "react";
import { useApi } from "../../../axios";
import { RadioGroup } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Packs = memo(({ selected, setSelected }) => {
  const [packs, setPack] = useState([]);
  const { api } = useApi();

  const fetchPacks = async () => {
    const pa = await api.get("/packs");
    setPack(pa.data);
  };
  useEffect(async () => {
    await fetchPacks();
  }, []);

  const pasPackId = packs.filter((pack) => pack.nom == "Pas de pack");

  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <RadioGroup.Label className="sr-only">packs</RadioGroup.Label>
      <div className="bg-white rounded-md -space-y-px">
        {pasPackId?.map((pack, id) => (
          <RadioGroup.Option
            key={id}
            value={pack.id}
            className={({ checked }) =>
              classNames(
                id === 0 ? "rounded-tl-md rounded-tr-md" : "",
                id === packs?.length - 1 ? "rounded-bl-md rounded-br-md" : "",
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
                <div className="ml-3 flex flex-col">
                  <RadioGroup.Label
                    as="span"
                    className={classNames(
                      checked ? "text-red-900" : "text-red-600",
                      "block text-sm font-medium"
                    )}
                  >
                    {pack?.nom}
                  </RadioGroup.Label>
                  <RadioGroup.Description
                    as="span"
                    className={classNames(
                      checked ? "text-red-700" : "text-red-500",
                      "block text-sm"
                    )}
                  >
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      {pack?.description}
                    </span>
                  </RadioGroup.Description>
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
        {packs
          ?.filter((pack) => pack.nom != "Pas de pack")
          .map((pack, id) => (
            <RadioGroup.Option
              key={id}
              value={pack.id}
              className={({ checked }) =>
                classNames(
                  id === packs?.length - 1 ? "rounded-bl-md rounded-br-md" : "",
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
                  <div className="ml-3 flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className={classNames(
                        checked ? "text-indigo-900" : "text-gray-900",
                        "block text-sm font-medium"
                      )}
                    >
                      {pack?.nom}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className={classNames(
                        checked ? "text-indigo-700" : "text-gray-500",
                        "block text-sm"
                      )}
                    >
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                        {pack?.description}
                      </span>
                    </RadioGroup.Description>
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
      </div>
    </RadioGroup>
  );
});

Packs.displayName = "Packs";
export { Packs };
