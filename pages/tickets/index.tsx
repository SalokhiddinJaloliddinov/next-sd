import React from "react";
import MainLayout from "../../components/MainLayout";
import { GetServerSideProps } from "next";
import { Api } from "../../utils/api";
import { TicketList } from "../../utils/api/types";
import { TicketList as List } from "../../components/TicketList";
import Heading from "../../components/Heading";
import { Meta } from "../../components/Meta";
import SimpleNotification from "../../components/Notification/simple";

interface TicketsProps {
  allTickets: { items: TicketList[]; total: string };
}

const tabs = [
  { name: "Открытые", href: "#", current: false },
  { name: "В работе", href: "#", current: false },
  { name: "Решённые", href: "#", current: true },
  { name: "Закрытые", href: "#", current: false },
];

const Tickets: React.FC<TicketsProps> = (props) => {
  console.log(props.allTickets.total);
  return (
    <MainLayout>
      <Meta title={"Все Тикеты"} description={"Все Тикеты"} />
      <div className={"px-6 mt-4"}>
        <Heading name={"Все Тикеты"} tools={tabs} />
        <List data={props.allTickets} />
      </div>
      <SimpleNotification total={props.allTickets.total} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { page } = ctx.query;
    const filter = {
      search: ctx.query?.search,
      page: ctx.query?.page,
      limit: ctx.query?.limit,
    };
    const allTickets = await Api(ctx).ticket.getAll(filter);
    return {
      props: {
        allTickets,
      },
    };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {},
  };
};

export default Tickets;
