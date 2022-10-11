/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { CheckIcon, FireIcon, XIcon } from "@heroicons/react/solid";

export default function SimpleNotification({ total }) {
  const [show, setShow] = useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);
  }, []);
  return (
    <>
      <Transition
        show={show}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          id="toast-default"
          className="flex absolute bottom-5 left-5 items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
            <CheckIcon className={"w-5 h-5 "} />
            <span className="sr-only">Fire icon</span>
          </div>
          <div className="ml-3 text-sm font-normal">{total}</div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-default"
            aria-label="Close"
            onClick={() => setShow(false)}
          >
            <span className="sr-only">Close</span>
            <XIcon />
          </button>
        </div>
      </Transition>
    </>
  );
}
