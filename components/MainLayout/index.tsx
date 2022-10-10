import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentReportIcon,
  HomeIcon,
  MenuAlt1Icon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XIcon,
  InboxIcon,
} from "@heroicons/react/outline";
import {
  CashIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import axios from "axios";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/slices/user";
import Image from "next/image";

const navigation = [
  { name: "Главная", href: "/", icon: HomeIcon, current: true },
  { name: "История", href: "/history", icon: InboxIcon, current: false },
  { name: "Балансы", href: "/balances", icon: ScaleIcon, current: false },
  { name: "Карты", href: "/cards", icon: CreditCardIcon, current: false },
  { name: "Клиенты", href: "/clients", icon: UserGroupIcon, current: false },
  {
    name: "Отчёты",
    href: "/reports",
    icon: DocumentReportIcon,
    current: false,
  },
];
const secondaryNavigation = [
  { name: "Настройки", href: "/settings", icon: CogIcon },
  { name: "Помощь", href: "/help", icon: QuestionMarkCircleIcon },
  { name: "Приватность", href: "/privacy", icon: ShieldCheckIcon },
];
const cards = [
  { name: "Account balance", href: "#", icon: ScaleIcon, amount: "$30,659.45" },
  // More items...
];
const transactions = [
  {
    id: 1,
    name: "Payment to Molly Sanders",
    href: "#",
    amount: "$20,000",
    currency: "USD",
    status: "success",
    date: "July 11, 2020",
    datetime: "2020-07-11",
  },
  // More transactions...
];
const statusStyles = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userData = useAppSelector(selectUserData);
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-pink-900">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <Link href={"/"}>
                    <svg
                      className="h-8 w-auto fill-white"
                      viewBox="0 0 5000 1554"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m544.5 1-128 .5-16 3.8C334.6 20.9 304.9 31 263.7 51.6c-49.3 24.7-88.6 54.2-131.7 99C70.5 214.4 27.4 297.1 9.6 385.1c-4.9 24.3-6.7 39.8-7.7 64.9-1.4 39.8-2.3 514.9-1 594.5 1.2 75 1.6 82 6.1 109.3 7.6 45.2 22.6 91.6 42.9 132.8 24 48.6 51.1 86.4 90.1 125.4 39.3 39.4 77.9 67.4 127 92 52.1 26.1 113.5 44.3 159.5 47.1 23.5 1.4 396.1 2.8 787.9 2.8l342.8.1-.6-525.8c-.3-289.1-1-539.4-1.5-556.2-1-31.6-2.8-50.2-7.7-77-14.8-81.5-50.8-158.6-103.6-222-13.9-16.7-43.3-46.2-59.3-59.6-73-60.7-149.8-95-245-109.4-11.6-1.8-21.6-2.3-58.5-3-45.6-.9-308.6-.9-536.5 0zm108.1 234.8c5.4 4.9 21 19.6 34.5 32.8 25 24.4 35.5 33.4 39 33.4 3.2 0 11.3-8.5 24.9-26 7.1-9.1 15.3-19.2 18.2-22.4 9.5-10.5 11.9-9 34.1 20.4 15 20 22.3 28 25.4 28 3.6 0 15.8-10.7 45.6-39.8 15.6-15.3 30.8-29.4 33.9-31.6 5.2-3.5 6-3.8 10.2-3.2l4.6.7v38.8c0 21.3.3 52.3.7 68.9l.6 30.1 5.6 2.2c17.8 7.1 52.8 24.1 69.1 33.7 15.3 8.9 37.5 24.2 51.9 35.8 16.5 13.2 43.7 39.6 57.4 55.7 56.1 65.7 91.4 144.8 102.2 228.7 2.4 19.2 3.4 106.3 3.5 311.2V1213h-191.7c-186.4-.1-264.5-.9-292.3-3-44.4-3.5-93.9-17.5-140.5-39.9-46.4-22.3-83.1-48.4-120-85.5-48.7-48.8-83-104.1-104.5-168.6-24.4-73.1-29.1-149.2-14-226.5 10.5-53.3 33.1-107.1 65.3-155.5 13.6-20.5 26.8-36.1 51.6-61.3 32.4-33 56.6-52.2 89.6-71.2 18.3-10.6 53.9-28.1 63.5-31.3l9.5-3.1.6-64.8c.6-66.1.8-70.1 4.5-73.8 3.3-3.3 6.6-1.9 17 7.3z" />
                      <path d="M751.5 607.5c-63.2 10.3-114.9 53.3-135.4 112.8-22.2 64.3-6.1 132.8 42.1 179.2 21.1 20.4 42.5 33.1 72.8 43.1 11.4 3.7 11.6 3.7 33.5 4.5 12.1.4 59.3.8 104.9.8l82.8.1-.6-32.8c-.3-18-.8-52.3-1.1-76.2-.6-48.1-2-83.8-3.6-94.5-1.6-10.1-8.1-29.3-14.3-42-23.7-48.3-67.3-82-121.1-93.5-13.2-2.9-46.4-3.7-60-1.5zM3836.2 56c-44.6 6.3-77.1 32.9-86.4 70.8-3 12-2.9 32.2.1 43.7 6.7 25.2 24.2 46.2 48.9 58.5 17 8.4 35.2 12.2 59.2 12.2 35.7 0 63.4-9.8 83-29.4 17.1-17.1 25.5-36.5 26.7-61.5 1.2-25.7-5.5-45.4-21.1-62-14.6-15.7-31.7-25-56.1-30.4-10.2-2.3-43.2-3.4-54.3-1.9zM2005.5 141c-69.6 5.1-119.1 21.2-161.9 52.7-12.8 9.5-30.1 27-38.8 39.3-14.2 20.1-24.7 45-28.9 68.9-2.4 13.5-2.9 42.1-1 56.1 4.5 32.6 15.7 56.5 37.2 79.5 11.1 11.8 29.5 24.7 49.9 35 25.7 13 72.5 27.4 118.5 36.5 28.5 5.7 63.2 13.8 72.7 17 17.4 6 28.2 13 32.4 21.1 2.8 5.5 3 13.7.4 19.7-5.6 13.1-20.7 19.2-53.1 21.4-61 4.1-131.6-12-192.6-43.8L1826 537l-1.4 3.3c-.7 1.7-14.5 32.9-30.5 69.1-16.1 36.3-29 66.5-28.7 67.1.2.6 6.6 4.3 14.3 8.2 64.9 33.3 158.7 52.3 245.8 49.9 76.4-2.1 129.6-17.1 175.8-49.7 42.2-29.8 69.1-73.7 74.7-122.1 1.6-13.3.8-39.6-1.5-52.8-3.2-18.4-9.9-35.3-20-50.5-11.3-17-23.3-28.7-42-41-20.9-13.8-39.4-22.5-67.1-31.5-22.6-7.3-41.7-11.9-85.9-20.5-43.6-8.6-57.4-11.9-70.4-16.9-18.9-7.3-26.1-15.2-26.1-28.3 0-17 14.6-28.1 42.8-33 13.6-2.3 47.2-2.2 64.7.1 37.4 5.1 74.3 16.4 113.4 34.7 6.1 2.9 11.3 5 11.4 4.8 1-1.2 56.7-136.6 56.7-137.6 0-.7-5.3-3.9-11.7-7.2-43.7-21.8-91.9-34.7-152.3-40.6-18.7-1.9-65.9-2.7-82.5-1.5zM2535.3 270.1c-66.4 4.2-125.4 29.7-167.9 72.6-34.1 34.4-53.4 74.4-60.6 125.8-1.9 13.6-1.6 50.4.5 64.5 11.1 72.3 53 129.7 120.2 164.6 29.7 15.4 62.6 25.1 102 30.1 17.2 2.1 68.6 2.5 86.5.5 61.8-6.8 107.9-26.5 144.9-62.2l7.5-7.1-20-20.2c-10.9-11.1-32.5-32.9-47.9-48.4l-28-28.2-10.5 7.1c-19.6 13.1-39.3 21.2-57.4 23.7-11.4 1.6-38.5 1.4-49.6-.4-11.5-1.9-24-6.1-31.8-10.6-8.6-5.1-22.9-20-27.3-28.4-2-3.9-4-8-4.4-9.3l-.6-2.2h308l.6-4.3c1.6-11.5 2.3-41.2 1.4-56.4-2.6-43.7-13.5-78.2-34.6-110.3-27.4-41.5-67.6-71.1-119.3-87.8-35.1-11.3-72-15.7-111.7-13.1zm42.7 126.6c14.3 3.3 29.3 13.2 37.3 24.6 6.7 9.4 14.7 26.5 14.7 31.4 0 1.1-12.3 1.3-71.6 1.3h-71.6l.7-3.8c1.1-5.9 6-17.5 10.5-24.6 15.7-24.8 47.9-36.5 80-28.9zM3158.4 270.1c-47.3 3.4-86.9 19.3-115 46.1l-9.4 9V277h-174v445h183V618.1c0-114.7.2-118.9 6.1-136.6 4.2-12.5 8.1-18.8 16.8-27.5 12.3-12.1 28.6-20 48.5-23.5 13.6-2.3 48.8-1.7 61.4 1l2.2.5V269l-4.2.1c-2.4.1-9.3.5-15.4 1zM4246.1 270.1c-69.6 4.5-130.5 29.6-173.8 71.9-46.6 45.5-68.1 103.1-64.2 172.2 1.9 33.6 9.1 60.7 24 89.8 33 64.3 102.6 110 186.7 122.4 41.8 6.2 89.3 4.2 127.2-5.4 65.6-16.6 116.5-58 138.7-112.8 3.7-9.1 3.7-9.4 1.8-10.5-4.7-2.6-139.7-68.8-139.9-68.5-.2.2-2.4 4.3-5 9.1-12.6 23.4-29.3 38.5-50.1 45.4-7.1 2.4-9.6 2.7-22 2.7-10.5 0-15.6-.4-20.5-1.7-27-7.5-45.9-27.7-52.6-56.3-3.8-16.4-3.5-43.8.6-59.9 6.9-27.4 26.4-47.1 53.5-54.1 10.3-2.6 27.6-2.4 37.8.4 22.7 6.4 40.7 22.2 53.7 47.3l4.5 8.6 18-8.8c9.9-4.9 41.7-20.6 70.8-34.9 29-14.2 52.7-26.3 52.7-26.8 0-1.5-5-13.2-9.2-21.6-23.2-46.3-68-81.6-124.3-97.9-20.9-6.1-38.9-9-64.5-10.7-18.4-1.1-24.4-1.1-43.9.1zM4733.8 270c-66.2 4.9-122.1 28.4-164.1 69-19.5 18.8-33 37.2-44.2 60.2-22.9 47-28.4 104.8-14.9 158 9.1 36.1 27.9 69.1 54.9 96.4 49.9 50.3 120.7 76.4 206.9 76.4 81.7-.1 140.4-20.1 186.6-63.6 3.8-3.7 7-7.1 7-7.7 0-.5-21.4-22.5-47.6-48.8l-47.6-47.7-10.7 7c-17.6 11.6-33.3 18.8-49 22.4-9.1 2.1-43.4 3-54 1.5-26.2-3.9-43.5-13-56.5-30-3.6-4.7-11.6-18.8-11.6-20.6 0-.3 69.5-.5 154.4-.5h154.3l1.3-20.6c3.1-49.6-3.5-90.4-20.5-126.2-19.2-40.3-54.4-76-95.6-96.7-18.8-9.5-46.9-19.1-68.5-23.5-22.9-4.5-57.5-6.7-80.6-5zm41.8 126.5c23.3 5.3 41.8 22.9 50.5 48.4 3.5 10.2 11.7 9.1-69.6 9.1h-71.4l.6-3.3c1.2-6.4 6.5-18.8 11.2-25.9 15.8-24.2 47-35.4 78.7-28.3zM3190 277.7c0 .4 40.1 100.6 89.2 222.5l89.2 221.8h190.1l89-221.2c49-121.6 89.1-221.8 89.3-222.5.3-1.1-14.9-1.3-86.5-1.1l-86.8.3-47 117.3c-25.8 64.4-47.5 117.9-48 118.8-.8 1.2-10.8-24.4-42.9-109.8-23-61.2-43.2-114.8-44.8-119.1l-3-7.7h-93.9c-51.6 0-93.9.3-93.9.7zM3766 499.5V722h184l-.2-222.3-.3-222.2-91.7-.3-91.8-.2v222.5zM3456 1189.5V1491h184v-52.8l.1-52.7 14.7-15.4 14.8-15.4 53.8 68.2 53.8 68.1H3999l-7.2-9.2c-60.1-76.1-190.8-242.4-190.7-242.8 0-.3 41.1-43.5 91.3-96l91.2-95.5-216.1-.6-63.7 64.3-63.8 64.3V888h-184v301.5zM1800 1206.5V1491h149.8c92 0 155.1-.4 163.7-1 74.3-5.4 133.7-25.7 182.8-62.3 54.9-41 89.1-97.1 100.7-165.4 3.2-19.4 4.2-32.5 4.2-56.8 0-25.2-1.5-41.8-5.7-63.5-21.2-108.7-107.6-187.9-230.9-211.9-39.1-7.6-50.9-8.1-220.3-8.1H1800v284.5zm295.5-133.4c51.8 6.3 89.8 35.6 104.9 81 5.8 17.3 7 26.4 7.1 51.9 0 25.6-1.3 35.5-7.1 52.9-6.6 20.1-15.9 34.8-30.7 48.7-20.2 19-48.2 30.5-81.2 33.3-6.6.6-31 1.1-54.2 1.1H1992v-270h47.3c28 0 50.8.4 56.2 1.1zM2666 1039.6c-24.1 2.8-40 5.9-57.2 10.9-83.8 24.7-145.3 88.7-161.2 167.7-3.7 18.1-4.7 29.1-4.8 49.8 0 43 9.4 79 29.6 113.4 23.7 40.2 64.5 74.8 111.3 94.2 41.4 17.2 83.8 24.3 138.3 23.1 39.7-.9 65.3-4.8 94.2-14.4 31-10.2 64.4-30.6 84.8-51.7l4.4-4.6-6.9-7.3c-3.8-3.9-25.3-25.7-47.8-48.3l-40.8-41-11.1 7.3c-20 13.2-37.3 20.4-56.3 23.3-11.8 1.9-39 1.7-50.4-.4-20.9-3.7-33.9-10.1-46.6-23-6.2-6.2-9.2-10.2-12.8-17.2-2.5-5-4.4-9.4-4-9.8.3-.3 69.8-.6 154.4-.6h153.7l.8-12.8c2.3-33.1.6-64.4-4.8-89.2-9.6-44.7-35.7-86.7-72.6-116.9-25.6-20.8-63.1-38.2-100.4-46.5-22.5-5-30.7-5.8-61.3-6.1-15.9-.2-30.6-.1-32.5.1zm49.6 126.4c14.4 3.7 27.2 11.7 35.9 22.8 5.2 6.4 12.7 21.1 14.9 28.9l1.5 5.3H2624l.6-2.8c1.6-6.6 6.6-18.7 10.1-24.5 8.6-14.2 24.4-25.6 41.4-29.7 10.6-2.6 29.1-2.6 39.5 0zM3169 1039.6c-46.7 4.1-79.9 13-113 30.1-17.1 8.8-29.5 17.8-42.6 30.8-15.5 15.5-24.7 30.2-31.3 50-5.8 17.6-7.6 40.4-5 62 5 40.9 26.5 70.2 65.7 89.5 25.9 12.8 61.3 21.1 118 27.5 17.3 2 35 4.3 39.5 5.1 11.7 2.2 23.2 6.1 26.5 8.9 6.8 5.7 6.7 13.5-.4 20.2-8.5 8.2-24.4 10.9-59.4 10-46.9-1.2-92.5-11.9-130.9-30.8-9-4.4-16.5-7.9-16.6-7.7-.7.7-48.8 116.5-49.2 118.5-.4 1.9.7 2.8 8.3 6.6 38.5 19.3 97.3 33.4 157.9 37.8 18.1 1.3 67.2.7 83-1.1 43.9-4.8 75.6-14 106-30.8 39.4-21.8 65.3-55.4 73.2-94.9 2.3-11.6 2.2-35.9-.1-49.8-7.1-42.3-32.3-71.5-77.7-90-8-3.3-33.4-10.6-45.9-13.3-9.5-2.1-47.8-7.7-73-10.7-26.9-3.2-40.4-6.3-48.6-11-5.4-3.1-7.4-6.4-7.4-11.9 0-5.3 2.9-9.3 9.7-13.3 8.5-4.9 17.6-6.5 42.1-7 25.9-.6 37.2.3 61.7 5.2 27.4 5.5 42 10.3 63.8 21.1l10.8 5.4 2-4.8c6.1-14.1 47.9-115.1 47.9-115.7 0-.3-5.1-3-11.2-6-27.2-13-62.4-21.8-109.4-27.6-13.6-1.6-24.1-2.1-53.4-2.4-20.1-.1-38.5-.1-41 .1z" />
                    </svg>
                  </Link>
                </div>
                <nav
                  className="mt-5 flex-shrink-0 h-full divide-y divide-pink-800 overflow-y-auto"
                  aria-label="Sidebar"
                >
                  <div className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-pink-800 text-white"
                            : "text-white hover:text-white hover:bg-pink-800",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <item.icon
                          className="mr-4 flex-shrink-0 h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="mt-6 pt-6">
                    <div className="px-2 space-y-1">
                      {secondaryNavigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:text-white hover:bg-pink-800"
                        >
                          <item.icon
                            className="mr-4 h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow bg-pink-900 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Link href={"/"}>
                <svg
                  className="h-10 w-auto fill-white cursor-pointer"
                  viewBox="0 0 5000 1554"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m544.5 1-128 .5-16 3.8C334.6 20.9 304.9 31 263.7 51.6c-49.3 24.7-88.6 54.2-131.7 99C70.5 214.4 27.4 297.1 9.6 385.1c-4.9 24.3-6.7 39.8-7.7 64.9-1.4 39.8-2.3 514.9-1 594.5 1.2 75 1.6 82 6.1 109.3 7.6 45.2 22.6 91.6 42.9 132.8 24 48.6 51.1 86.4 90.1 125.4 39.3 39.4 77.9 67.4 127 92 52.1 26.1 113.5 44.3 159.5 47.1 23.5 1.4 396.1 2.8 787.9 2.8l342.8.1-.6-525.8c-.3-289.1-1-539.4-1.5-556.2-1-31.6-2.8-50.2-7.7-77-14.8-81.5-50.8-158.6-103.6-222-13.9-16.7-43.3-46.2-59.3-59.6-73-60.7-149.8-95-245-109.4-11.6-1.8-21.6-2.3-58.5-3-45.6-.9-308.6-.9-536.5 0zm108.1 234.8c5.4 4.9 21 19.6 34.5 32.8 25 24.4 35.5 33.4 39 33.4 3.2 0 11.3-8.5 24.9-26 7.1-9.1 15.3-19.2 18.2-22.4 9.5-10.5 11.9-9 34.1 20.4 15 20 22.3 28 25.4 28 3.6 0 15.8-10.7 45.6-39.8 15.6-15.3 30.8-29.4 33.9-31.6 5.2-3.5 6-3.8 10.2-3.2l4.6.7v38.8c0 21.3.3 52.3.7 68.9l.6 30.1 5.6 2.2c17.8 7.1 52.8 24.1 69.1 33.7 15.3 8.9 37.5 24.2 51.9 35.8 16.5 13.2 43.7 39.6 57.4 55.7 56.1 65.7 91.4 144.8 102.2 228.7 2.4 19.2 3.4 106.3 3.5 311.2V1213h-191.7c-186.4-.1-264.5-.9-292.3-3-44.4-3.5-93.9-17.5-140.5-39.9-46.4-22.3-83.1-48.4-120-85.5-48.7-48.8-83-104.1-104.5-168.6-24.4-73.1-29.1-149.2-14-226.5 10.5-53.3 33.1-107.1 65.3-155.5 13.6-20.5 26.8-36.1 51.6-61.3 32.4-33 56.6-52.2 89.6-71.2 18.3-10.6 53.9-28.1 63.5-31.3l9.5-3.1.6-64.8c.6-66.1.8-70.1 4.5-73.8 3.3-3.3 6.6-1.9 17 7.3z" />
                  <path d="M751.5 607.5c-63.2 10.3-114.9 53.3-135.4 112.8-22.2 64.3-6.1 132.8 42.1 179.2 21.1 20.4 42.5 33.1 72.8 43.1 11.4 3.7 11.6 3.7 33.5 4.5 12.1.4 59.3.8 104.9.8l82.8.1-.6-32.8c-.3-18-.8-52.3-1.1-76.2-.6-48.1-2-83.8-3.6-94.5-1.6-10.1-8.1-29.3-14.3-42-23.7-48.3-67.3-82-121.1-93.5-13.2-2.9-46.4-3.7-60-1.5zM3836.2 56c-44.6 6.3-77.1 32.9-86.4 70.8-3 12-2.9 32.2.1 43.7 6.7 25.2 24.2 46.2 48.9 58.5 17 8.4 35.2 12.2 59.2 12.2 35.7 0 63.4-9.8 83-29.4 17.1-17.1 25.5-36.5 26.7-61.5 1.2-25.7-5.5-45.4-21.1-62-14.6-15.7-31.7-25-56.1-30.4-10.2-2.3-43.2-3.4-54.3-1.9zM2005.5 141c-69.6 5.1-119.1 21.2-161.9 52.7-12.8 9.5-30.1 27-38.8 39.3-14.2 20.1-24.7 45-28.9 68.9-2.4 13.5-2.9 42.1-1 56.1 4.5 32.6 15.7 56.5 37.2 79.5 11.1 11.8 29.5 24.7 49.9 35 25.7 13 72.5 27.4 118.5 36.5 28.5 5.7 63.2 13.8 72.7 17 17.4 6 28.2 13 32.4 21.1 2.8 5.5 3 13.7.4 19.7-5.6 13.1-20.7 19.2-53.1 21.4-61 4.1-131.6-12-192.6-43.8L1826 537l-1.4 3.3c-.7 1.7-14.5 32.9-30.5 69.1-16.1 36.3-29 66.5-28.7 67.1.2.6 6.6 4.3 14.3 8.2 64.9 33.3 158.7 52.3 245.8 49.9 76.4-2.1 129.6-17.1 175.8-49.7 42.2-29.8 69.1-73.7 74.7-122.1 1.6-13.3.8-39.6-1.5-52.8-3.2-18.4-9.9-35.3-20-50.5-11.3-17-23.3-28.7-42-41-20.9-13.8-39.4-22.5-67.1-31.5-22.6-7.3-41.7-11.9-85.9-20.5-43.6-8.6-57.4-11.9-70.4-16.9-18.9-7.3-26.1-15.2-26.1-28.3 0-17 14.6-28.1 42.8-33 13.6-2.3 47.2-2.2 64.7.1 37.4 5.1 74.3 16.4 113.4 34.7 6.1 2.9 11.3 5 11.4 4.8 1-1.2 56.7-136.6 56.7-137.6 0-.7-5.3-3.9-11.7-7.2-43.7-21.8-91.9-34.7-152.3-40.6-18.7-1.9-65.9-2.7-82.5-1.5zM2535.3 270.1c-66.4 4.2-125.4 29.7-167.9 72.6-34.1 34.4-53.4 74.4-60.6 125.8-1.9 13.6-1.6 50.4.5 64.5 11.1 72.3 53 129.7 120.2 164.6 29.7 15.4 62.6 25.1 102 30.1 17.2 2.1 68.6 2.5 86.5.5 61.8-6.8 107.9-26.5 144.9-62.2l7.5-7.1-20-20.2c-10.9-11.1-32.5-32.9-47.9-48.4l-28-28.2-10.5 7.1c-19.6 13.1-39.3 21.2-57.4 23.7-11.4 1.6-38.5 1.4-49.6-.4-11.5-1.9-24-6.1-31.8-10.6-8.6-5.1-22.9-20-27.3-28.4-2-3.9-4-8-4.4-9.3l-.6-2.2h308l.6-4.3c1.6-11.5 2.3-41.2 1.4-56.4-2.6-43.7-13.5-78.2-34.6-110.3-27.4-41.5-67.6-71.1-119.3-87.8-35.1-11.3-72-15.7-111.7-13.1zm42.7 126.6c14.3 3.3 29.3 13.2 37.3 24.6 6.7 9.4 14.7 26.5 14.7 31.4 0 1.1-12.3 1.3-71.6 1.3h-71.6l.7-3.8c1.1-5.9 6-17.5 10.5-24.6 15.7-24.8 47.9-36.5 80-28.9zM3158.4 270.1c-47.3 3.4-86.9 19.3-115 46.1l-9.4 9V277h-174v445h183V618.1c0-114.7.2-118.9 6.1-136.6 4.2-12.5 8.1-18.8 16.8-27.5 12.3-12.1 28.6-20 48.5-23.5 13.6-2.3 48.8-1.7 61.4 1l2.2.5V269l-4.2.1c-2.4.1-9.3.5-15.4 1zM4246.1 270.1c-69.6 4.5-130.5 29.6-173.8 71.9-46.6 45.5-68.1 103.1-64.2 172.2 1.9 33.6 9.1 60.7 24 89.8 33 64.3 102.6 110 186.7 122.4 41.8 6.2 89.3 4.2 127.2-5.4 65.6-16.6 116.5-58 138.7-112.8 3.7-9.1 3.7-9.4 1.8-10.5-4.7-2.6-139.7-68.8-139.9-68.5-.2.2-2.4 4.3-5 9.1-12.6 23.4-29.3 38.5-50.1 45.4-7.1 2.4-9.6 2.7-22 2.7-10.5 0-15.6-.4-20.5-1.7-27-7.5-45.9-27.7-52.6-56.3-3.8-16.4-3.5-43.8.6-59.9 6.9-27.4 26.4-47.1 53.5-54.1 10.3-2.6 27.6-2.4 37.8.4 22.7 6.4 40.7 22.2 53.7 47.3l4.5 8.6 18-8.8c9.9-4.9 41.7-20.6 70.8-34.9 29-14.2 52.7-26.3 52.7-26.8 0-1.5-5-13.2-9.2-21.6-23.2-46.3-68-81.6-124.3-97.9-20.9-6.1-38.9-9-64.5-10.7-18.4-1.1-24.4-1.1-43.9.1zM4733.8 270c-66.2 4.9-122.1 28.4-164.1 69-19.5 18.8-33 37.2-44.2 60.2-22.9 47-28.4 104.8-14.9 158 9.1 36.1 27.9 69.1 54.9 96.4 49.9 50.3 120.7 76.4 206.9 76.4 81.7-.1 140.4-20.1 186.6-63.6 3.8-3.7 7-7.1 7-7.7 0-.5-21.4-22.5-47.6-48.8l-47.6-47.7-10.7 7c-17.6 11.6-33.3 18.8-49 22.4-9.1 2.1-43.4 3-54 1.5-26.2-3.9-43.5-13-56.5-30-3.6-4.7-11.6-18.8-11.6-20.6 0-.3 69.5-.5 154.4-.5h154.3l1.3-20.6c3.1-49.6-3.5-90.4-20.5-126.2-19.2-40.3-54.4-76-95.6-96.7-18.8-9.5-46.9-19.1-68.5-23.5-22.9-4.5-57.5-6.7-80.6-5zm41.8 126.5c23.3 5.3 41.8 22.9 50.5 48.4 3.5 10.2 11.7 9.1-69.6 9.1h-71.4l.6-3.3c1.2-6.4 6.5-18.8 11.2-25.9 15.8-24.2 47-35.4 78.7-28.3zM3190 277.7c0 .4 40.1 100.6 89.2 222.5l89.2 221.8h190.1l89-221.2c49-121.6 89.1-221.8 89.3-222.5.3-1.1-14.9-1.3-86.5-1.1l-86.8.3-47 117.3c-25.8 64.4-47.5 117.9-48 118.8-.8 1.2-10.8-24.4-42.9-109.8-23-61.2-43.2-114.8-44.8-119.1l-3-7.7h-93.9c-51.6 0-93.9.3-93.9.7zM3766 499.5V722h184l-.2-222.3-.3-222.2-91.7-.3-91.8-.2v222.5zM3456 1189.5V1491h184v-52.8l.1-52.7 14.7-15.4 14.8-15.4 53.8 68.2 53.8 68.1H3999l-7.2-9.2c-60.1-76.1-190.8-242.4-190.7-242.8 0-.3 41.1-43.5 91.3-96l91.2-95.5-216.1-.6-63.7 64.3-63.8 64.3V888h-184v301.5zM1800 1206.5V1491h149.8c92 0 155.1-.4 163.7-1 74.3-5.4 133.7-25.7 182.8-62.3 54.9-41 89.1-97.1 100.7-165.4 3.2-19.4 4.2-32.5 4.2-56.8 0-25.2-1.5-41.8-5.7-63.5-21.2-108.7-107.6-187.9-230.9-211.9-39.1-7.6-50.9-8.1-220.3-8.1H1800v284.5zm295.5-133.4c51.8 6.3 89.8 35.6 104.9 81 5.8 17.3 7 26.4 7.1 51.9 0 25.6-1.3 35.5-7.1 52.9-6.6 20.1-15.9 34.8-30.7 48.7-20.2 19-48.2 30.5-81.2 33.3-6.6.6-31 1.1-54.2 1.1H1992v-270h47.3c28 0 50.8.4 56.2 1.1zM2666 1039.6c-24.1 2.8-40 5.9-57.2 10.9-83.8 24.7-145.3 88.7-161.2 167.7-3.7 18.1-4.7 29.1-4.8 49.8 0 43 9.4 79 29.6 113.4 23.7 40.2 64.5 74.8 111.3 94.2 41.4 17.2 83.8 24.3 138.3 23.1 39.7-.9 65.3-4.8 94.2-14.4 31-10.2 64.4-30.6 84.8-51.7l4.4-4.6-6.9-7.3c-3.8-3.9-25.3-25.7-47.8-48.3l-40.8-41-11.1 7.3c-20 13.2-37.3 20.4-56.3 23.3-11.8 1.9-39 1.7-50.4-.4-20.9-3.7-33.9-10.1-46.6-23-6.2-6.2-9.2-10.2-12.8-17.2-2.5-5-4.4-9.4-4-9.8.3-.3 69.8-.6 154.4-.6h153.7l.8-12.8c2.3-33.1.6-64.4-4.8-89.2-9.6-44.7-35.7-86.7-72.6-116.9-25.6-20.8-63.1-38.2-100.4-46.5-22.5-5-30.7-5.8-61.3-6.1-15.9-.2-30.6-.1-32.5.1zm49.6 126.4c14.4 3.7 27.2 11.7 35.9 22.8 5.2 6.4 12.7 21.1 14.9 28.9l1.5 5.3H2624l.6-2.8c1.6-6.6 6.6-18.7 10.1-24.5 8.6-14.2 24.4-25.6 41.4-29.7 10.6-2.6 29.1-2.6 39.5 0zM3169 1039.6c-46.7 4.1-79.9 13-113 30.1-17.1 8.8-29.5 17.8-42.6 30.8-15.5 15.5-24.7 30.2-31.3 50-5.8 17.6-7.6 40.4-5 62 5 40.9 26.5 70.2 65.7 89.5 25.9 12.8 61.3 21.1 118 27.5 17.3 2 35 4.3 39.5 5.1 11.7 2.2 23.2 6.1 26.5 8.9 6.8 5.7 6.7 13.5-.4 20.2-8.5 8.2-24.4 10.9-59.4 10-46.9-1.2-92.5-11.9-130.9-30.8-9-4.4-16.5-7.9-16.6-7.7-.7.7-48.8 116.5-49.2 118.5-.4 1.9.7 2.8 8.3 6.6 38.5 19.3 97.3 33.4 157.9 37.8 18.1 1.3 67.2.7 83-1.1 43.9-4.8 75.6-14 106-30.8 39.4-21.8 65.3-55.4 73.2-94.9 2.3-11.6 2.2-35.9-.1-49.8-7.1-42.3-32.3-71.5-77.7-90-8-3.3-33.4-10.6-45.9-13.3-9.5-2.1-47.8-7.7-73-10.7-26.9-3.2-40.4-6.3-48.6-11-5.4-3.1-7.4-6.4-7.4-11.9 0-5.3 2.9-9.3 9.7-13.3 8.5-4.9 17.6-6.5 42.1-7 25.9-.6 37.2.3 61.7 5.2 27.4 5.5 42 10.3 63.8 21.1l10.8 5.4 2-4.8c6.1-14.1 47.9-115.1 47.9-115.7 0-.3-5.1-3-11.2-6-27.2-13-62.4-21.8-109.4-27.6-13.6-1.6-24.1-2.1-53.4-2.4-20.1-.1-38.5-.1-41 .1z" />
                </svg>
              </Link>
            </div>
            <nav
              className="mt-5 flex-1 flex flex-col divide-y divide-pink-800 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="px-2 space-y-1">
                {navigation.map((item) => (
                  <Link href={item.href} key={item.name}>
                    <a
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-pink-800 text-white"
                          : "text-white hover:text-white hover:bg-pink-800",
                        "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className="mr-4 flex-shrink-0 h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
              <div className="mt-6 pt-6">
                <div className="px-2 space-y-1">
                  {secondaryNavigation.map((item) => (
                    <Link href={item.href} key={item.name}>
                      <a className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-white hover:text-white hover:bg-pink-800">
                        <item.icon
                          className="mr-4 h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
          <div className="flex-shrink-0 flex  p-4 bg-pink-900">
            <span className={"text-white text-xs text-opacity-20"}>
              Service Desk v0.2.0
            </span>
          </div>
        </div>

        <div className="lg:pl-64 flex flex-col flex-1">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Search bar */}
            <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="flex-1 flex">
                <form className="w-full flex md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div
                      className="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                      aria-hidden="true"
                    >
                      <SearchIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search-field"
                      name="search-field"
                      className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                      placeholder="Поиск"
                      type="search"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiW5wvw8ewiFwoT3JQiIMunkSFLhKM3kSwCVR9XSsBNpuROItAXMUnB7lyc-JCxowW8CM&usqp=CAU"
                        alt=""
                      />
                      <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                        <span className="sr-only">Open user menu for </span>
                        {userData.data?.person_friendlyname}
                      </span>
                      <ChevronDownIcon
                        className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/profile">
                            <a
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              )}
                            >
                              Мой Профиль
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href={"/settings"}>
                            <a
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Настройки
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Выйти
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          {children}
          {/*<main className="flex-1 pb-8">*/}
          {/*    /!* Page header *!/*/}
          {/*    <div className="bg-white shadow">*/}
          {/*        <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">*/}
          {/*            <div*/}
          {/*                className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">*/}
          {/*                <div className="flex-1 min-w-0">*/}
          {/*                    /!* Profile *!/*/}
          {/*                    <div className="flex items-center">*/}
          {/*                        <img*/}
          {/*                            className="hidden h-16 w-16 rounded-full sm:block"*/}
          {/*                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiW5wvw8ewiFwoT3JQiIMunkSFLhKM3kSwCVR9XSsBNpuROItAXMUnB7lyc-JCxowW8CM&usqp=CAU"*/}
          {/*                            alt=""*/}
          {/*                        />*/}
          {/*                        <div>*/}
          {/*                            <div className="flex items-center">*/}
          {/*                                <img*/}
          {/*                                    className="h-16 w-16 rounded-full sm:hidden"*/}
          {/*                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiW5wvw8ewiFwoT3JQiIMunkSFLhKM3kSwCVR9XSsBNpuROItAXMUnB7lyc-JCxowW8CM&usqp=CAU"*/}
          {/*                                    alt=""*/}
          {/*                                />*/}
          {/*                                <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">*/}
          {/*                                    Здравствуйте, Falonchi Pistonchi*/}
          {/*                                </h1>*/}
          {/*                            </div>*/}
          {/*                            <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">*/}
          {/*                                <dt className="sr-only">Company</dt>*/}
          {/*                                <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">*/}
          {/*                                    <OfficeBuildingIcon*/}
          {/*                                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"*/}
          {/*                                        aria-hidden="true"*/}
          {/*                                    />*/}
          {/*                                    Duke street studio*/}
          {/*                                </dd>*/}
          {/*                                <dt className="sr-only">Account status</dt>*/}
          {/*                                <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">*/}
          {/*                                    <CheckCircleIcon*/}
          {/*                                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"*/}
          {/*                                        aria-hidden="true"*/}
          {/*                                    />*/}
          {/*                                    Verified account*/}
          {/*                                </dd>*/}
          {/*                            </dl>*/}
          {/*                        </div>*/}
          {/*                    </div>*/}
          {/*                </div>*/}
          {/*                <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">*/}
          {/*                    <button*/}
          {/*                        type="button"*/}
          {/*                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"*/}
          {/*                    >*/}
          {/*                        Add money*/}
          {/*                    </button>*/}
          {/*                    <button*/}
          {/*                        type="button"*/}
          {/*                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-800 hover:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"*/}
          {/*                    >*/}
          {/*                        Send money*/}
          {/*                    </button>*/}
          {/*                </div>*/}
          {/*            </div>*/}
          {/*        </div>*/}
          {/*    </div>*/}

          {/*    <div className="mt-8">*/}
          {/*        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">*/}
          {/*            <h2 className="text-lg leading-6 font-medium text-gray-900">Overview</h2>*/}
          {/*            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">*/}
          {/*                /!* Card *!/*/}
          {/*                {cards.map((card) => (*/}
          {/*                    <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg">*/}
          {/*                        <div className="p-5">*/}
          {/*                            <div className="flex items-center">*/}
          {/*                                <div className="flex-shrink-0">*/}
          {/*                                    <card.icon className="h-6 w-6 text-gray-400"*/}
          {/*                                               aria-hidden="true"/>*/}
          {/*                                </div>*/}
          {/*                                <div className="ml-5 w-0 flex-1">*/}
          {/*                                    <dl>*/}
          {/*                                        <dt className="text-sm font-medium text-gray-500 truncate">{card.name}</dt>*/}
          {/*                                        <dd>*/}
          {/*                                            <div*/}
          {/*                                                className="text-lg font-medium text-gray-900">{card.amount}</div>*/}
          {/*                                        </dd>*/}
          {/*                                    </dl>*/}
          {/*                                </div>*/}
          {/*                            </div>*/}
          {/*                        </div>*/}
          {/*                        <div className="bg-gray-50 px-5 py-3">*/}
          {/*                            <div className="text-sm">*/}
          {/*                                <a href={card.href}*/}
          {/*                                   className="font-medium text-cyan-700 hover:text-cyan-900">*/}
          {/*                                    View all*/}
          {/*                                </a>*/}
          {/*                            </div>*/}
          {/*                        </div>*/}
          {/*                    </div>*/}
          {/*                ))}*/}

          {/*            </div>*/}

          {/*        </div>*/}
          {/*        {children}*/}

          {/*        <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">*/}
          {/*            Recent activity*/}
          {/*        </h2>*/}

          {/*        /!* Activity list (smallest breakpoint only) *!/*/}
          {/*        <div className="shadow sm:hidden">*/}
          {/*            <ul role="list"*/}
          {/*                className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">*/}
          {/*                {transactions.map((transaction) => (*/}
          {/*                    <li key={transaction.id}>*/}
          {/*                        <a href={transaction.href}*/}
          {/*                           className="block px-4 py-4 bg-white hover:bg-gray-50">*/}
          {/*    <span className="flex items-center space-x-4">*/}
          {/*      <span className="flex-1 flex space-x-2 truncate">*/}
          {/*        <CashIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true"/>*/}
          {/*        <span className="flex flex-col text-gray-500 text-sm truncate">*/}
          {/*          <span className="truncate">{transaction.name}</span>*/}
          {/*          <span>*/}
          {/*            <span className="text-gray-900 font-medium">{transaction.amount}</span>{' '}*/}
          {/*              {transaction.currency}*/}
          {/*          </span>*/}
          {/*          <time dateTime={transaction.datetime}>{transaction.date}</time>*/}
          {/*        </span>*/}
          {/*      </span>*/}
          {/*      <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true"/>*/}
          {/*    </span>*/}
          {/*                        </a>*/}
          {/*                    </li>*/}
          {/*                ))}*/}
          {/*            </ul>*/}

          {/*            <nav*/}
          {/*                className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"*/}
          {/*                aria-label="Pagination"*/}
          {/*            >*/}
          {/*                <div className="flex-1 flex justify-between">*/}
          {/*                    <a*/}
          {/*                        href="#"*/}
          {/*                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"*/}
          {/*                    >*/}
          {/*                        Previous*/}
          {/*                    </a>*/}
          {/*                    <a*/}
          {/*                        href="#"*/}
          {/*                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"*/}
          {/*                    >*/}
          {/*                        Next*/}
          {/*                    </a>*/}
          {/*                </div>*/}
          {/*            </nav>*/}
          {/*        </div>*/}

          {/*        /!* Activity table (small breakpoint and up) *!/*/}
          {/*        <div className="hidden sm:block">*/}
          {/*            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">*/}
          {/*                <div className="flex flex-col mt-2">*/}
          {/*                    <div*/}
          {/*                        className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">*/}
          {/*                        <table className="min-w-full divide-y divide-gray-200">*/}
          {/*                            <thead>*/}
          {/*                            <tr>*/}
          {/*                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">*/}
          {/*                                    Transaction*/}
          {/*                                </th>*/}
          {/*                                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">*/}
          {/*                                    Amount*/}
          {/*                                </th>*/}
          {/*                                <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">*/}
          {/*                                    Status*/}
          {/*                                </th>*/}
          {/*                                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">*/}
          {/*                                    Date*/}
          {/*                                </th>*/}
          {/*                            </tr>*/}
          {/*                            </thead>*/}
          {/*                            <tbody className="bg-white divide-y divide-gray-200">*/}
          {/*                            {transactions.map((transaction) => (*/}
          {/*                                <tr key={transaction.id} className="bg-white">*/}
          {/*                                    <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">*/}
          {/*                                        <div className="flex">*/}
          {/*                                            <a href={transaction.href}*/}
          {/*                                               className="group inline-flex space-x-2 truncate text-sm">*/}
          {/*                                                <CashIcon*/}
          {/*                                                    className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"*/}
          {/*                                                    aria-hidden="true"*/}
          {/*                                                />*/}
          {/*                                                <p className="text-gray-500 truncate group-hover:text-gray-900">*/}
          {/*                                                    {transaction.name}*/}
          {/*                                                </p>*/}
          {/*                                            </a>*/}
          {/*                                        </div>*/}
          {/*                                    </td>*/}
          {/*                                    <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">*/}
          {/*                                        <span*/}
          {/*                                            className="text-gray-900 font-medium">{transaction.amount} </span>*/}
          {/*                                        {transaction.currency}*/}
          {/*                                    </td>*/}
          {/*                                    <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">*/}
          {/*            <span*/}
          {/*                className={classNames(*/}
          {/*                    statusStyles[transaction.status],*/}
          {/*                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'*/}
          {/*                )}*/}
          {/*            >*/}
          {/*              {transaction.status}*/}
          {/*            </span>*/}
          {/*                                    </td>*/}
          {/*                                    <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">*/}
          {/*                                        <time*/}
          {/*                                            dateTime={transaction.datetime}>{transaction.date}</time>*/}
          {/*                                    </td>*/}
          {/*                                </tr>*/}
          {/*                            ))}*/}
          {/*                            </tbody>*/}
          {/*                        </table>*/}
          {/*                        /!* Pagination *!/*/}
          {/*                        <nav*/}
          {/*                            className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"*/}
          {/*                            aria-label="Pagination"*/}
          {/*                        >*/}
          {/*                            <div className="hidden sm:block">*/}
          {/*                                <p className="text-sm text-gray-700">*/}
          {/*                                    Showing <span className="font-medium">1</span> to <span*/}
          {/*                                    className="font-medium">10</span> of{' '}*/}
          {/*                                    <span className="font-medium">20</span> results*/}
          {/*                                </p>*/}
          {/*                            </div>*/}
          {/*                            <div className="flex-1 flex justify-between sm:justify-end">*/}
          {/*                                <a*/}
          {/*                                    href="#"*/}
          {/*                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"*/}
          {/*                                >*/}
          {/*                                    Previous*/}
          {/*                                </a>*/}
          {/*                                <a*/}
          {/*                                    href="#"*/}
          {/*                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"*/}
          {/*                                >*/}
          {/*                                    Next*/}
          {/*                                </a>*/}
          {/*                            </div>*/}
          {/*                        </nav>*/}
          {/*                    </div>*/}
          {/*                </div>*/}
          {/*            </div>*/}
          {/*        </div>*/}
          {/*    </div>*/}
          {/*</main>*/}
        </div>
      </div>
    </>
  );
}
