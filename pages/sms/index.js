//you can find this il strapi backend within experts-users controller "getTokenSMS"

import Head from "next/head";
import { useApi } from "../../axios";
import { useEffect, useState } from "react";
import { ChatAlt2Icon } from "@heroicons/react/outline";
import { Filter, TableEleveSMS } from "../../components/table";
import { filteredStudentsGloabl } from "../../components/table/sms/helper/filter";
import { useSMSApi } from "../../context/sms";
import { SmsModal } from "../../components/table/sms/modal";
import MessagesHistory from "../../components/slides/message-history";
import { useNotification } from "../../components/Notification";

const SmsPage = () => {
  // lift state up
  const {
    token,
    setToken,
    getBalance,
    getTokenSMS,
    balance,
    setBalance,
    canSend,
    setCanSend,
    students,
    setStudents,
    selectedStudents,
    update,
  } = useSMSApi();

  const { getAllStudents } = useApi();
  const { addNotification } = useNotification();
  const [open, setOpen] = useState(false);
  const [openSmsHistory, setOpenSmsHistory] = useState(false);

  // orange api token

  // get token from les-experts backend
  const getToken = async () => {
    return await getTokenSMS();
  };

  // get token from les-expert backend
  useEffect(async () => {
    const response = await getToken();
    setToken(response.data.access_token);
    return () => {
      setToken(null);
    };
  }, []);

  useEffect(async () => {
    const students = await getAllStudents();
    setStudents(students.data);
  }, []);

  //get balance and all students from les-experts backend
  useEffect(async () => {
    if (token) {
      const response = await getBalance();
      if (response.code === 41) {
        return;
      }

      // get last sms bundel
      const smsArray = response.data.partnerContracts.contracts;
      const lastContract =
        smsArray[0].serviceContracts[smsArray[0].serviceContracts.length - 1];

      //check date for expire
      const expireDate = new Date(lastContract.expires).getTime();
      const nowDate = new Date().getTime();

      if (nowDate > expireDate) {
        setBalance(0);
        addNotification("DANGER", "Expiré", "Oups ton sms a expiré!");
        console.log("expire sms api");
      } else {
        setBalance(lastContract.availableUnits);
      }
    }
  }, [token, update]);

  //if students are ready log the results for now
  // useEffect(() => {
  //   if (students) {
  //     const filterStudents = filteredStudentsGloabl(students, "275155642");
  //     // console.log(filterStudents);
  //   }
  // }, [students]);

  return (
    <>
      <Head>
        <title>Messagerie</title>
      </Head>
      <SmsModal open={open} setOpen={setOpen} />
      <MessagesHistory open={openSmsHistory} setOpen={setOpenSmsHistory} />
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Messagerie</h1>
          <p className="mt-2 text-sm text-gray-700">
            Envoyer des messages sms courts aux groupes, niveau (7e, 8e...) ou à
            tous les élèves.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <SendButton
            balance={balance}
            selected={selectedStudents}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <Filter setOpen={setOpenSmsHistory} />
        <TableEleveSMS />
      </div>
    </>
  );
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SendButton = ({ balance, selected, setOpen }) => {
  let canSend = !(selected.length > 0 && balance >= selected.length);

  return (
    <button
      // onMouseOver={() => alert("hii")}
      disabled={canSend}
      onClick={() => setOpen(true)}
      type="button"
      className={classNames(
        canSend
          ? "bg-gray-300 focus:ring-gray-300"
          : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
        "inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-2  focus:ring-offset-2 sm:w-auto"
      )}
    >
      Envoyer {selected.length > 0 ? selected.length : ""}
      <ChatAlt2Icon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
    </button>
  );
};

SmsPage.layout = "GlobalLayout";
export default SmsPage;
