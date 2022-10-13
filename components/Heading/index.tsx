/*
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import React from "react";
import Link from "next/link";
import { DownloadIcon } from "@heroicons/react/outline";
import { JSXElement } from "@babel/types";

const tabs = [
  { name: "Applied", href: "#", current: false },
  { name: "Phone Screening", href: "#", current: false },
  { name: "Interview", href: "#", current: true },
  { name: "Offer", href: "#", current: false },
  { name: "Hired", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

interface HeadingProps {
  name: string;
  tools: {
    name: string;
    href: string;
    current: boolean;
    icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  }[];
}

const Heading: React.FC<HeadingProps> = ({ name, tools }) => {
  console.log(tools);
  return (
    <div className="relative pb-5 border-b border-gray-200 sm:pb-0">
      <div className="md:flex md:items-center md:justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{name}</h3>
        <div className="mt-3 flex md:mt-0 md:absolute md:top-3 md:right-0">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-900"
          >
            Экспорт
            <DownloadIcon className={"ml-1 w-5 h-5"} />
          </button>
          <Link href={"/tickets/create"}>
            <button
              type="button"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-800 hover:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-900"
            >
              Создать Заявку
            </button>
          </Link>
        </div>
      </div>
      {tools && (
        <div className="mt-4">
          <div className="sm:hidden">
            <label htmlFor="current-tab" className="sr-only">
              Select a tab
            </label>
            <select
              id="current-tab"
              name="current-tab"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              defaultValue={tools.find((tab) => tab.current).name}
            >
              {tools.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="-mb-px flex space-x-8">
              {tools.map((tab, index) => (
                <a
                  onClick={() => alert(index)}
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.current
                      ? "border-pink-800 text-pink-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    "flex items-center whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                  )}
                  aria-current={tab.current ? "page" : undefined}
                >
                  <tab.icon className="h-4 w-4 mr-1" />
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Heading;
