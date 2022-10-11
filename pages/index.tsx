import type { GetServerSideProps, NextPage } from "next";
import MainLayout from "../components/MainLayout";
import Link from "next/link";
import Head from "next/head";
import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  CursorClickIcon,
  MailOpenIcon,
  UsersIcon,
  BriefcaseIcon,
  ClipboardCheckIcon,
  InboxInIcon,
  ChartBarIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import { useRouter } from "next/router";
import { useAppSelector } from "../redux/hooks";
import { selectUserData, setUserData } from "../redux/slices/user";
import { wrapper } from "../redux/store";
import { parseCookies } from "nookies";
import { Api } from "../utils/api";
import SimpleNotification from "../components/Notification/simple";

const stats = [
  {
    id: 1,
    name: "Всего открытых тикетов",
    stat: "345",
    icon: InboxInIcon,
    change: "122",
    changeType: "increase",
  },
  {
    id: 2,
    name: "Решенные тикеты",
    stat: "322",
    icon: ClipboardCheckIcon,
    change: "5.4%",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Статистика",
    stat: "24.57%",
    icon: ChartBarIcon,
    change: "3.2%",
    changeType: "decrease",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Home: NextPage = ({ user }) => {
  console.log(user);
  return (
    <MainLayout user={user}>
      <Head>
        <title>Service Desk - Главная</title>
      </Head>
      <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg: mt-3">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Последние 30 дней (Ваша Команда)
        </h3>

        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.id}
              className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
            >
              <dt>
                <div className="absolute bg-pink-800 rounded-md p-3">
                  <item.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {item.stat}
                </p>
                <p
                  className={classNames(
                    item.changeType === "increase"
                      ? "text-green-600"
                      : "text-red-600",
                    "ml-2 flex items-baseline text-sm font-semibold"
                  )}
                >
                  {item.changeType === "increase" ? (
                    <ArrowSmUpIcon
                      className="self-center flex-shrink-0 h-5 w-5 text-green-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowSmDownIcon
                      className="self-center flex-shrink-0 h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  )}

                  <span className="sr-only">
                    {item.changeType === "increase" ? "Increased" : "Decreased"}{" "}
                    by
                  </span>
                  {item.change}
                </p>
                <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-gray-500 hover:text-indigo-500"
                    >
                      {" "}
                      Подробнее
                      <span className="sr-only"> {item.name} stats</span>
                    </a>
                  </div>
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </MainLayout>
  );
};

export default Home;
