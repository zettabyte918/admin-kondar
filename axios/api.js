import React, { createContext, useContext } from "react";
import { useSession, signOut } from "next-auth/react";
import { useNotification } from "../components/Notification";
import { useRouter } from "next/router";

const AddOneDay = (date) => {
  if (!date) return null;
  let d = new Date(date);
  d.setDate(d.getDate() + 1);
  return d.toISOString();
};

import axios from "axios";

export const strapiApi = createContext();

export const ApiContext = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { addNotification } = useNotification();

  const api = axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL ||
      "http://localhost:1337/api",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `bearer ${session?.accessToken}`,
    },
  });

  api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      try {
        const { response } = error;
        if (response.status == 401 || response.status == 403) {
          return signOut({
            callbackUrl: process.env.NEXT_PUBLIC_ADMIN_AUTH_SIGNIN,
          });
        }
      } catch {
        return signOut({
          callbackUrl: process.env.NEXT_PUBLIC_ADMIN_AUTH_SIGNIN,
        });
      }
    }
  );

  const getAllAbsents = async (page = 1) => {
    return api.get(
      `/absents?pagination[pageSize]=10&pagination[page]=${page}&populate[0]=student&populate[1]=subject&sort[0]=id:desc`
    );
  };

  const deleteAbsents = async (id) => {
    if (id) return api.delete(`/absents/${id}`);
  };

  const addStudent = async (
    selectedPack,
    selectedGroup,
    inputValues,
    dateRange,
    subjects
  ) => {
    const selectedSubject = subjects.filter(
      (subject) => subject.selected == true
    );

    if (selectedSubject.length == 0)
      return addNotification(
        "DANGER",
        "Les matières demandées",
        "Sélectionner au moins un matière"
      );

    const subjectsStudent = [];
    selectedSubject.map((subject) => subjectsStudent.push(subject.id));

    if (!inputValues.tel)
      return addNotification(
        "DANGER",
        "Téléphone introuvable",
        "Numéro de téléphone invalide"
      );

    if (!selectedPack)
      return addNotification(
        "DANGER",
        "Pack introuvable",
        "veuillez sélectionner un <b>pack</b> valide"
      );

    if (!selectedGroup)
      return addNotification(
        "DANGER",
        "Groupe introuvable",
        "veuillez sélectionner un <b>groupe</b> valide"
      );

    const user = {
      ...inputValues,
      pack: selectedPack,
      group: selectedGroup,
      dateRange: [AddOneDay(dateRange[0]), AddOneDay(dateRange[1])],
      subjectsStudent: subjectsStudent,
    };
    const response = await api.post("/experts-users", JSON.stringify(user));
    if (response.status === 200) {
      console.log(response.data.id);
      addNotification(
        "SUCCESS",
        "Succès",
        `<b>${user.first_name_student}</b> ajouté avec succès`
      );
      return router.push(`/eleves/imprimer/${response.data.id}`);
    }
    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
    return router.push("/eleves?error=invalide_id_ajout");
  };

  const getAllStudents = async () => {
    return await api.get("/experts-users");
  };

  const getAllStudentsByGroupeId = async (id) => {
    return await api.get(`/users/groupe/${id}`);
  };

  const getAllAbsencesByGroupeId = async (id) => {
    return await api.get(`/users/absents/groupe/${id}`);
  };

  const getStudentById = async (id) => {
    if (id) return await api.get(`/experts-users/${id}`);
    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
    return router.push("/eleves");
  };

  const deactivateStudentById = async (id) => {
    if (id) {
      const response = await api.get(`/experts-users/deactivate/${id}`);
      const { status } = response;
      console.log(response);
      if (status === 200) {
        addNotification(
          "SUCCESS",
          "Succès ",
          "Élève <b>désactivé</b> avec succès"
        );
        return router.push(`/eleves`);
      }
    }
    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
    return router.push(`/eleves/editer/${id}`);
  };

  const updateStudentById = async (user) => {
    const selectedSubject = user.subjectsNew.filter(
      (subject) => subject.selected == true
    );

    const subjectsStudent = [];
    selectedSubject.map((subject) => subjectsStudent.push(subject.id));
    user.subjectsStudent = subjectsStudent;

    if (selectedSubject.length == 0)
      return addNotification(
        "DANGER",
        "Les matières demandées",
        "Sélectionner au moins un matière"
      );

    if (!user?.pack)
      return addNotification(
        "DANGER",
        "Mauvais format",
        `le champ du <b>pack</b> est obligatoire`
      );
    if (!user?.groupe)
      return addNotification(
        "DANGER",
        "Mauvais format",
        `le champ du <b>group</b> est obligatoire`
      );

    if (user?.id) {
      const response = await api.put(
        `/experts-users/${user.id}`,
        JSON.stringify(user)
      );
      if (response.status === 200)
        addNotification(
          "SUCCESS",
          "Succès",
          `mise à jour de <b>${response.data.name_eleve}</b> est réussie`
        );
      return router.push("/eleves");
    }
    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
    return router.push("/eleves?error=invalide_id_update");
  };

  const countAllStudents = async () => {
    return await api.get("/experts-users/count");
  };

  const addGroup = async (inputValues) => {
    if (!inputValues.nom)
      return addNotification(
        "DANGER",
        "Mauvais format",
        `le champ du <b>nom</b> est obligatoire`
      );
    if (!inputValues.description)
      return addNotification(
        "DANGER",
        "Mauvais format",
        `le champ du <b>description</b> est obligatoire`
      );

    const data = {
      data: {
        ...inputValues,
      },
    };

    await api.post("/groupes", JSON.stringify(data));
    addNotification("SUCCESS", "Succès", `<b>${data.data.nom}</b> a été créé`);
    return router.push("/groupes?groupeAdded=true");
  };

  const getAllGroups = async () => {
    return await api.get("/groupes");
  };

  const getAllStudentsFromGroupId = async (id) => {
    return await api.get(`/groupes/student/${id}`);
  };

  const getAllPayments = async (id) => {
    if (id) return await api.get(`/experts-users/payments/${id}`);
    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
    return router.push("/eleves");
  };

  const getAllStudentsPayments = async (id) => {
    const response = await api.get(`/experts-users/payments`);
    if (response) return response;
    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
    return router.push("/");
  };

  const deletePaymentById = async (id) => {
    if (id) {
      const response = await api.delete(`/payments/${id}`);
      if (response.status === 200) {
        return router.reload(window.location.pathname);
      }
    }
    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
    return router.push("/eleves");
  };

  const deleteStudent = async (id) => {
    if (id) {
      const response = await api.delete(`/users/${id}`);
      if (response.status === 200) {
        return router.push("/eleves");
      }
    }
    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
    return router.push("/eleves");
  };

  const addPayment = async (startDate, endDate, id) => {
    if (!startDate || !endDate || !id) return;

    const data = {
      data: {
        debut: AddOneDay(startDate),
        fin: AddOneDay(endDate),
        student: id,
      },
    };
    console.log(data);
    const response = await api.post(
      `/payments/addpayment`,
      JSON.stringify(data)
    );
    if (response.status === 200) {
      return router.reload(window.location.pathname);
    }
    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
  };

  const getGroupById = async (id) => {
    if (id) return await api.get(`/groupes/${id}`);
    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
    return router.push("/groupes");
  };

  const updateGroupById = async (group) => {
    if (!group?.id) {
      addNotification(
        "DANGER",
        "Une erreur s'est produite",
        "merci de rafraichir cette page"
      );
      return router.push("/eleves?error=invalide_id_update");
    }

    const data = {
      data: {
        ...group,
      },
    };

    const response = await api.put(
      `/groupes/${group.id}`,
      JSON.stringify(data)
    );

    if (response.status === 200) {
      addNotification(
        "SUCCESS",
        "Succès",
        `mise à jour de <b>${response.data.data.attributes.nom}</b> est réussie`
      );
      return router.push("/groupes");
    }

    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
    return router.push("/groupes?error=invalide_id_update");
  };

  const deleteGroupById = async (id) => {
    if (id) {
      const response = await api.delete(`/groupes/${id}`);
      if (response.status === 200) {
        addNotification(
          "SUCCESS",
          "Succès",
          `Groupe <b>${response.data.data.attributes.nom}</b> supprimé avec succès`
        );
        return router.push("/groupes");
      }
    }
    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
  };

  const fetchGrades = async () => {
    return await api.get(
      `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/grades`
    );
  };

  const fetchSubjects = async () => {
    return await api.get(
      `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/subjects`
    );
  };

  return (
    <strapiApi.Provider
      value={{
        api,
        countAllStudents,
        addStudent,
        getAllStudents,
        getStudentById,
        deleteStudent,
        getAllAbsents,
        deleteAbsents,
        getAllStudentsByGroupeId,
        getAllAbsencesByGroupeId,

        deactivateStudentById,
        updateStudentById,

        getAllGroups,
        addGroup,
        getGroupById,
        updateGroupById,
        getAllStudentsFromGroupId,

        getAllPayments,
        addPayment,
        deletePaymentById,
        getAllStudentsPayments,
        deleteGroupById,
        fetchGrades,
        fetchSubjects,
      }}
    >
      {children}
    </strapiApi.Provider>
  );
};

export function useApi() {
  return useContext(strapiApi);
}
