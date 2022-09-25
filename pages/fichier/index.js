import axios from "axios";
import { useSession } from "next-auth/react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNotification } from "../../components/Notification";
import { classNames } from "../../utils";

const bytesToMegaBytes = (bytes) => bytes / 1024 ** 2;

const Fichier = () => {
  const { data: session } = useSession();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
  };

  const onUploadProgress = (progressEvent) => {
    var percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setProgress(percentCompleted);
  };

  const [selectedFile, setSelectedFile] = useState([]);
  const [progress, setProgress] = useState(0);
  const { addNotification } = useNotification();

  const TitleValue = useRef();
  const DescriptionValue = useRef();
  const GradesValue = useRef();
  const SubjectsValue = useRef();
  const FilesValue = useRef();

  const [files, setFiles] = useState([]);
  const getFiles = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/attachments?populate[0]=grade&pagination[limit]=10&sort[0]=id:desc`,
        { ...config }
      )
      .then((response) => setFiles(response.data.data));
  };

  const uploadFile = async () => {
    if (selectedFile.length == 0)
      return addNotification(
        "DANGER",
        "Erreur de validation",
        "Vous devez d'abord ajouter un ou plusieurs fichiers"
      );

    if (
      !TitleValue.current.value ||
      !DescriptionValue.current.value ||
      GradesValue.current.value == -1 ||
      SubjectsValue.current.value == -1
    )
      return addNotification(
        "DANGER",
        "Erreur de validation",
        "Données de formulaire invalides"
      );

    const formData = new FormData();

    Array.from(selectedFile).map((file) =>
      formData.append("files.files", file, file.name)
    );

    const data = {
      title: TitleValue.current.value,
      description: DescriptionValue.current.value,
      subject: SubjectsValue.current.value,
      grade: GradesValue.current.value,
    };

    formData.append("data", JSON.stringify(data));

    axios
      .post(
        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/attachments/`,
        formData,
        { ...config, onUploadProgress }
      )
      .then((response) => {
        getFiles();
        setProgress(0);
        addNotification(
          "SUCCESS",
          "Success",
          `${selectedFile.length} fichiers téléchargés avec succès`
        );
        ResetForm(
          FilesValue,
          TitleValue,
          DescriptionValue,
          GradesValue,
          SubjectsValue
        );
      })
      .catch((error) => {
        addNotification(
          "DANGER",
          "Error",
          `Il y a eu un problème lors du téléchargement du fichier`
        );
      });
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <>
      <form className=" flex flex-col">
        <input
          type="file"
          className="block cursor-pointer w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-indigo-100 file:text-indigo-700
        hover:file:bg-indigo-200"
          accept="application/pdf, image/*"
          ref={FilesValue}
          onChange={(e) => setSelectedFile(e.target.files)}
          name="files"
          multiple
        />
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <Title TitleValue={TitleValue} />
          </div>

          <div className="sm:col-span-3">
            <GradesInput GradesValue={GradesValue} config={config} />
          </div>

          <div className="sm:col-span-3">
            <Description DescriptionValue={DescriptionValue} />
          </div>
          <div className="sm:col-span-3">
            <SubjectsInput SubjectsValue={SubjectsValue} config={config} />
          </div>
        </div>
        <ProgressBar progress={progress} />
        <input
          type="button"
          disabled={progress > 0}
          onClick={uploadFile}
          className=" cursor-pointer w-24 my-2 bg-indigo-600 p-2 rounded-md text-xs text-gray-50"
          value="Upload"
        />
      </form>
      <AllFiles
        files={files}
        setFiles={setFiles}
        addNotification={addNotification}
        config={config}
      />
    </>
  );
};

Fichier.layout = "GlobalLayout";
export default Fichier;

// const uploadFile = async () => {
//   const Files = new FormData();

//   Array.from(selectedFile).map((file) => Files.append("files", file));

//   axios
//     .post(
//       `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/upload/`,
//       Files,
//       config
//     )
//     .then((response) => {
//       response.data.map((res) => alert(JSON.stringify(res)));
//     })
//     .catch((error) => {
//       alert(`${JSON.stringify(error.response.data)}`);
//     });
// };

const Title = ({ TitleValue }) => {
  return (
    <>
      <label
        htmlFor="title"
        className="block text-sm font-medium text-gray-700"
      >
        Titre
      </label>
      <div className="mt-1">
        <input
          ref={TitleValue}
          type="text"
          name="title"
          id="title"
          autoComplete="given-name"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </>
  );
};

