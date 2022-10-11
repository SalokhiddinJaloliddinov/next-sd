import React from "react";
import { CalendarIcon, UsersIcon } from "@heroicons/react/solid";
import { TicketList as ListType } from "../../utils/api/types";
import Link from "next/link";
import { KeyIcon } from "@heroicons/react/outline";
import Moment from "react-moment";
import "moment/locale/ru";
interface TicketListProps {
  data: {
    items: ListType[];
  };
}

const positions = [
  {
    id: 1,
    title: "Back End Developer",
    type: "Full-time",
    location: "Remote",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
  },
  {
    id: 2,
    title: "Front End Developer",
    type: "Full-time",
    location: "Remote",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
  },
  {
    id: 3,
    title: "User Interface Designer",
    type: "Full-time",
    location: "Remote",
    department: "Design",
    closeDate: "2020-01-14",
    closeDateFull: "January 14, 2020",
  },
];

export const TicketList: React.FC<TicketListProps> = ({ data }) => {
  console.log();
  return (
    <div className="bg-white overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {data.items.map((ticket) => (
          <li key={ticket.id}>
            <Link href={`/tickets/${ticket.finalclass}/${ticket.id}`}>
              <a className="block hover:bg-gray-50">
                <div className="px-4 py-3 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-black truncate">
                      {ticket.title}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {ticket.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <UsersIcon
                          className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                          aria-hidden="true"
                        />
                        {ticket.servicesubcategory_name}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-indigo-500 sm:mt-0 sm:ml-6">
                        <KeyIcon
                          className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                          aria-hidden="true"
                        />
                        {ticket.ref}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <CalendarIcon
                        className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                        aria-hidden="true"
                      />
                      <p>
                        Посл.обн{" "}
                        <Moment withTitle={true} locale={"ru"} fromNow={true}>
                          {ticket.last_update}
                        </Moment>
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
