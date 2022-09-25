import { useReducer } from "react";
import Link from "next/link";
import Head from "next/head";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { HeaderText } from "../../../components/layout";
import { useApi } from "../../../axios";

const AjouterGroupes = () => {
  const { addGroup } = useApi();

  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {}
  );
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ [name]: value });
  };

  return (
    <>
      <Head>
        <title>Ajouter un groupe</title>
      </Head>
      <HeaderText text={"Ajouter un nouveau groupe"} />
      <div className="flex py-2 justify-start">
        <div className="">
          <Link href="/groupes">
            <a
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <ArrowLeftIcon
                className="-ml-1 mr-2 h-5 w-5"
                aria-hidden="true"
              />
              Retour
            </a>
          </Link>
        </div>
      </div>
      <div className=" relative flex-1 ">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className=" md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="nom"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nom du groupe
                      </label>
                      <input
                        onChange={handleOnChange}
                        type="text"
                        name="nom"
                        id="nom"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description du groupe
                        </label>
                        <div className="mt-1">
                          <textarea
                            onChange={handleOnChange}
                            id="description"
                            name="description"
                            rows={3}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="description..."
                            defaultValue={""}
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          brève description simple pour ce groupe.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10  sm:mt-0">
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-3 bg-gray-200 text-right sm:px-6">
            <button
              type="button"
              onClick={() => {
                addGroup(inputValues);
              }}
              className="inline-flex justify-center w-full md:w-fit py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Ajouter ce groupe
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

AjouterGroupes.layout = "GlobalLayout";
export default AjouterGroupes;
