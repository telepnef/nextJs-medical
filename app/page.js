"use client";

import Image from "next/image";
import { redirect } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "./lib/actions";

export default function Login() {
  const [message, dispatch] = useFormState(authenticate, undefined);

  console.log(message);
  if (message && message === "Submitted Successfuly") {
    redirect("/dashboard/allocated");
  }

  return (
    <>
      <div className="flex min-h-full justify-center lg:justify-normal">
        <div className="relative hidden w-0 basis-2/4 lg:block">
          <Image
            className="max-h-screen w-full"
            src="/login.jpg"
            alt="Login"
            width={720}
            height={870}
          />
        </div>
        <div className="flex basis-2/4 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Image
                className="mx-auto"
                src={`/logo.png`}
                alt="FeelTect"
                width="128"
                height="96"
              />
              <h2 className="-mt-3 text-center text-sm font-medium leading-6 tracking-[1px] text-gray-900">
                TIGHT ALRIGHT PLATFORM
              </h2>
            </div>

            <div className="mx-auto mt-10 max-w-[336px] rounded-lg border border-solid border-[#E6E6E6] bg-white p-5 md:p-10">
              <form action={dispatch} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-2 pl-3.5 text-primary-oil_direct_black ring-1 ring-inset ring-primary-gray_3 placeholder:text-gray-400 focus:ring-inset focus:ring-primary-primary_green sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-2 pl-3.5 text-primary-oil_direct_black ring-1 ring-inset ring-primary-gray_3 placeholder:text-gray-400 focus:ring-inset focus:ring-primary-primary_green sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  {message && (
                    <p className="text-primary-primary_red">{message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <LoginButton />

                  <div className="text-sm leading-6">
                    <a
                      href="#"
                      className="text-sm font-medium text-blue-500 hover:text-blue-400"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  const handleClick = (event) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={handleClick}
      className="flex justify-center rounded bg-primary-primary_green px-4 py-2 text-base font-medium leading-6 text-white hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      Sign in
    </button>
  );
}
