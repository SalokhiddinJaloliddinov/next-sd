import React from "react";
import { CalendarIcon } from "@heroicons/react/solid";
import { TicketList as ListType } from "../../utils/api/types";
import Link from "next/link";
import {
  KeyIcon,
  UsersIcon,
  ClipboardIcon,
  UserIcon,
  TruckIcon,
} from "@heroicons/react/outline";
import Moment from "react-moment";
import "moment/locale/ru";
import { StatusBadge } from "../TicketPage/status";
import { ClassIcon } from "../TicketPage/classIcon";
interface TicketListProps {
  data: {
    items: ListType[];
  };
}

export const TicketList: React.FC<TicketListProps> = ({ data }) => {
  console.log();
  return (
    <div className="bg-white overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {data.items.map((ticket) => (
          <li key={ticket.id}>
            <a className="block hover:bg-gray-50">
              <div className="px-4 py-3 sm:px-6">
                <div className="flex items-center justify-between">
                  <Link href={`/tickets/${ticket.finalclass}/${ticket.id}`}>
                    <p className="flex text-sm items-center font-medium text-black font-semibold truncate cursor-pointer hover:text-gray-700">
                      <ClassIcon
                        finalclass={ticket.finalclass}
                        size={7}
                        className={"mr-1"}
                      />
                      {ticket.title}
                    </p>
                  </Link>
                  <div className="ml-2 flex-shrink-0 flex">
                    <StatusBadge status={ticket.status} />
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p
                      className="flex items-center text-sm text-gray-500"
                      title={ticket.caller_id.toString()}
                    >
                      <UserIcon
                        className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                        aria-hidden="true"
                      />
                      {ticket.caller_id_friendlyname}
                    </p>

                    <Link href={`/tickets/${ticket.finalclass}/${ticket.id}`}>
                      <p className="mt-2 flex items-center text-sm text-gray-600 sm:mt-0 sm:ml-6 cursor-pointer hover:text-gray-500 font-semibold">
                        <KeyIcon
                          className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>{ticket.ref}</span>
                      </p>
                    </Link>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <CalendarIcon
                      className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                      aria-hidden="true"
                    />
                    <p>
                      <Moment fromNow={true}>{ticket.start_date}</Moment>
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
