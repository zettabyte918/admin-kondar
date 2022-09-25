import { useState, Fragment, useRef, useEffect } from "react";
import { signIn } from "next-auth/react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { Transition } from "@headlessui/react";
import Logo from "../../public/logo.png";
import Head from "next/head";
import axios from "axios";
import { useNotification } from "../../components/Notification";

export default function Signin() {
  const { addNotification } = useNotification();

  const identifier = useRef();
  const password = useRef();

  const login = async () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/experts-users/admin`,
        {
          identifier: identifier.current.value,
          password: password.current.value,
        }
      )
      .then(function (response) {
        signIn("strapi-local", {
          data: JSON.stringify(response.data),
          callbackUrl: process.env.NEXT_PUBLIC_ADMIN_PUBLIC_URL,
        });
      })
      .catch(function (error) {
        console.log(error.response.data.error);
        addNotification(
          "DANGER",
          "Erreur de validation",
          "Identifiant ou mot de passe invalide"
        );
      });
  };

  return (
    <>
      <Head>
        <title>connectez-vous || LES EXPERTS</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-20 w-auto"
              src={Logo.src}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              connectez-vous à votre compte
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Panneau d&apos;administration Les Expert
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Adresse mail ou om d&apos;utilisateur
                </label>
                <input
                  //onChange={(e) => setIdentifier(e.target.value)}
                  ref={identifier}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Adresse email ou nom d'utilisateur"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Mot de passe
                </label>
                <input
                  //onChange={(e) => setPassword(e.target.value)}
                  ref={password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Mot de passe"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Mémoriser moi
                </label>
              </div>
            </div>

            <div>
              <button
                onClick={login}
                type="button"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
