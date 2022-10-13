import React from "react";
import {
  CheckIcon,
  MailOpenIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  ThumbUpIcon,
  UserIcon,
} from "@heroicons/react/outline";
import {
  CreatePublicLogDto,
  PublicLog,
  SingleTicket,
  UserData,
} from "../../utils/api/types";
import Moment from "react-moment";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import "moment/locale/ru";
import { ClassIcon } from "./classIcon";
import Link from "next/link";

import styles from "./TicketPage.module.scss";
import { Api } from "../../utils/api";
import { useRouter } from "next/router";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/slices/user";
import { StatusBadge } from "./status";
import tickets from "../../pages/tickets";
import moment from "moment";

interface TicketPageProps {
  ticketData: SingleTicket;
  userData: UserData;
}

const user = {
  name: "Whitney Francis",
  email: "whitney@example.com",
  imageUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiW5wvw8ewiFwoT3JQiIMunkSFLhKM3kSwCVR9XSsBNpuROItAXMUnB7lyc-JCxowW8CM&usqp=CAU",
};
const attachments = [
  { name: "Test.pdf", href: "#" },
  { name: "Image.img", href: "#" },
];
const eventTypes = {
  applied: { icon: MailOpenIcon, bgColorClass: "bg-gray-400" },
  advanced: { icon: ThumbUpIcon, bgColorClass: "bg-pink-800" },
  completed: { icon: CheckIcon, bgColorClass: "bg-green-600" },
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const TicketPage: React.FC<TicketPageProps> = ({
  ticketData,
  userData,
}) => {
  const [publicLogs, setPublicLogs] = React.useState<PublicLog[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();
  const [comment, setComment] = React.useState({
    key: ticketData.id,
    finalclass: ticketData.finalclass,
    message: "",
  });
  React.useEffect(() => {
    (async () => {
      try {
        const arr = await Api().ticket.getPublicLog(ticketData.id, "incident");
        setPublicLogs(arr);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const createPublicLog = async (dto: CreatePublicLogDto) => {
    try {
      const data = await Api().ticket.createPublicLog(dto);
      console.log(data);
      router.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const finalclass =
    ticketData.finalclass === "Incident"
      ? "Инцидент"
      : ticketData.finalclass === "UserRequest"
      ? "Заявка"
      : ticketData.finalclass === "DeliveryRequest"
      ? "Доставка"
      : "none";
  const timeline = [
    {
      id: 1,
      type: eventTypes.applied,
      content: "Создано",
      target: ticketData.ref,
      date: ticketData.last_update,
      datetime: ticketData.last_update,
    },
  ];
  const notFound = (field: any) => {
    if (!field) {
      return "неопределено";
    }
    return field;
  };

  return (
    <main className="py-1">
      {/* Page header */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
        <div className="flex items-center space-x-5">
          <div className="flex-shrink-0">
            <div className="relative">
              {/*<img*/}
              {/*  className="h-16 w-16 rounded-full"*/}
              {/*  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiW5wvw8ewiFwoT3JQiIMunkSFLhKM3kSwCVR9XSsBNpuROItAXMUnB7lyc-JCxowW8CM&usqp=CAU"*/}
              {/*  alt=""*/}
              {/*/>*/}
              <ClassIcon
                finalclass={ticketData.finalclass}
                size={16}
                className={""}
              />
              <span
                className="absolute inset-0 shadow-inner rounded-full"
                aria-hidden="true"
              />
            </div>
          </div>
          <div>
            <h1 className="text-2xl text-gray-900">
              {finalclass + " "}
              <b>{ticketData.ref}</b>
            </h1>
            <p className="text-sm font-medium text-gray-500">
              id:{" "}
              <a href="#" className="text-gray-900">
                #{ticketData.id}
              </a>
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-pink-900"
          >
            Изменть
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-800 hover:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-pink-900"
          >
            Решение
          </button>
        </div>
      </div>

      <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
          {/* Description list*/}
          <section aria-labelledby="applicant-information-title">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2
                  id="applicant-information-title"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  {ticketData.title}
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Общая информация
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className={styles.label_field}>Инициатор</dt>
                    <dd
                      className={styles.attribute_field}
                      title={ticketData.caller_id.toString()}
                    >
                      {ticketData.caller_id_friendlyname}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className={styles.label_field}>Статус</dt>
                    <dd className="mt-1 text-sm">
                      <StatusBadge status={ticketData.status} />
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className={styles.label_field}>Услуга</dt>
                    <dd
                      className={styles.attribute_field}
                      title={ticketData.service_id?.toString()}
                    >
                      {ticketData.service_id
                        ? ticketData.service_name
                        : "неопределено"}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className={styles.label_field}>Подкатегория</dt>
                    <dd
                      className={styles.attribute_field}
                      title={ticketData.servicesubcategory_id?.toString()}
                    >
                      {ticketData.servicesubcategory_id
                        ? ticketData.servicesubcategory_name
                        : "неопределено"}
                    </dd>
                  </div>
                  {ticketData.team_id_friendlyname && (
                    <div className="sm:col-span-1">
                      <dt className={styles.label_field}>Команда</dt>
                      <dd className={styles.attribute_field}>
                        {ticketData.team_id_friendlyname}
                      </dd>
                    </div>
                  )}
                  {ticketData.status !== "new" && (
                    <div className="sm:col-span-1">
                      <dt className={styles.label_field}>Агент</dt>
                      <dd className={styles.attribute_field}>
                        {notFound(ticketData.agent_id)}
                      </dd>
                    </div>
                  )}
                  <div className="sm:col-span-2">
                    <dt className={styles.label_field}>Описание</dt>
                    <dd className={styles.attribute_field}>
                      {ticketData.description}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className={styles.label_field}>Вложения</dt>
                    <dd className={"mt-1 text-sm text-gray-900 "}>
                      <ul
                        role="list"
                        className="border border-gray-200 rounded-md divide-y divide-gray-200"
                      >
                        {attachments.map((attachment) => (
                          <li
                            key={attachment.name}
                            className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                          >
                            <div className="w-0 flex-1 flex items-center">
                              <PaperClipIcon
                                className="flex-shrink-0 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="ml-2 flex-1 w-0 truncate">
                                {attachment.name}
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href={attachment.href}
                                className="font-medium text-pink-800 hover:text-pink-700"
                              >
                                Скачать
                              </a>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <a
                  href="#"
                  className="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg"
                >
                  {/*Read full application*/}
                </a>
              </div>
            </div>
          </section>

          {/* Comments*/}
          <section aria-labelledby="notes-title">
            <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
              <div className="divide-y divide-gray-200">
                <div className="px-4 py-5 sm:px-6">
                  <h2
                    id="notes-title"
                    className="text-lg font-medium text-gray-900"
                  >
                    Общий журнал
                  </h2>
                </div>
                {isLoading ? (
                  <div className={"px-4 py-6 sm:px-6"}>
                    <div className="shadow rounded-md p-4 max-w-sm w-full">
                      <div className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                        <div className="flex-1 space-y-6 py-1">
                          <div className="h-2 bg-slate-200 rounded"></div>
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-slate-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="shadow rounded-md p-4 max-w-sm w-full mt-2 ml-auto">
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-6 py-1">
                          <div className="h-2 bg-slate-200 rounded"></div>
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-slate-200 rounded"></div>
                          </div>
                        </div>
                        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-6 sm:px-6 ">
                    {publicLogs.map((comment, index) =>
                      comment.user_id === userData.user_id.toString() ? (
                        <div
                          className="shadow rounded-md p-4 max-w-sm w-full mt-2 ml-auto bg-rose-50"
                          key={index}
                        >
                          <div className="flex space-x-4">
                            <div className="flex-1 space-y-1 py-1">
                              <div className="font-medium text-rose-500 text-sm text-right">
                                {comment.user_login}
                              </div>
                              <div className="space-y-1">
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="col-span-3 font-medium text-gray-900 text-sm text-right">
                                    {comment.message}
                                  </div>
                                </div>
                                <div className="text-xs text-gray-500 font-semibold text-left">
                                  {comment.date}
                                </div>
                              </div>
                            </div>
                            <img
                              src={
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiW5wvw8ewiFwoT3JQiIMunkSFLhKM3kSwCVR9XSsBNpuROItAXMUnB7lyc-JCxowW8CM&usqp=CAU"
                              }
                              className="rounded-full bg-slate-200 h-10 w-10"
                              alt={comment.user_login}
                              title={comment.user_login}
                            />
                          </div>
                        </div>
                      ) : (
                        <div
                          className="shadow rounded-md p-4 max-w-sm w-full mt-2 bg-white"
                          key={index}
                        >
                          <div className="flex space-x-4">
                            <img
                              src={
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiW5wvw8ewiFwoT3JQiIMunkSFLhKM3kSwCVR9XSsBNpuROItAXMUnB7lyc-JCxowW8CM&usqp=CAU"
                              }
                              className="rounded-full bg-slate-200 h-10 w-10"
                              alt={comment.user_login}
                              title={comment.user_login}
                            />
                            <div className="flex-1 space-y-1 py-1">
                              <div className="font-medium text-purple-600 text-sm">
                                {comment.user_login}
                              </div>
                              <div className="space-y-1">
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="col-span-3 font-medium text-gray-900 text-sm">
                                    {comment.message}
                                  </div>
                                </div>
                                <div className="text-xs text-gray-500 font-semibold text-right">
                                  {comment.date}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                    {/*<ul role="list" className="space-y-8">*/}
                    {/*  {publicLogs.map((comment, index) => (*/}
                    {/*    <li key={index}>*/}
                    {/*      <div className="flex space-x-3 ">*/}
                    {/*        <div className="flex-shrink-0">*/}
                    {/*          <img*/}
                    {/*            className="h-10 w-10 rounded-full"*/}
                    {/*            src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiW5wvw8ewiFwoT3JQiIMunkSFLhKM3kSwCVR9XSsBNpuROItAXMUnB7lyc-JCxowW8CM&usqp=CAU`}*/}
                    {/*            alt=""*/}
                    {/*          />*/}
                    {/*        </div>*/}
                    {/*        <div>*/}
                    {/*          <div className="text-sm">*/}
                    {/*            <Link*/}
                    {/*              href={`/contacts/users/${comment.user_id}`}*/}
                    {/*            >*/}
                    {/*              <a className="font-medium text-gray-900">*/}
                    {/*                {comment.user_login}*/}
                    {/*              </a>*/}
                    {/*            </Link>*/}
                    {/*          </div>*/}
                    {/*          <div className="mt-1 text-sm text-gray-700">*/}
                    {/*            <p>{comment.message}</p>*/}
                    {/*          </div>*/}
                    {/*          <div className="mt-2 text-sm space-x-2">*/}
                    {/*            <span className="text-gray-500 font-medium">*/}
                    {/*              <Moment*/}
                    {/*                fromNow={true}*/}
                    {/*                titleFormat={"HH:mm:ss DD.MM.YY"}*/}
                    {/*                withTitle={true}*/}
                    {/*              >*/}
                    {/*                {comment.date}*/}
                    {/*              </Moment>*/}
                    {/*            </span>{" "}*/}
                    {/*            <span className="text-gray-500 font-medium">*/}
                    {/*              &middot;*/}
                    {/*            </span>{" "}*/}
                    {/*            <button*/}
                    {/*              type="button"*/}
                    {/*              className="text-gray-900 font-medium"*/}
                    {/*            >*/}
                    {/*              Reply*/}
                    {/*            </button>*/}
                    {/*          </div>*/}
                    {/*        </div>*/}
                    {/*      </div>*/}
                    {/*    </li>*/}
                    {/*  ))}*/}
                    {/*</ul>*/}
                  </div>
                )}
              </div>
              <div className="bg-gray-50 px-4 py-6 sm:px-6">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <form>
                      <div>
                        <label htmlFor="comment" className="sr-only">
                          About
                        </label>
                        <textarea
                          id="comment"
                          name="comment"
                          rows={3}
                          className="shadow-sm block w-full focus:ring-pink-900 focus:border-pink-900 sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Добавить запись"
                          defaultValue={""}
                          onChange={(e) =>
                            setComment({ ...comment, message: e.target.value })
                          }
                        />
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <a
                          href="#"
                          className="group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900"
                        >
                          <QuestionMarkCircleIcon
                            className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span>Some HTML is okay.</span>
                        </a>
                        <button
                          onClick={() => {
                            if (comment.message) {
                              createPublicLog(comment);
                            } else {
                              alert("Напишите что-то");
                            }
                          }}
                          type={"button"}
                          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-800 hover:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-900"
                        >
                          Отправить
                          <PaperAirplaneIcon
                            className={"ml-1 w-4 h-4 rotate-90"}
                          />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section
          aria-labelledby="timeline-title"
          className="lg:col-start-3 lg:col-span-1"
        >
          <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
            <h2
              id="timeline-title"
              className="text-lg font-medium text-gray-900"
            >
              Таймлайн
            </h2>

            {/* Activity Feed */}
            <div className="mt-6 flow-root">
              <ul role="list" className="-mb-8">
                {timeline.map((item, itemIdx) => (
                  <li key={item.id}>
                    <div className="relative pb-8">
                      {itemIdx !== timeline.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span
                            className={classNames(
                              item.type.bgColorClass,
                              "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                            )}
                          >
                            <item.type.icon
                              className="w-5 h-5 text-white"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              {item.content}{" "}
                              <a href="#" className="font-medium text-gray-900">
                                {item.target}
                              </a>
                            </p>
                          </div>
                          <div
                            className="text-right text-sm whitespace-nowrap text-gray-500"
                            title={moment(item.datetime).format(
                              "HH:mm Do MMMM YYYY"
                            )}
                          >
                            {/*<time dateTime={item.datetime}>{item.date}</time>*/}
                            {/*<Moment*/}
                            {/*  withTitle={true}*/}
                            {/*  locale={"ru"}*/}
                            {/*  fromNow={true}*/}
                            {/*>*/}
                            {/*  {item.datetime}*/}
                            {/*</Moment>*/}
                            {moment(item.datetime).format("YY-MM-DD")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex flex-col justify-stretch">
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-800 hover:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-900"
              >
                Добавить
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
