import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { HeaderText } from "../../../../../components/layout";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/solid";
import { TablePaiement } from "../../../../../components/table/eleve/paiement/paiement_table";
import { useApi } from "../../../../../axios";
import { AddPaymentProvider } from "../../../../../components/slides/addpayment";

import { XCircleIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { Transition } from "@headlessui/react";

import {
  AddPayment,
  useAddPayment,
} from "../../../../../components/slides/addpayment";

const EmptyStudentPayments = () => {
  const { setOpenSlide } = useAddPayment();

  return (
    <Transition
      appear={true}
      show={true}
      as={Fragment}
      enter="transform ease-out duration-500 transition"
      enterFrom="translate-y-4 opacity-0"
      enterTo="translate-y-0 opacity-100"
    >
      <div className="rounded-md bg-indigo-200 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon
              className="h-5 w-5 text-indigo-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-indigo-800">
              Aucun paiement trouvé
            </h3>
            <div className="mt-2 text-sm text-indigo-700">
              <p>
                il n&apos;y a pas des paiements dans la base de données, vous
                pouvez commencer à les ajouter maintenant !.
              </p>
            </div>
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                <button
                  onClick={() => setOpenSlide(true)}
                  className="bg-indigo-300 px-2 py-1.5 rounded-md text-sm font-medium text-indigo-800 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-50 focus:ring-indigo-600"
                >
                  Nouvel paiement
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

const Paiement = () => {
  const [payments, setPayments] = useState([]);
  const [readyData, setReadyData] = useState(false);

  const { getAllPayments } = useApi();
  const { session } = useSession();

  const router = useRouter();
  const { id } = router.query;

  useEffect(async () => {
    if (id) {
      const Payments = await getAllPayments(id);
      if (Payments?.data.length !== 0) {
        setPayments(Payments.data);
      }
      setReadyData(true);
    }
  }, [session, id]);

  return (
    <AddPaymentProvider>
      <Head>
        <title>Ajouter un paiement</title>
      </Head>
      <HeaderText text={"Liste avec tous les paiement"} />
      <AddPayment />
      <div className="flex  justify-between">
        <div className="pb-2 space-x-2">
          <Link href={`/eleves/editer/${id}`}>
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
      {readyData &&
        (payments.length === 0 ? (
          <EmptyStudentPayments />
        ) : (
          <TablePaiement datas={payments} id={id} />
        ))}
    </AddPaymentProvider>
  );
};

Paiement.layout = "GlobalLayout";
export default Paiement;
