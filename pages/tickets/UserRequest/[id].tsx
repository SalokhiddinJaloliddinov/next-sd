import React from "react";
import { GetServerSideProps } from "next";
import { Api } from "../../../utils/api";
import { Meta } from "../../../components/Meta";
import MainLayout from "../../../components/MainLayout";
import { PublicLog, SingleTicket } from "../../../utils/api/types";
import { TicketPage } from "../../../components/TicketPage";

interface UserRequestProps {
  ticketData: SingleTicket;
  publicLog: PublicLog[];
}

const UserRequest: React.FC<UserRequestProps> = ({ ticketData, publicLog }) => {
  return (
    <MainLayout>
      <Meta
        title={ticketData.ref + " " + ticketData.finalclass}
        description={ticketData.ref}
      />
      <div className={"px-6 mt-4"}>
        <TicketPage ticketData={ticketData} publicLog={publicLog} />
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    // @ts-ignore
    const { id } = ctx.params;
    const ticketData = await Api(ctx).ticket.getOne(id, "user-request");
    if (!ticketData) {
      return {
        props: {},
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
    const publicLog = await Api(ctx).ticket.getPublicLog(id, "user-request");
    return {
      props: {
        ticketData,
        publicLog,
      },
    };
  } catch (err) {
    console.log(err);
  }
  return {
    props: {},
  };
};

export default UserRequest;