const Description = ({ DescriptionValue }) => {
  return (
    <>
      <label
        htmlFor="description"
        className="block text-sm font-medium text-gray-700"
      >
        Description
      </label>
      <div className="mt-1">
        <textarea
          ref={DescriptionValue}
          id="description"
          name="description"
          rows={3}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
          defaultValue={""}
        />
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Ajouter une courte description de cette pièce jointe.
      </p>
    </>
  );
};

const GradesInput = ({ GradesValue, config }) => {
  const [grades, setGrades] = useState([]);

  const fetchGrades = useCallback(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/grades`, {
        ...config,
      })
      .then((response) => setGrades(response.data.data));
  }, []);

  useEffect(() => {
    fetchGrades();
  }, []);
  return (
    <div>
      <label
        htmlFor="grades"
        className="block text-sm font-medium text-gray-700"
      >
        Niveau
      </label>
      <select
        ref={GradesValue}
        defaultValue={-1}
        id="grades"
        name="grades"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value={-1} disabled>
          Choisir le niveau:
        </option>
        {grades?.map((grade) => (
          <option key={grade.id} value={grade.id}>
            {grade.attributes.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const SubjectsInput = memo(({ SubjectsValue, config }) => {
  const [subjects, setSubjects] = useState([]);

  const fetchSubjects = useCallback(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/subjects`, {
        ...config,
      })
      .then((response) => setSubjects(response.data.data));
  }, []);

  console.log(subjects);

  useEffect(() => {
    fetchSubjects();
  }, []);
  return (
    <div>
      <label
        htmlFor="subjects"
        className="block text-sm font-medium text-gray-700"
      >
        Matiere
      </label>
      <select
        ref={SubjectsValue}
        defaultValue={-1}
        id="subjects"
        name="subjects"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value={-1} disabled>
          Choisir la matiere:
        </option>
        {subjects?.map((sub) => (
          <option key={sub.id} value={sub.id}>
            {sub.attributes.name}
          </option>
        ))}
      </select>
    </div>
  );
});
SubjectsInput.displayName = "SubjectsInput";

const ProgressBar = ({ progress }) => {
  if (progress)
    return (
      <div className="w-full my-2 bg-indigo-100 rounded-full">
        <div
          style={{ width: `${progress}%` }}
          className="transition-[width] duration-1000 ease-in bg-indigo-600 transform translate text-xs font-medium text-indigo-100 text-center p-0.5 leading-none rounded-l-full"
        >
          {progress}%
        </div>
      </div>
    );

  return null;
};

const ResetForm = (
  FilesValue,
  TitleValue,
  DescriptionValue,
  GradesValue,
  SubjectsValue
) => {
  FilesValue.current.value = null;
  TitleValue.current.value = null;
  DescriptionValue.current.value = null;
  GradesValue.current.value = -1;
  SubjectsValue.current.value = -1;
};

const AllFiles = memo(({ files, setFiles, addNotification, config }) => {
  const handelDelete = async (id) => {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/attachments/${id}`,
      { ...config }
    );
    if (response.status == 200) {
      setFiles((files) => files.filter((file) => file.id != id));
      addNotification(
        "SUCCESS",
        "Succès",
        "Pièces jointes supprimé avec succès"
      );
    }
  };
  return (
    <div className="-mx-4 mt-10 ring-1 bg-white ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Titre
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Niveau
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Select</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {files?.map((file, fileIdx) => (
            <tr key={file.id}>
              <td
                className={classNames(
                  fileIdx === 0 ? "" : "border-t border-transparent",
                  "relative py-4 pl-4 sm:pl-6 pr-3 text-sm"
                )}
              >
                <div className="font-medium text-gray-900">
                  {file.attributes.title}
                </div>
                {fileIdx !== 0 ? (
                  <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" />
                ) : null}
              </td>
              <td
                className={classNames(
                  fileIdx === 0 ? "" : "border-t border-gray-200",
                  "px-3 py-3.5 text-sm text-gray-500"
                )}
              >
                {file.attributes.grade.data.attributes.name}
              </td>

              <td
                className={classNames(
                  fileIdx === 0 ? "" : "border-t border-transparent",
                  "relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium"
                )}
              >
                <button
                  type="button"
                  onClick={() => handelDelete(file.id)}
                  className="inline-flex items-center rounded-md border border-red-100 bg-red-500 px-3 py-2 text-sm font-medium leading-4 text-gray-50 shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Supprimer<span className="sr-only">, {file.title}</span>
                </button>
                {fileIdx !== 0 ? (
                  <div className="absolute right-6 left-0 -top-px h-px bg-gray-200" />
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
AllFiles.displayName = "AllFiles";
